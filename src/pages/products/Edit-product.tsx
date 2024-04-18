import { useNavigate, useParams } from "react-router-dom"
import { useGetSingleProduct } from "./service/query/useGetSingle"
import ProductForm from "./components/ProductForm"
import { useEditProduct } from "./service/mutation/useEditProduct"
import { FieldType } from "./components/ProductForm"
import { Spin } from "antd"

const EditProduct = () => {

  const { id } = useParams()
  const { data, isLoading } = useGetSingleProduct(id as string)
  const { mutate } = useEditProduct(id as string)
  const navigate = useNavigate()
  console.log(data);

  const submit = (values: FieldType) => {
    console.log(values);

    const formData = new FormData()
    formData.append('title', values.title)
    if(values.image && values.image.file) {
      formData.append('image', values.image.file)
    }
    formData.append('category', data.category)
    formData.append('price', values.price)
    formData.append('is_new', values.is_new as any)
    formData.append('is_available', values.is_available as any)
    console.log(formData);

    mutate(formData, {
      onSuccess: () => {
        navigate('/products')
      },
      onError: err => console.log(err)

    })
  }


  return (
    <div>
      {isLoading ? <Spin /> :
        <ProductForm onFinish={submit} initialValues={data} />
      }
    </div>
  )
}

export default EditProduct