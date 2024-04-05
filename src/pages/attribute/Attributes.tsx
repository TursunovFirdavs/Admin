import { useNavigate } from "react-router-dom";
import { useGetAttributes } from "./service/query/useGetAttributes"
import { ReactElement } from "react";
import { Button, Table, TableProps } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDeleteAttribut } from "./service/mutation/useDeleteAttribute";

const Attributes = () => {
  const { data: brands } = useGetAttributes()
  const { mutate } = useDeleteAttribut()
  
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

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
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


  const data: DataType[] = brands?.results?.map((item: any) => (
    {
      id: item.id,
      title: <p style={{ fontSize: '20px', fontWeight: '500' }}>{item.title}</p>,
      category: <p style={{ fontSize: '16px', fontWeight: '700' }}>{item.category_title[0]?.title.length > 12 ? item.category_title[0]?.title.slice(0, 12).toUpperCase() + '...' : item.category_title[0]?.title.toUpperCase()}</p>,
      action: <div style={{ display: 'flex', gap: '10px' }}>
        <Button onClick={() => navigate(`/edit-brand/${item.id}`)} size='large' type="primary" ><EditOutlined />Edit</Button>
        <Button onClick={() => mutate(item.id)} size='large' type="primary" danger>
          <DeleteOutlined />Delete</Button>
      </div>,
    }
  ))

  return (
    <div >
      <Button style={{ marginBottom: '40px' }} onClick={() => navigate('/create-attribute')} type='primary'>Create Attribute</Button>
      <div style={{ height: '80vh', overflow: 'auto' }}>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  )
}

export default Attributes