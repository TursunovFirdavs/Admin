import { useNavigate } from "react-router-dom";
import { useGetProducts } from "./service/query/useGetProducts"
import { ReactElement } from "react";
import { Button, Image, Table, TableProps } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
// import { useDeleteSub } from "./service/mutation/useDeleteSub";

const Products = () => {
    const { data: products } = useGetProducts()
    //   const { mutate } = useDeleteSub()

    console.log(products);

    const navigate = useNavigate()

    interface DataType {
        id: number;
        image: string;
        title: string;
        category: string;
        action: ReactElement
        //   tags: string[];
    }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
        },
    ];


    const data: DataType[] = products?.results?.map((item: any) => (
        {
            id: item.id,
            image: <div style={{ width: '70px', height: '60px', }} >
                <Image src={item.image} alt="" />
            </div>,
            title: <p style={{ fontSize: '20px', fontWeight: '500' }}>{item.title}</p>,
            category: <p style={{ fontSize: '16px', fontWeight: '700' }}>{item.parent?.title.length > 12 ? item.parent?.title.slice(0, 12).toUpperCase() + '...' : item.parent?.title.toUpperCase()}</p>,
            action: <div style={{ display: 'flex', gap: '10px' }}>
                <Button onClick={() => navigate(`/edit-product/${item.id}`)} size='large' type="primary" ><EditOutlined />Edit</Button>
                <Button size='large' type="primary" danger>
                    <DeleteOutlined />Delete</Button>
            </div>,
        }
    ))

    return (
        <div >
            <Button style={{ marginBottom: '40px' }} onClick={() => navigate('/create-product')} type='primary'>Create Product</Button>
            <div style={{ height: '80vh', overflow: 'auto' }}>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    )
}

export default Products