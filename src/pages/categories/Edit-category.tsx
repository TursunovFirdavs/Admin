import { useNavigate, useParams } from 'react-router-dom'
import CategoryForm from './components/Category-form'
import { useEditCategory } from './service/mutation/useEditCategory'
import { useGetSingleCategory } from './service/query/useGetSingleCategory'
import { FieldType } from './components/Category-form';
import { message, Spin } from 'antd';



const EditCategory: React.FC = () => {

  const { id } = useParams()
  const { data, isLoading } = useGetSingleCategory(id as string)
  const { mutate } = useEditCategory(id as string)
  const navigate = useNavigate()


  const submit = (values: FieldType) => {
    console.log(values);
    const formData = new FormData();
    formData.append('title', values.title);
    if(values.image && values.image.file) {
      formData.append('image', values.image.file)
    }
    mutate(formData, {
      onSuccess: (res) => {
        console.log(res);

        message.success('success')
        navigate('/')
      },
      onError: err => console.log(err)


    })
  };

  return (
    <div>
      {isLoading ?
        <Spin /> :
        <CategoryForm initialValues={data} loading={isLoading} onFinish={submit} />
      }
    </div>
  )
}

export default EditCategory