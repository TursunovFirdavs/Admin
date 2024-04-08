import { SearchOutlined } from "@ant-design/icons"
import { Image, Input, Modal } from "antd"
import { FC, useState } from "react"

interface Props {
    searchValue: any
    data: any
}

const SearchForm: FC<Props> = ({searchValue, data}) => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [search, setSearch] = useState('')
    searchValue(search)
    // console.log(search);


    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid gray', borderRadius: '20px', overflow: 'hidden', width: '300px', padding: '5px 10px' }} onClick={() => setIsOpenModal(true)}>
                <p>Search</p>
                <SearchOutlined />
            </div>

            <Modal title="Basic Modal" visible={isOpenModal} open={isOpenModal} onOk={() => setIsOpenModal(false)} onCancel={() => setIsOpenModal(false)} >
                <div style={{ display: 'flex', border: '1px solid gray', borderRadius: '20px', overflow: 'hidden', width: '100%', paddingRight: '10px' }}>
                    <Input onChange={(e) => setSearch(e.target.value)} style={{ border: 'none', outline: 'none' }} placeholder="Search" />
                    <SearchOutlined />
                </div>
                <div style={{marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '5px'}}>
                    {search.length > 1 && data?.map((item: any) => (
                        <div style={{display: 'flex', alignItems: 'center', gap: '30px'}}>
                            <Image style={{width: '50px', height: '50px'}} src={item.image} />
                            <p style={{fontSize: '18px'}}>{item.title}</p>
                        </div>
                    ))}
                </div>
            </Modal>
        </div>

    )
}

export default SearchForm