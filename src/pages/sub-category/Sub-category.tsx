import { useNavigate } from "react-router-dom";
import { useGetSub } from "./service/query/useGetSub"
import { ReactElement, useState } from "react";
import { Button, Image, Table, TableProps } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDeleteSub } from "./service/mutation/useDeleteSub";
import SearchForm from "../../components/SearchForm";

const SubCategory = () => {
  const { data: subCategory } = useGetSub()
  const { mutate } = useDeleteSub()
  const [search, setSearch] = useState('')
  
  console.log(subCategory);

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

  const filteredData = subCategory?.results?.filter((item:any) =>
    item.title.toLowerCase().includes(search.toLowerCase())
);


  const data: DataType[] = subCategory?.results?.map((item: any) => (
    {
      id: item.id,
      image: <div style={{ width: '70px', height: '60px',  }} >
        <Image src={item.image} alt="" />
      </div>,
      title: <p style={{ fontSize: '20px', fontWeight: '500' }}>{item.title}</p>,
      category: <p style={{ fontSize: '16px', fontWeight: '700' }}>{item.parent?.title.length > 12 ? item.parent?.title.slice(0, 12).toUpperCase() + '...' : item.parent?.title.toUpperCase()}</p>,
      action: <div style={{ display: 'flex', gap: '10px' }}>
        <Button onClick={() => navigate(`/edit-sub/${item.id}`)} size='large' type="primary" ><EditOutlined />Edit</Button>
        <Button onClick={() => mutate(item.id)} size='large' type="primary" danger>
          <DeleteOutlined />Delete</Button>
      </div>,
    }
  ))

  return (
    <div >
      <div style={{display: 'flex', alignItems: 'start', marginBottom: '40px', justifyContent: 'space-between'}}>
      <Button onClick={() => navigate('/create-sub')} type='primary'>Create Sub Category</Button>
                <SearchForm searchValue={setSearch} data={filteredData} title={'sub'} />
            </div>
      <div style={{ height: '80vh', overflow: 'auto' }}>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  )
}

export default SubCategory