import { useNavigate, useParams } from "react-router-dom"
import { useGetSingleSub } from "./service/query/useGetSingleSub"
import SubForm from "./components/Sub-form"
import { useEditSub } from "./service/mutation/useEditSub"
import { FieldType } from "../categories/components/Category-form"

const EditSub = () => {

  const { id } = useParams()
  const { data } = useGetSingleSub(id as string)
  const { mutate } = useEditSub(id as string)
  const navigate = useNavigate()
  console.log(data);

  const submit = (values: FieldType) => {
      const formData = new FormData()
      formData.append('title', values.title)
      formData.append('image', values.image.file)
      mutate(formData, {
        onSuccess: () => {
          navigate('/sub-category')
        },
        onError: err => console.log(err)
        
      })
  }
  

  return (
    <div>
      <SubForm onFinish={submit} initialValues={data} />
    </div>
  )
}

export default EditSub