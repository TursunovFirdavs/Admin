import { PlusOutlined } from "@ant-design/icons"
import { Button, Form, Image, Input, Select, Switch, Upload, UploadFile, UploadProps } from "antd"
import { FC, useState } from "react"
import { useGetSub } from "../../sub-category/service/query/useGetSub"

interface Props {
    onFinish: (values: FieldType) => void
    initialValues?: {
        title: string,
        image: string,
        is_available: boolean,
        is_new: boolean
    }
}

export interface FieldType {
    title: string;
    category: string;
    price: string,
    is_available: boolean,
    is_new: boolean,
    image: {
        file: File;
    }
}

const ProductForm: FC<Props> = ({ onFinish, initialValues }) => {
    console.log(initialValues);
    
    const { data: categories } = useGetSub()

    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    const options =
        categories?.results?.map((item: any) => (
            { label: <span>{item.title}</span>, value: item.id }
        ))

    const onChange = (checked: boolean) => {
        console.log(`switch to ${checked}`);
    };


    return (
        <div>
            <Form
                name="basic"
                layout='vertical'
                initialValues={initialValues}
                onFinish={onFinish}
                style={{ maxWidth: "600px" }}
            >
                {!initialValues &&
                    <Form.Item
                        label='Category'
                        name="category"
                        rules={[{ required: true, message: 'Please input your category!' }]}
                    >
                        <Select defaultValue="choose category" style={{ width: '100%' }} options={options} />
                    </Form.Item>
                }
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please input your title!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Please input your price!' }]}
                >
                    <Input />
                </Form.Item>

                <div style={{display: 'flex', gap: '10px'}}>
                <Form.Item
                label='Is available'
                name='is_available'
                >
                    <Switch defaultValue={initialValues ? initialValues.is_available : false} defaultChecked={initialValues ? initialValues.is_available : false} onChange={onChange} />
                </Form.Item>
                
                <Form.Item
                label='Is new'
                name='is_new'
                >
                    <Switch defaultValue={initialValues ? initialValues.is_new : false} defaultChecked={false} onChange={onChange} />
                </Form.Item>
                </div>

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

                {initialValues && !fileList.length &&
                    <div style={{ width: '200px', marginBottom: '30px' }}>
                        <Image src={initialValues.image} />
                    </div>
                }

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Form>

        </div>
    )
}

export default ProductForm