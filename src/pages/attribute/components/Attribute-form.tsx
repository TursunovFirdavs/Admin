import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';

interface Props {
  onfinish: (values: any) => void
  initialValue?: any
}

const AttributeForm: React.FC<Props> = ({ onfinish, initialValue }) => {
  const [form] = Form.useForm();
  // console.log(initialValue);
  

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      form={form}
      onFinish={onfinish}
      name="dynamic_form_complex"
      style={{ maxWidth: 600 }}
      autoComplete="off"
      initialValues={initialValue}
    >
      <Form.Item name={"title"}>
        <Input placeholder='title' />
      </Form.Item>
      <Form.List name="values">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
              <Form.Item
                {...restField}
                name={[name, 'value']}
                rules={[{ required: true, message: 'Missing first name' }]}
              >
                <Input placeholder="value" />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              Add value
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AttributeForm;