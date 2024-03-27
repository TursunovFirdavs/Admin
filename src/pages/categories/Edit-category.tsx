import CategoryForm from './components/Category-form'

const submit = () => {

}

const EditCategory = () => {
  return (
    <div>
      <CategoryForm onFinish={submit} />
    </div>
  )
}

export default EditCategory