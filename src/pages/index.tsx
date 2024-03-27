import { Route, Routes } from "react-router-dom"
import Login from "./login/Login"
import Categories from "./categories/Categories"
import CreateCategory from "./create-category/Create-category"

const index = () => {
  return (
    <Routes>
        <Route path="/" element={<Categories/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/create-category" element={<CreateCategory/>} />
    </Routes>
  )
}

export default index