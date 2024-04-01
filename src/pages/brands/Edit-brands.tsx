import { useNavigate, useParams } from 'react-router-dom'
import BrandForm from './components/Form'
import { useEditBrand } from './service/mutation/useEditBrand'
import { useGetSingleBrand } from './service/query/useGetSingleBrand'
import { FieldType } from './components/Form';
import { message, Spin } from 'antd';



const EditBrand: React.FC = () => {

  const { id } = useParams()
  const { data, isLoading } = useGetSingleBrand(id as string)
  const { mutate } = useEditBrand(id as string)
  const navigate = useNavigate()

  // console.log(data);


  const submit = (values: FieldType) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('image', values.image.file)
    mutate(formData, {
      onSuccess: (res) => {
        console.log(res);

        message.success('success')
        navigate('/brands')
      },
      onError: err => console.log(err)


    })
  };

  return (
    <div>
      {isLoading ?
        <Spin /> :
        <BrandForm initialValues={data} loading={isLoading} onFinish={submit} />
      }
    </div>
  )
}

export default EditBrand