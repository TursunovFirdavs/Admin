import React from 'react';
import { message } from 'antd';
import { useCreateBrand } from './service/mutation/useCreateBrand';
import { useNavigate } from 'react-router-dom';
import BrandForm from './components/Form';
import { FieldType } from './components/Form';


const CreateBrand: React.FC = () => {

    const { mutate } = useCreateBrand()
    const navigate = useNavigate()

    const submit = (values: FieldType) => {
        const fomrData = new FormData();
        fomrData.append('title',values.title);
        fomrData.append('image',values.image.file)
        mutate(fomrData, {
            onSuccess: () => {
                message.success('success')
                navigate('/brands')
            },
            onError: err => console.log(err)
            
            
        })
    };




    return (
        <div>
          <BrandForm loading={false} onFinish={submit} />
        </div>
    )
}

export default CreateBrand