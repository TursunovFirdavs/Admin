import { Route, Routes } from "react-router-dom"
import Login from "./login/Login"
import Categories from "./categories/Categories"
import CreateCategory from "./categories/Create-category"
import EditCategory from "./categories/Edit-category"
import SubCategory from "./sub-category/Sub-category"
import CreateSub from "./sub-category/Create-sub"
import EditSub from "./sub-category/Edit-sub"
import Brands from "./brands/Brands"
import EditBrands from "./brands/Edit-brands"
import CreateBrand from "./brands/Create-brands"

const index = () => {
  return (
    <Routes>
        <Route path="/" element={<Categories/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/create-category" element={<CreateCategory/>} />
        <Route path="/edit-category/:id" element={<EditCategory/>} />
        <Route path="/sub-category" element={<SubCategory/>} />
        <Route path="/create-sub" element={<CreateSub/>} />
        <Route path="/edit-sub/:id" element={<EditSub/>} />
        <Route path="/brands" element={<Brands/>} />
        <Route path="/edit-brand/:id" element={<EditBrands/>} />
        <Route path="/create-brand" element={<CreateBrand/>} />
    </Routes>
  )
}

export default index