import { useNavigate, useParams } from 'react-router-dom'
import { message, Spin } from 'antd';
import { useGetSingleBanner } from './service/query/useGetSingleBanner';
import BannerForm from './components/Banner-form';
import { useEditBanner } from './service/mutation/useEtitBanner';
import { getBanner } from '../../config/types';



const EditBanner: React.FC = () => {

  const { id } = useParams()
  const { data, isLoading } = useGetSingleBanner(id as string)
  const { mutate } = useEditBanner(id as string)
  const navigate = useNavigate()

  // console.log(data);


  const submit = (values: getBanner) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    if (values.image && values.image.file) {
      formData.append('image', values.image.file)
    }
    mutate(formData, {
      onSuccess: (res) => {
        console.log(res);

        message.success('success')
        navigate('/banner')
      },
      onError: err => console.log(err)


    })
  };

  return (
    <div>
      {isLoading ?
        <Spin /> :
        <BannerForm initialValues={data} onFinish={submit} />
      }
    </div>
  )
}

export default EditBanner