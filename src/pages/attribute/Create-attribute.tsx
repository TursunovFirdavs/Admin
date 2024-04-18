import React, { useState } from 'react';
import { message } from 'antd';
import { useCreateAttribute } from './service/mutation/useCreateAttribute';
import { useNavigate } from 'react-router-dom';
import type { SelectProps } from 'antd';
import { Select } from 'antd';
import AttributeForm from './components/Attribute-form';
import { useGetSub } from '../sub-category/service/query/useGetSub';


const CreateAttribute: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState([] as string[])
  const { mutate } = useCreateAttribute()
  const { data } = useGetSub()
  const navigate = useNavigate()


  const submit = (values: any) => {
    const correctValue: string[] = []
    values?.values.map((item: any) => {
      correctValue.push(item.value)
    })
    console.log(correctValue);

    console.log({ ...values, values: correctValue, category: selectedCat })
    mutate({ ...values, values: correctValue, category: selectedCat }, {
      onSuccess: (res) => {
        console.log(res)
        navigate('/attribute')
        message.success('success')
      },
      onError: err => console.log(err)

    })
  };

  const options: SelectProps['options'] = data?.data?.results?.map((cat: any) => {
    return {
      label: cat.title,
      value: cat.id,
    }
  })

  const handleChange = (value: string[]) => {
    setSelectedCat(value)
  };



  return (
    <div style={{ width: '600px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder="Please select"
        onChange={handleChange}
        options={options}
      />
      <AttributeForm onfinish={submit} />
    </div>
  )
}

export default CreateAttribute