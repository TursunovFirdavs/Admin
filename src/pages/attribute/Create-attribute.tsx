import React from 'react';
import { message } from 'antd';
import { useCreateAttribute } from './service/mutation/useCreateAttribute';
import { useNavigate } from 'react-router-dom';
import { FieldType } from '../brands/components/Form';
import AttributeForm from './components/Attribute-form';


const CreateAttribute: React.FC = () => {

    // const { mutate } = useCreateAttribute()
    // const navigate = useNavigate()

    const submit = (values: any) => {
        console.log(values.items);
        const attr_list = values?.items.map((item:any) => {
          return {
            title: item.title,
            value: item.value
          }
        })
        console.log(attr_list);
        
    };




    return (
        <div>
          <AttributeForm onfinish={submit} />
        </div>
    )
}

export default CreateAttribute