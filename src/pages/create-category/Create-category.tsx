import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Upload, message } from 'antd';
import type { FormProps, UploadFile, UploadProps } from 'antd';
import { usePostCategory } from '../../service/mutation/usePostCategory';

interface FieldType {
    title:string;
    image:{
        file:File;
    }
}


const CreateCategory: React.FC = () => {

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const { mutate } = usePostCategory()


    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);


    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        const fomrData = new FormData();
        fomrData.append('title',values.title);
        fomrData.append('image',values.image.file)
        mutate(fomrData, {
            onSuccess: res => {
                message.success('success')
            },
            onError: err => console.log(err)
            
            
        })
    };




    return (
        <div>
            <Form
                name="basic"
                layout='vertical'
                initialValues={{ }}
                onFinish={onFinish}
                style={{maxWidth:"600px"}}
                autoComplete="off"
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

export default CreateCategory