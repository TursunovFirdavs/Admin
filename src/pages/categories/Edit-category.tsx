import { useNavigate, useParams } from 'react-router-dom'
import CategoryForm from './components/Category-form'
import { useEditCategory } from './service/mutation/useEditCategory'
import { useGetSingleCategory } from './service/query/useGetSingleCategory'
import { FieldType } from './components/Category-form';
import { message } from 'antd';



const EditCategory: React.FC = () => {

  const { id } = useParams()
  const { data } = useGetSingleCategory(id)
  const { mutate } = useEditCategory(id)
  const navigate = useNavigate()
  
  console.log(data);
  

  const submit = (values: FieldType) => {
    const formData = new FormData();
    formData.append('title',values.title);
    formData.append('image',values.image.file)
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
      <CategoryForm initialValues={data} loading onFinish={submit} />
    </div>
  )
}

export default EditCategory