import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Space } from 'antd';

interface Props {
  onfinish: (values: any) => void
  initialValue?: any
}

const AttributeForm: React.FC<Props> = ({ onfinish, initialValue }) => {
  const [form] = Form.useForm();
  console.log(initialValue);


  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      form={form}
      name="dynamic_form_complex"
      style={{ maxWidth: 600 }}
      onFinish={onfinish}
      autoComplete="off"
    >
      <Form.List name="items" initialValue={initialValue}>
        {(fields, { add, remove }) => (
          <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
            {fields.map((field) => (
              <Card
                size="small"
                title={`Item ${field.name + 1}`}
                key={field.key}
                extra={
                  <CloseOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                }
              >
                <Form.Item label="Title" name={[field.name, 'title']}>
                  <Input />
                </Form.Item>

                {/* Nest Form.List */}
                <Form.Item label="List">
                  <Form.List name={[field.name, 'values']}>
                    {initialValue ? (_, subOpt) => (
                      <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                        {initialValue?.map((item: any) => {
                          {item?.values.map((subField: any, index: any) => (
                            <Space key={index}>
                              <Form.Item noStyle name={[index, 'value']}>
                                <Input placeholder="value" />
                              </Form.Item>
                              <CloseOutlined
                                onClick={() => {
                                  subOpt.remove(index);
                                }}
                              />
                            </Space>
                          ))}
                        })}
                        <Button type="dashed" onClick={() => subOpt.add()} block>
                          + Add Sub Item
                        </Button>
                      </div>
                    ) :
                      (subFields, subOpt) => (
                        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                          {subFields.map((subField) => (
                            <Space key={subField.key}>
                              <Form.Item noStyle name={[subField.name, 'value']}>
                                <Input placeholder="value" />
                              </Form.Item>
                              <CloseOutlined
                                onClick={() => {
                                  subOpt.remove(subField.name);
                                }}
                              />
                            </Space>
                          ))}
                          <Button type="dashed" onClick={() => subOpt.add()} block>
                            + Add Sub Item
                          </Button>
                        </div>
                      )
                    }
                  </Form.List>
                </Form.Item>
              </Card>
            ))}

            <Button type="dashed" onClick={() => add()} block>
              + Add Item
            </Button>
          </div>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AttributeForm;