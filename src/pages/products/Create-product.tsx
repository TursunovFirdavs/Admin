import ProductForm from "./components/ProductForm"
import { useCreateProduct } from "./service/mutation/UseCreateProduct";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const CreateProduct: FC = () => {
  const { mutate } = useCreateProduct()
  const navigate = useNavigate()

  const submit = (values: any) => {
    console.log(values)
    
    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('image', values.image.file)
    formData.append('category', values.category)
    formData.append('price', values.price)
    if(values.is_new === undefined) {
      formData.append('is_new', 'false')
    }
    else {
      formData.append('is_new', values.is_new.toString())
    }
    if(values.is_available === undefined) {
      formData.append('is_available', 'false')
    }
    else {
      formData.append('is_available', values.is_available.toString())
    }
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
      <ProductForm onFinish={submit} />
    </div>
  )
}

export default CreateProduct