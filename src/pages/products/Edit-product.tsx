import { useNavigate, useParams } from "react-router-dom"
import { useGetSingleProduct } from "./service/query/useGetSingle"
import ProductForm from "./components/ProductForm"
import { useEditProduct } from "./service/mutation/useEditProduct"
import { FieldType } from "./components/ProductForm"

const EditProduct = () => {

  const { id } = useParams()
  const { data } = useGetSingleProduct(id as string)
  const { mutate } = useEditProduct(id as string)
  const navigate = useNavigate()
  console.log(data);

  const submit = (values: FieldType) => {
      const formData = new FormData()
      formData.append('title', values.title)
      formData.append('image', values.image.file)
      formData.append('price', values.price)
      mutate(formData, {
        onSuccess: () => {
          navigate('/products')
        },
        onError: err => console.log(err)
        
      })
  }
  

  return (
    <div>
      <ProductForm onFinish={submit} initialValues={data} />
    </div>
  )
}

export default EditProduct