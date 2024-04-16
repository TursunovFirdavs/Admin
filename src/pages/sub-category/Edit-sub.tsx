import { useNavigate, useParams } from "react-router-dom"
import { useGetSingleSub } from "./service/query/useGetSingleSub"
import SubForm from "./components/Sub-form"
import { useEditSub } from "./service/mutation/useEditSub"
import { FieldType } from "../categories/components/Category-form"
import { Spin, Tabs, message } from "antd"
import TabPane from "antd/es/tabs/TabPane"
import AttributeForm from "../attribute/components/Attribute-form"
import { useState } from "react"
import { useGetSingleAttribute } from "../attribute/service/query/useGetSingleAtt"
import { useEditAttribute } from "./service/mutation/useEditAttribute"
import { useCreateAttribute } from "../attribute/service/mutation/useCreateAttribute"

const EditSub = () => {
  const [tab, setTab] = useState('1')
  const { id } = useParams()
  const { data, isLoading } = useGetSingleSub(id as string)
  const { mutate } = useEditSub(id as string)
  const { mutate: etidAttMutate } = useEditAttribute()
  const { mutate: createAttMutate } = useCreateAttribute()
  const navigate = useNavigate()
 
  const handleChange = (key: any) => {
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

  const editAttribute = (values: any) => {
    const updateValue: any = []
    const newValue: any = []
    values.items.map((item: any) => {
      if (item.id) {
        const correctValue: any = []
        item.values.map((value: any) => {
          correctValue.push({
            value: value.value,
            value_id: value.id
          })
        })
        updateValue.push({
          attribute_id: item.id,
          title: item.title,
          values: correctValue
        })
      }
      else {
        const correctValue: any = []
        item?.values.map((item: any) => {
          correctValue.push(item.value)
        })
        newValue.push({
          title: item.title,
          values: correctValue,
          category: [data.id]
        })
      }
    })
    console.log(newValue);
    etidAttMutate({ attributes: updateValue, category_id: data.id }, {
      onSuccess: () => {
        message.success('success')
        navigate('/sub-category')
      }
    })
    createAttMutate(newValue, )
  }


  return (
    <div>
      {isLoading ? <Spin /> :
        <Tabs activeKey={tab} onChange={handleChange}>
          <TabPane tab="Sub-category" key="1">
            <SubForm onFinish={submit} initialValues={data} />
          </TabPane>
          <TabPane tab="Attribute" key="2">
            <AttributeForm onfinish={editAttribute} initialValue={data?.attributes.length && data?.attributes} />
          </TabPane>
        </Tabs>
      }
    </div>
  )
}

export default EditSub