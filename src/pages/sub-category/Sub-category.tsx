import { useNavigate } from "react-router-dom";
import { useGetSub } from "./service/query/useGetSub"
import { ReactElement, useState } from "react";
import { Button, Image, Pagination, Table, TableProps, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDeleteSub } from "./service/mutation/useDeleteSub";
import SearchForm from "../../components/SearchForm";
import { client } from "../../config/query-client";
import { getSubCategory } from "../../config/types";

const SubCategory = () => {
  const [page, setPage] = useState(1)
  const [current, setCurrent] = useState(1)
  const { data: subCategory } = useGetSub(page)
  const { data: getAll } = useGetSub()
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

  const filteredData = getAll?.data?.results?.filter((item: getSubCategory) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    mutate(id, {
      onSuccess: () => {
        client.invalidateQueries({ queryKey: ['sub-category'] })
        message.success('success')
      }
    })
  }


  const data: DataType[] = subCategory?.data?.results?.map((item: getSubCategory) => (
    {
      "key": item.id,
      id: item.id,
      image: <div style={{ width: '70px', height: '60px', }} >
        <Image src={item.image} alt="" />
      </div>,
      title: <p style={{ fontSize: '20px', fontWeight: '500' }}>{item.title}</p>,
      category: <p style={{ fontSize: '16px', fontWeight: '700' }}>{item.parent?.title.length > 12 ? item.parent?.title.slice(0, 12).toUpperCase() + '...' : item.parent?.title.toUpperCase()}</p>,
      action: <div style={{ display: 'flex', gap: '10px' }}>
        <Button onClick={() => navigate(`/edit-sub/${item.id}`)} size='large' type="primary" ><EditOutlined />Edit</Button>
        <Button onClick={() => handleDelete(item.id)} size='large' type="primary" danger>
          <DeleteOutlined />Delete</Button>
      </div>,
    }
  ))

  return (
    <div >
      <div style={{ display: 'flex', alignItems: 'start', marginBottom: '40px', justifyContent: 'space-between' }}>
        <Button onClick={() => navigate('/create-sub')} type='primary'>Create Sub Category</Button>
        <SearchForm searchValue={setSearch} data={filteredData} title={'sub'} />
      </div>
      <div style={{ height: '80vh', overflow: 'auto' }}>
        <Pagination onChange={(page) => {
          console.log(page);
          setCurrent(page)
          setPage(page > 1 ? (page - 1) * 5 : page)
        }} total={subCategory?.data.count} current={current} pageSize={5} />
        <Table pagination={false} columns={columns} dataSource={data} />
      </div>
    </div>
  )
}

export default SubCategory