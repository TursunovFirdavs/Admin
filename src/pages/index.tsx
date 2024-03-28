import { Route, Routes } from "react-router-dom"
import Login from "./login/Login"
import Categories from "./categories/Categories"
import CreateCategory from "./categories/Create-category"
import EditCategory from "./categories/Edit-category"
import SubCategory from "./sub-category/Sub-category"

const index = () => {
  return (
    <Routes>
        <Route path="/" element={<Categories/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/create-category" element={<CreateCategory/>} />
        <Route path="/edit-category/:id" element={<EditCategory/>} />
        <Route path="/sub-category" element={<SubCategory/>} />
    </Routes>
  )
}

export default index