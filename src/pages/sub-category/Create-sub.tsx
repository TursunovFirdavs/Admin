import SubForm from "./components/Sub-form"
import { useCreateSub } from "./service/mutation/useCreateSub";
import { FieldType } from "./components/Sub-form";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, message } from "antd";
import AttributeForm from "../attribute/components/Attribute-form";
import TabPane from "antd/es/tabs/TabPane";
import { useCreateAttribute } from "../attribute/service/mutation/useCreateAttribute";

const CreateSub: FC = () => {
  const [tab, setTab] = useState('1')
  const [subId, setSubId] = useState(0)
  const { mutate } = useCreateSub()
  const { mutate: attributeMutate } = useCreateAttribute()
  const navigate = useNavigate()

  const handleChange = (key:any) => {
    setTab(key);
  };

  const submit = (values: FieldType) => {
    console.log(values);
    
    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('image', values.image.file)
    formData.append('parent', values.parent)
    mutate(formData, {
      onSuccess: (res) => {
        console.log(res.data.id);
        setSubId(res.data.id)
        setTab('2')
      },
      onError: err => console.log(err)
    })
  }

  console.log(tab);
  

  const createAttribute = (values:any) => {
    const correctValue: string[] = []
    values?.values.map((item: any) => {
      correctValue.push(item.value)
    })
    console.log(correctValue);
    
    console.log({...values, values:correctValue, category: [subId]})
    attributeMutate({...values, values:correctValue, category: [subId]}, {
      onSuccess: (res) => {
        console.log(res)
        navigate('/attribute')
        message.success('success')
      },
      onError: err => console.log(err)
      
    })
  }


  return (
    <div>
      <Tabs activeKey={tab} onChange={handleChange} >
        <TabPane tab="Sub-category" key="1">
          <SubForm onFinish={submit} />
        </TabPane>  
        <TabPane tab="Attribute" key="2">
          <AttributeForm onfinish={createAttribute} />
        </TabPane> 
      </Tabs>;
    </div>
  )
}

export default CreateSub