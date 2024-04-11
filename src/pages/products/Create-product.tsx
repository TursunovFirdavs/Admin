import ProductForm from "./components/ProductForm"
import { useCreateProduct } from "./service/mutation/UseCreateProduct";
import { FieldType } from "./components/ProductForm";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateProduct: FC = () => {
  const [is_new, setIsNew] = useState(false)
  const [is_available, setIsAvailable] = useState(false)
  const { mutate } = useCreateProduct()
  const navigate = useNavigate()

  const submit = (values: any) => {
    switch(values.is_new){
      case undefined: setIsNew(false)
      break;
      default: setIsNew(true)
    }
    switch(values.is_available){
      case undefined: setIsAvailable(false)
      break;
      default: setIsAvailable(true)
    }
    
    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('image', values.image.file)
    formData.append('category', values.category)
    formData.append('price', values.price)
    formData.append('is_new', is_new)
    formData.append('is_available', is_available)
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