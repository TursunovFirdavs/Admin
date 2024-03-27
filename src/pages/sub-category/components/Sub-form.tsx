import { PlusOutlined } from "@ant-design/icons"
import { Button, Form, Input, Upload, UploadFile, UploadProps } from "antd"
import { FC, useState } from "react"

interface Props {
    onFinish: (values: FieldType) => void
}

export interface FieldType {
    title:string;
    image:{
        file:File;
    }
}

const SubForm: FC<Props> = ({ onFinish }) => {

    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

  return (
    <div>
            <Form
                name="basic"
                layout='vertical'
                initialValues={{ }}
                onFinish={onFinish}
                style={{maxWidth:"600px"}}
            >
                <Form.Item
                    label="Username"
                    name="title"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Image"
                    name="image"
                    rules={[{ required: true, message: 'Please input your image!' }]}
                >
                    <Upload.Dragger
                        beforeUpload={() => false}
                        maxCount={1}
                        fileList={fileList}
                        onChange={handleChange}
                    >
                        {fileList.length >= 8 ? null : <button style={{ border: 0, background: 'none' }} type="button">
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Image</div>
                        </button>}
                    </Upload.Dragger>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
          
        </div>
  )
}

export default SubForm