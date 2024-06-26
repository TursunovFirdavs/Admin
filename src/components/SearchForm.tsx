import { SearchOutlined } from "@ant-design/icons"
import { Image, Input, Modal } from "antd"
import { FC, useRef, useState } from "react"
import { Link } from "react-router-dom"

interface Props {
    searchValue: any
    data: any
    title: string
}

const SearchForm: FC<Props> = ({ searchValue, data, title }) => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [value, setValue] = useState('')
    searchValue(value)
    const inputRef: any = useRef(null)

    const handleModalVisibilityChange = (newVisible: any) => {
        if (newVisible) {
            inputRef.current?.focus();
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid gray', borderRadius: '20px', overflow: 'hidden', width: '300px', padding: '5px 10px' }} onClick={() => setIsOpenModal(true)}>
                <p>Search</p>
                <SearchOutlined />
            </div>

            <Modal title="Basic Modal" afterOpenChange={handleModalVisibilityChange} open={isOpenModal} onOk={() => setIsOpenModal(false)} onCancel={() => setIsOpenModal(false)} >
                <div style={{ display: 'flex', border: '1px solid gray', borderRadius: '20px', overflow: 'hidden', width: '100%', paddingRight: '10px' }}>
                    {isOpenModal && <Input ref={inputRef} onChange={(e) => setValue(e.target.value)} style={{ border: 'none', outline: 'none' }} placeholder="Search" />}
                    <SearchOutlined />
                </div>
                <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    {value.length > 1 && data?.map((item: any) => (
                        <Link to={`/edit-${title}/${item.id}`} style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                            <Image style={{ width: '50px', height: '50px' }} src={item.image} />
                            <p style={{ fontSize: '18px', color: '#000' }}>{item.title}</p>
                        </Link>
                    ))}
                </div>
            </Modal>
        </div>

    )
}

export default SearchForm