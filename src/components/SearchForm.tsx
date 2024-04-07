import { SearchOutlined } from "@ant-design/icons"
import { Input } from "antd"
import { FC } from "react"

interface Props {
    // onFinish: (values: any) => void
}

const SearchForm: FC<Props> = () => {
    return (
        <div style={{display: 'flex', border: '1px solid gray', borderRadius: '20px', overflow:'hidden', width: '300px', paddingRight: '10px'}}>
            <Input style={{border: 'none', outline: 'none'}} placeholder="Search" />
            <SearchOutlined />
        </div>
    )
}

export default SearchForm