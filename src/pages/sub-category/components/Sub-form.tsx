import { PlusOutlined } from "@ant-design/icons"
import { Button, Form, Image, Input, Select, Upload, UploadFile, UploadProps } from "antd"
import { FC, useState } from "react"
import { useGetCategory } from "../../categories/service/query/useGetCategory"

interface Props {
    onFinish: (values: FieldType) => void
    initialValues?: {
        title: string,
        image: string
    }
}

export interface FieldType {
    title: string;
    parent: string
    image: {
        file: File;
    }
}

const SubForm: FC<Props> = ({ onFinish, initialValues }) => {

    const { data: categories } = useGetCategory()

    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    const options =
        categories?.results?.map((item: any) => (
            { label: <span>{item.title}</span>, value: item.id }
        ))


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
                        maxCount={1}
                        fileList={fileList}
                        listType="picture-card"
                        onChange={handleChange}
                    >
                        {fileList.length >= 8 ? null : <button style={{ border: 0, background: 'none' }} type="button">
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Image</div>
                        </button>}
                    </Upload.Dragger>
                </Form.Item>
                {!initialValues &&
                    <Form.Item
                        name="parent"
                        rules={[{ required: true, message: 'Please input your category!' }]}
                    >
                        <Select defaultValue="choose category" style={{ width: '100%' }} options={options} />
                    </Form.Item>
                }

                {initialValues && !fileList.length &&
                    <div style={{ width: '200px', marginBottom: '30px' }}>
                        <Image src={initialValues.image} />
                    </div>
                }

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                    {initialValues ? 'Edit' : 'Create'}
                    </Button>
                </Form.Item>
            </Form>

        </div>
    )
}

export default SubForm