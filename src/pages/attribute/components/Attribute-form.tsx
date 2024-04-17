import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Space, message } from 'antd';
import { useDeleteAttValue } from '../../sub-category/service/mutation/useDeleteAttValue';
import { useDeleteAttribute } from '../../sub-category/service/mutation/useDeleteAtt';

interface Props {
  onfinish: (values: any) => void
  initialValue?: any
}

const AttributeForm: React.FC<Props> = ({ onfinish, initialValue }) => {
  const [form] = Form.useForm();
  console.log(initialValue);
  const { mutate } = useDeleteAttValue()
  const { mutate: attMutate } = useDeleteAttribute()
  

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
        {(fields, { add, remove }) => {
          console.log(fields);
          return (
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
                        attMutate(initialValue[field.name].id, {onSuccess: () => message.success('success')})
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
                      {(subFields, subOpt) => (
                        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                          {subFields.map((subField) => (
                            <Space key={subField.key}>
                              <Form.Item noStyle name={[subField.name, 'value']}>
                                <Input placeholder="value" />
                              </Form.Item>
                              <CloseOutlined
                                onClick={() => {
                                  if(initialValue && initialValue[field.name].values[subField.name].id){
                                    mutate(initialValue[field.name].values[subField.name].id, {onSuccess: () => message.success('success')})
                                  }
                                  subOpt.remove(subField.name);
                                }}
                              />
                            </Space>
                          ))}
                          <Button type="dashed" onClick={() => subOpt.add()} block>
                            + Add Sub Item
                          </Button>
                        </div>
                      )}
                    </Form.List>
                  </Form.Item>
                </Card>
              ))}
  
              <Button type="dashed" onClick={() => add()} block>
                + Add Item
              </Button>
            </div>
          )
        }}
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