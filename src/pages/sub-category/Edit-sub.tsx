import { useNavigate, useParams } from "react-router-dom"
import { useGetSingleSub } from "./service/query/useGetSingleSub"
import SubForm from "./components/Sub-form"
import { useEditSub } from "./service/mutation/useEditSub"
import { FieldType } from "../categories/components/Category-form"
import { Tabs, message } from "antd"
import TabPane from "antd/es/tabs/TabPane"
import AttributeForm from "../attribute/components/Attribute-form"
import { useState } from "react"
import { useGetSingleAttribute } from "../attribute/service/query/useGetSingleAtt"
import { useEditAttribute } from "./service/mutation/useEditAttribute"

const EditSub = () => {
  const [tab, setTab] = useState('1')
  const { id } = useParams()
  const { data } = useGetSingleSub(id as string)
  const { data: singleAtt } = useGetSingleAttribute(data?.attributes[0]?.id) 
  const { mutate } = useEditSub(id as string)
  const { mutate: attributeMutate } = useEditAttribute()
  const navigate = useNavigate()
  console.log(singleAtt);
  console.log(data);

  const handleChange = (key:any) => {
    setTab(key);
  };

  const submit = (values: FieldType) => {
      const formData = new FormData()
      formData.append('title', values.title)
      formData.append('image', values.image.file)
      mutate(formData, {
        onSuccess: () => {
          setTab('2')
        },
        onError: err => console.log(err)
        
      })
  }

  const editAttribute = (values:any) => {
    console.log(values);
    const edited = values?.values.map((value: any) => {
      return {
        value: value.value,
        value_id: value.id || null
      }
    })
    console.log({attributes: [{...values, attribute_id: singleAtt.id, values: edited}], category_id: singleAtt.category[0]});
    attributeMutate({attributes: [{...values, attribute_id: singleAtt.id, values: edited}], category_id: singleAtt.category[0]}, {
      onSuccess: (res) => {
        console.log(res);
        message.success('success')
        navigate('/sub-category')
      },
      onError: err => console.log(err)
      
    })
  }
  

  return (
    <div>
      <Tabs activeKey={tab} onChange={handleChange}>
        <TabPane tab="Sub-category" key="1">
          <SubForm onFinish={submit} initialValues={data} />
        </TabPane>  
        {
          data?.attributes.length && 
          <TabPane tab="Attribute" key="2">
          <AttributeForm onfinish={editAttribute} initialValue={singleAtt} />
        </TabPane> 
        }
      </Tabs>;
    </div>
  )
}

export default EditSub