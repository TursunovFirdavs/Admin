import { Table } from 'antd';
import { TableProps, Button } from 'antd';
import { useGetCategory } from '../../service/query/useGetCategory';
import { FC, ReactElement } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDelete } from './service/mutation/useDelete';
import { useNavigate } from 'react-router-dom';

const Categories: FC = () => {
    const navigate = useNavigate()

    interface DataType {
        id: number;
        image: string;
        title: string;
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
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
        },
    ];

    const { data: categoryList } = useGetCategory()
    const { mutate: deleteMutation } = useDelete()
    console.log(categoryList?.results);

    const data: DataType[] = categoryList?.results?.map((item: any) => (
        {
            id: item.id,
            image: <img style={{ width: '70px', height: '70px', objectFit: 'cover' }} src={item.image} alt="" />,
            title: <p style={{ fontSize: '20px', fontWeight: '500' }}>{item.title}</p>,
            action: <div style={{ display: 'flex', gap: '10px' }}>
                <Button onClick={() => navigate('/edit-category')} size='large' type="primary" ><EditOutlined />Edit</Button>
                <Button onClick={() => deleteMutation(`/category/${item.id}/`, { onSuccess: res => console.log(res) })} size='large' type="primary" danger>
                    <DeleteOutlined />Delete</Button>
            </div>,
        }
    ))
        ;
    return (
        <div >
            <Button style={{marginBottom: '40px'}} onClick={() => navigate('/create-category')} type='primary'>Create Category</Button>
            <div style={{ height: '80vh', overflow: 'auto'}}>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    )
}

export default Categories