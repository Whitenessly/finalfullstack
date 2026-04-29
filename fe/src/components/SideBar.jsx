import React from "react";
import { useNavigate } from "react-router";

const SideBar = ({ status }) => {
    const nav = useNavigate();
    return (
        <div className="w-60 h-full flex flex-col p-4 gap-2">
            <div onClick={() => nav('/teacher')} style={{ background: status == 1 ? 'rgba(132, 47, 212, 0.2)' : '', color: status == 1 ? '#7405AD' : '#6E6E6E' }} className="font-xl font-semibold p-3 rounded-lg">Giáo viên</div>
            <div onClick={() => nav('/teacher-position')} style={{ background: status == 2 ? 'rgba(132, 47, 212, 0.2)' : '', color: status == 2 ? '#7405AD' : '#6E6E6E' }} className="font-xl font-semibold p-3 rounded-lg">Vị trí công tác</div>
        </div>
    )
}

export default SideBar