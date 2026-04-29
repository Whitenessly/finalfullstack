import React, { useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { PlusOutlined, ReloadOutlined, SettingFilled } from '@ant-design/icons'
import CreatePositionModel from "../components/CreatePositionModel";

const TeacherPosition = () => {
    const [data, setData] = React.useState([]);
    const [isCreateModelOpened, setIsCreateModelOpened] = useState(false)
    const handleApi = async () => {
        await fetch('http://localhost:8080/teacher-positions')
            .then(response => response.json())
            .then(data => {
                setData(data.data);
            })
            .catch(error => {
                console.error(error);
            })
    }
    React.useEffect(() => {
        handleApi();
    }, [])

    return (
        <div className="w-screen h-screen overflow-hidden">
            <NavBar />
            <div className="h-full flex flex-row">
                <SideBar status={2} />
                <div className="w-full h-full bg-slate-300 py-2 px-5 flex flex-col gap-3">
                    <div className="text-slate-600">Vị trí công tác</div>
                    <div className="bg-white w-full h-153 p-5 flex flex-col gap-5">
                        <div className="flex flex-row justify-end gap-2">
                            <div onClick={() => { setIsCreateModelOpened(true) }} className="flex flex-row gap-2 border-2 py-1 px-2 rounded-md items-center border-slate-300 hover:bg-slate-100">
                                <PlusOutlined />
                                <p>Tạo</p>
                            </div>
                            <div onClick={() => { location.reload() }} className="flex flex-row gap-2 border-2 py-1 px-2 rounded-md items-center border-slate-300 hover:bg-slate-100">
                                <ReloadOutlined />
                                <p>Tải lại</p>
                            </div>
                        </div>
                        <div className="text-sm flex flex-col gap-1">
                            <div className="w-full h-9 bg-purple-300/50 flex flex-row items-center px-3 font-semibold">
                                <div className="w-[8%]">STT</div>
                                <div className="w-[12%]">Mã</div>
                                <div className="w-[20%]">Tên</div>
                                <div className="px-2">Trạng thái</div>
                                <div className="pl-36">Mô tả</div>
                            </div>
                            {data.map((item) => {
                                return (
                                    <div className="w-full h-9 flex flex-row items-center px-3 relative">
                                        <div className="w-[8%]">{data.findIndex(temp => temp === item) + 1}</div>
                                        <div className="w-[12%]">{item.code}</div>
                                        <div className="w-[20%]">{item.name}</div>
                                        <div className=" text-white">
                                            {item.isActive ? <div className="bg-green-600 py-1 px-2 rounded-sm">Hoạt động</div> : <div className="bg-red-600">Hoạt động</div>}
                                        </div>
                                        <div className="pl-36">{item.des}</div>
                                        <div className="border-2 border-slate-300 py-1 px-2 rounded-sm absolute right-3"><SettingFilled /></div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            {isCreateModelOpened ? <CreatePositionModel setIsCreateModelOpened={setIsCreateModelOpened} handleApi={handleApi} /> : null}
        </div>
    )
}

export default TeacherPosition