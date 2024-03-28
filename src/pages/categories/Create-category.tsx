import React from 'react';
import { message } from 'antd';
import { usePostCategory } from './service/mutation/usePostCategory';
import { useNavigate } from 'react-router-dom';
import CategoryForm from './components/Category-form';
import { FieldType } from './components/Category-form';


const CreateCategory: React.FC = () => {

    const { mutate } = usePostCategory()
    const navigate = useNavigate()

    const submit = (values: FieldType) => {
        const fomrData = new FormData();
        fomrData.append('title',values.title);
        fomrData.append('image',values.image.file)
        mutate(fomrData, {
            onSuccess: () => {
                message.success('success')
                navigate('/')
            },
            onError: err => console.log(err)
            
            
        })
    };




    return (
        <div>
          <CategoryForm loading={false} onFinish={submit} />
        </div>
    )
}

export default CreateCategory