import { useNavigate } from "react-router-dom";
import { ReactElement, useState } from "react";
import { Button, Image, Table, TableProps } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import SearchForm from "../../components/SearchForm";
import { useGetBanner } from "./service/query/useGetBanner";

const Banner = () => {
  const { data: brands } = useGetBanner()
  const [search, setSearch] = useState('')
  
  console.log(brands);

  const navigate = useNavigate()

  interface DataType {
    id: number;
    image: string;
    title: string;
    category: string;
    action: ReactElement
    //   tags: string[];
  }

  const filteredData = brands?.results?.filter((item:any) =>
    item.title.toLowerCase().includes(search.toLowerCase())
);

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


  const data: DataType[] = brands?.results?.map((item: any) => (
    {
      id: item.id,
      image: <div style={{ width: '70px', height: '60px',  }} >
        <Image src={item.image} alt="" />
      </div>,
      title: <p style={{ fontSize: '20px', fontWeight: '500' }}>{item.title}</p>,
      category: <p style={{ fontSize: '16px', fontWeight: '700' }}>{item.parent?.title.length > 12 ? item.parent?.title.slice(0, 12).toUpperCase() + '...' : item.parent?.title.toUpperCase()}</p>,
      action: <div style={{ display: 'flex', gap: '10px' }}>
        <Button onClick={() => navigate(`/edit-brand/${item.id}`)} size='large' type="primary" ><EditOutlined />Edit</Button>
        <Button size='large' type="primary" danger>
          <DeleteOutlined />Delete</Button>
      </div>,
    }
  ))

  return (
    <div >
      <div style={{display: 'flex', alignItems: 'start', marginBottom: '40px', justifyContent: 'space-between'}}>
      <Button onClick={() => navigate('/create-banner')} type='primary'>Create banner</Button>
                <SearchForm searchValue={setSearch} data={filteredData} title={'banner'} />
            </div>
      <div style={{ height: '80vh', overflow: 'auto' }}>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  )
}

export default Banner