import { useParams } from 'react-router-dom'
import AttributeForm from './components/Attribute-form'
import { useEditAttribute } from './service/mutation/useEditAttribute'
import { useGetSingleAttribute } from './service/query/useGetSingleAtt'
import { message, Spin } from 'antd';



const EditBrand: React.FC = () => {

  const { id } = useParams()
  console.log(id);

  const { data, isLoading } = useGetSingleAttribute(id as string)
  const { mutate } = useEditAttribute(id as string)

  const submit = (values: any) => {
    const edited = values?.values.map((value: any) => {
      return {
        value: value.value,
        id: value.id || null
      }
    })
    console.log({ ...values, attribute_id: data.id, values: edited });
    mutate({ ...values, attribute_id: data.id, values: edited }, {
      onSuccess: (res) => {
        console.log(res);
        message.success('success')
      },
      onError: err => console.log(err)

    })
  };

  return (
    <div>
      {isLoading ?
        <Spin /> :
        <AttributeForm initialValue={data} onfinish={submit} />
      }
    </div>
  )
}

export default EditBrand