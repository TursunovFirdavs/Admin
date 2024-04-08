import { SearchOutlined } from "@ant-design/icons"
import { Input, Modal } from "antd"
import { FC, useState } from "react"

interface Props {
    // isOpen: boolean
}

const SearchForm: FC<Props> = () => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    console.log(isOpenModal);


    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid gray', borderRadius: '20px', overflow: 'hidden', width: '300px', padding: '5px 10px' }} onClick={() => setIsOpenModal(true)}>
                <p>Search</p>
                <SearchOutlined />
            </div>

            <Modal title="Basic Modal" visible={isOpenModal} open={isOpenModal} onOk={() => setIsOpenModal(false)} onCancel={() => setIsOpenModal(false)} >
                <div style={{ display: 'flex', border: '1px solid gray', borderRadius: '20px', overflow: 'hidden', width: '300px', paddingRight: '10px' }}>
                    <Input style={{ border: 'none', outline: 'none' }} placeholder="Search" />
                    <SearchOutlined />
                </div>
            </Modal>
        </div>

    )
}

export default SearchForm