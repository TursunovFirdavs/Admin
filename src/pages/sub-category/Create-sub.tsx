import SubForm from "./components/Sub-form"
import { useCreateSub } from "./service/mutation/useCreateSub";
import { FieldType } from "./components/Sub-form";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const CreateSub: FC = () => {
  const { mutate } = useCreateSub()
  const navigate = useNavigate()

  const submit = (values: FieldType) => {
    console.log(values);
    
    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('image', values.image.file)
    formData.append('parent', values.parent)
    mutate(formData, {
      onSuccess: () => {
        navigate('/sub-category')
      },
      onError: err => console.log(err)
      
    })
  }
  return (
    <div>
      <SubForm onFinish={submit} />
    </div>
  )
}

export default CreateSub