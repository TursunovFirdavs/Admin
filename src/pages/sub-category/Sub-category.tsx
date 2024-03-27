import { useGetSub } from "./service/query/useGetSub"

const SubCategory = () => {
    const { data } = useGetSub()
    console.log(data);
    
  return (
    <div>
        
    </div>
  )
}

export default SubCategory