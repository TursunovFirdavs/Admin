import ProductForm from "./components/ProductForm"
import { useCreateProduct } from "./service/mutation/UseCreateProduct";
import { FieldType } from "./components/ProductForm";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const CreateProduct: FC = () => {
  const { mutate } = useCreateProduct()
  const navigate = useNavigate()

  const submit = (values: FieldType) => {
    console.log(values);
    
    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('image', values.image.file)
    formData.append('category', values.category)
    formData.append('price', values.price)
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