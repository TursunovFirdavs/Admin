import React from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCreateBanner } from './service/mutation/useCreateBanner';
import BannerForm from './components/Banner-form';


const CreateBanner: React.FC = () => {

    const { mutate } = useCreateBanner()
    const navigate = useNavigate()

    const submit = (values: any) => {
        console.log(values);
        const fomrData = new FormData();
        fomrData.append('title',values.title);
        fomrData.append('description', values.description)
        if(values.image) {
            fomrData.append('image',values.image.file)
        }
        mutate(fomrData, {
            onSuccess: () => {
                message.success('success')
                navigate('/banner')
            },
            onError: err => console.log(err) 
        })
    };

    return (
        <div>
          <BannerForm onFinish={submit} />
        </div>
    )
}

export default CreateBanner