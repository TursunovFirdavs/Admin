import { PlusOutlined } from "@ant-design/icons"
import { Button, Form, Image, Input, Upload, UploadFile, UploadProps } from "antd"
import { FC, useState } from "react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getBanner } from "../../../config/types";

interface Props {
    onFinish: (values: getBanner) => void
    initialValues?: {
        title: string,
        image: string
    }
}


const BannerForm
    : FC<Props> = ({ onFinish, initialValues }) => {
        console.log(initialValues);
        const [description, setDescription] = useState('');
        console.log(description);



        const [fileList, setFileList] = useState<UploadFile[]>([]);

        const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
            setFileList(newFileList);

        return (
            <div>
                <Form
                    name="basic"
                    layout='vertical'
                    initialValues={initialValues}
                    onFinish={onFinish}
                    style={{ maxWidth: "600px" }}
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
                            listType="picture-card"
                            maxCount={1}
                            fileList={fileList}
                            onChange={handleChange}
                        >
                            {fileList.length >= 8 ? null : <button style={{ border: 0, background: 'none' }} type="button">
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>{initialValues ? 'Change image' : 'Image'}</div>
                            </button>}
                        </Upload.Dragger>
                    </Form.Item>

                    {initialValues && !fileList.length &&
                        <div style={{ width: '200px', marginBottom: '30px' }}>
                            <Image src={initialValues.image} />
                        </div>
                    }

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input your description!' }]}
                    >
                        <ReactQuill theme="snow" value={description} onChange={setDescription} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {initialValues ? 'Edit' : 'Create'}
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        )
    }

export default BannerForm
