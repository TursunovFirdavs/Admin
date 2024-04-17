import { Image, Table, message } from 'antd';
import { TableProps, Button } from 'antd';
import { useGetCategory } from './service/query/useGetCategory';
import { FC, ReactElement, useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDelete } from './service/mutation/useDelete';
import { useNavigate } from 'react-router-dom';
import SearchForm from '../../components/SearchForm';
import { client } from '../../config/query-client';

const Categories: FC = () => {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()
    // console.log(search);
    

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
    // console.log(categoryList?.results);
    // console.log(categoryList);
    

    const filteredData = categoryList?.results?.filter((item:any) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (id: string) => {
        deleteMutation(id, {
            onSuccess: () => {
                client.invalidateQueries({ queryKey: ['category'] })
                message.success('success')
            }
        })
      }

    console.log(filteredData);
    

    const data: DataType[] = categoryList?.results?.map((item: any) => (
        {
            id: item.id,
            image: <div style={{ width: '70px', height: '60px', }} >
                <Image src={item.image} alt="" />
            </div>,
            title: <p style={{ fontSize: '20px', fontWeight: '500' }}>{item.title}</p>,
            action: <div style={{ display: 'flex', gap: '10px' }}>
                <Button onClick={() => navigate(`/edit-category/${item.id}`)} size='large' type="primary" ><EditOutlined />Edit</Button>
                <Button onClick={() => handleDelete(`/category/${item.id}/` )} size='large' type="primary" danger>
                    <DeleteOutlined />Delete</Button>
            </div>,
        }
    ))
    
    return (
        <div >
            <div style={{display: 'flex', alignItems: 'start', marginBottom: '40px', justifyContent: 'space-between'}}>
                <Button onClick={() => navigate('/create-category')} type='primary'>Create Category</Button>
                <SearchForm searchValue={setSearch} data={filteredData} title={'category'} />
            </div>
            <div style={{ height: '80vh', overflow: 'auto' }}>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    )
}

export default Categories