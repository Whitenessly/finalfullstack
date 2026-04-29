import React from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { PlusOutlined, ReloadOutlined, SettingFilled, LeftOutlined, RightOutlined } from '@ant-design/icons'
import { useSearchParams } from 'react-router';
import { useEffect } from "react";
import CreateTeacherModel from "../components/CreateTeacherModel";

const Teacher = () => {
    const [data, setData] = React.useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page')) || 1;
    const currentLimit = parseInt(searchParams.get('limit')) || 10;
    const [isCreateModelOpened, setIsCreateModelOpened] = React.useState(false);

    const handleAPI = async () => {
        await fetch('http://localhost:8080/teachers?page=' + currentPage + '&limit=' + currentLimit)
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error(error);
            })
    }
    React.useEffect(() => {
        handleAPI();
    }, [])

    const teachers = data.data || [];
    const handlePageChange = (newPage) => {
        setSearchParams({ page: newPage, limit: currentLimit });
        location.reload();
    };
    const handleLimitChange = (e) => {
        const newLimit = e.target.value;
        setSearchParams({ page: 1, limit: newLimit });
        location.reload();
    };

    return (
        <div className="w-screen h-screen overflow-hidden">
            <NavBar />
            <div className="h-full flex flex-row">
                <SideBar status={1} />
                <div className="w-full h-full bg-slate-300 py-2 px-5 flex flex-col gap-3">
                    <div className="text-slate-600">Giáo viên</div>
                    <div className="bg-white w-full h-153 p-5 flex flex-col gap-5 overflow-hidden">
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
                        <div className="overflow-y-auto h-115">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#f3efff] text-gray-700 sticky top-0 z-10">
                                    <tr>
                                        <th className="py-4 px-4 font-semibold text-sm">Mã</th>
                                        <th className="py-4 px-4 font-semibold text-sm w-62.5">Giáo viên</th>
                                        <th className="py-4 px-4 font-semibold text-sm">Trình độ (cao nhất)</th>
                                        <th className="py-4 px-4 font-semibold text-sm">Bộ môn</th>
                                        <th className="py-4 px-4 font-semibold text-sm">TT Công tác</th>
                                        <th className="py-4 px-4 font-semibold text-sm">Địa chỉ</th>
                                        <th className="py-4 px-4 font-semibold text-sm">Trạng thái</th>
                                        <th className="py-4 px-4 font-semibold text-sm text-center">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teachers.map((item) => {
                                        const degrees = item.degrees || [];
                                        const teacherPositions = item.teacherPositions || [];
                                        return (
                                            <tr key={item._id} className="border-0 hover:bg-gray-100 text-sm">
                                                <td className="py-2 px-4">{item.code}</td>
                                                <td className="py-2 px-4 w-62.5">
                                                    <div className="font-bold">{item.name}</div>
                                                    <div>{item.email}</div>
                                                    <div>{item.phoneNumber}</div>
                                                </td>
                                                <td className="py-2 px-4">
                                                    {degrees.map((item) => {
                                                        return <div>{item.type}</div>
                                                    })}
                                                </td>
                                                <td className="py-2 px-4 text-gray-400">N/A</td>
                                                <td className="py-2 px-4">
                                                    {teacherPositions.map((item) => {
                                                        return <div>{item.name}</div>
                                                    })}
                                                </td>
                                                <td className="py-2 px-4">{item.address}</td>
                                                <td className="py-2 px-4">
                                                    {item.isActive ? <div className="bg-green-600 py-1 px-2 rounded-sm text-white w-max">Hoạt động</div> : <div
                                                        className="bg-red-600 py-1 px-2 rounded-sm text-white w-max">Không hoạt động</div>}
                                                </td>
                                                <td className="py-3 px-4 text-center">
                                                    <div className="border-2 border-slate-300 py-1 px-2 rounded-sm w-max mx-auto"><SettingFilled /></div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 border-t flex items-center justify-end bg-white text-sm text-blue-600 font-medium gap-4">
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`w-7 h-7 flex items-center justify-center rounded transition-colors ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-blue-50'}`}
                                >
                                    <LeftOutlined />
                                </button>
                                {[...Array(data.totalPages)].map((_, index) => {
                                    const pageNum = index + 1;
                                    const isActive = pageNum === currentPage;
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => handlePageChange(pageNum)}
                                            className={`w-7 h-7 flex items-center justify-center rounded transition-colors${isActive ? 'border border-blue-600 bg-white shadow-sm' : 'text-gray-600 hover:bg-blue-50'}`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === data.totalPages}
                                    className={`w-7 h-7 flex items-center justify-center rounded transition-colors
                    ${currentPage === data.totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-blue-50'}
                  `}
                                >
                                    <RightOutlined />
                                </button>
                            </div>
                            <select
                                value={currentLimit}
                                onChange={handleLimitChange}
                                className="border-none bg-transparent outline-none cursor-pointer focus:ring-0 text-gray-600 text-sm"
                            >
                                <option value={5}>5 / trang</option>
                                <option value={10}>10 / trang</option>
                                <option value={20}>20 / trang</option>
                                <option value={50}>50 / trang</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            {isCreateModelOpened ? <CreateTeacherModel setIsCreateModelOpened={setIsCreateModelOpened} handleApi={handleAPI} /> : null}
        </div>
    )
}

export default Teacher