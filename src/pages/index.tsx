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
import Products from "./products/Products"
import CreateProduct from "./products/Create-product"
import EditProduct from "./products/Edit-product"
import Banner from "./banner/Banner"
import EditBanner from "./banner/Edit-banner"
import CreateBanner from "./banner/Create-banner"


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
        <Route path="/products" element={<Products/>} />
        <Route path="/create-product" element={<CreateProduct/>} />
        <Route path="/edit-product/:id" element={<EditProduct/>} />
        <Route path="/banner" element={<Banner/>} />
        <Route path="/create-banner" element={<CreateBanner/>} />
        <Route path="/edit-banner/:id" element={<EditBanner/>} />
    </Routes>
  )
}

export default index