import React from 'react'
import { useState, useEffect } from 'react';
import { CloseOutlined, DeleteFilled } from '@ant-design/icons'
import { CloudUpload, Inbox, Save } from 'lucide-react';

function SectionDivider({ title, className = "" }) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <span className="text-gray-800 font-bold text-sm tracking-wide whitespace-nowrap">
                {title}
            </span>
            <div className="h-px w-full bg-[#e3dcf5]"></div>
        </div>
    );
}

function InputField({ onChange, label, placeholder, required, isDate, isSelect }) {
    return (
        <div className="flex flex-col gap-0.5">
            <label className="text-gray-700 font-semibold mt">
                {required && <span className="text-red-500 mr-1">*</span>}
                {label}
            </label>

            <div className="relative">
                <input
                    onChange={onChange}
                    type={label === "Ngày sinh" ? "date" : "text"}
                    placeholder={placeholder}
                    readOnly={isSelect || isDate}
                    className={`
            w-full px-3 py-2.25 border border-gray-200 rounded-md text-sm outline-none text-gray-700
            placeholder:text-gray-300 focus:border-purple-500 transition-colors
            ${(isSelect || isDate) ? 'cursor-pointer' : ''}`}
                />

            </div>
        </div>
    );
}

const CreateTeacherModel = ({ setIsCreateModelOpened, handleApi }) => {
    const [positionsData, setPositionsData] = useState([]);
    const [degrees, setDegrees] = useState([]);
    const [warningNotification, setWarningNotification] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [identity, setIdentity] = useState('');
    const [address, setAddress] = useState('');
    const [dob, setDob] = useState('');
    const [isSelectPosition, setIsSelectPosition] = useState('');
    const amountOfDegrees = degrees.length;

    const onChangeName = (e) => {
        setName(e.target.value);
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const onChangePhoneNumber = (e) => {
        setPhoneNumber(e.target.value);
    }
    const onChangeIdentity = (e) => {
        setIdentity(e.target.value);
    }
    const onChangeAddress = (e) => {
        setAddress(e.target.value);
    }
    const onChangeDob = (e) => {
        setDob(e.target.value);
    }
    const onChangePosition = (e) => {
        setIsSelectPosition(e.target.value);
    }
    const onChangeDegree = (index, field, value) => {
        setDegrees(prevDegrees => {
            const updatedDegrees = [...prevDegrees];
            updatedDegrees[index] = {
                ...updatedDegrees[index],
                [field]: value
            };
            return updatedDegrees;
        });
    }

    const handleAPIPositions = async () => {
        await fetch('http://localhost:8080/teacher-positions')
            .then(response => response.json())
            .then(data => {
                setPositionsData(data.data);
            })
            .catch(error => {
                console.error(error);
            })
    }
    React.useEffect(() => {
        handleAPIPositions();
    }, [])

    const onClickAddDegree = () => {
        setDegrees(prevDegrees => [...prevDegrees, { type: '', university: '', major: '', isGraduated: false, year: '' }]);
    }

    const onClickRemoveDegree = (index) => {
        setDegrees(prevDegrees => prevDegrees.filter((_, i) => i !== index));
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const positionId = positionsData.find(position => position.name === isSelectPosition)._id;
        const isMissDegree = degrees.some(d => !d.type || !d.university || !d.major || !d.year);

        if (!name || !email || !phoneNumber || !identity || !address || !dob || !isSelectPosition || isMissDegree) {
            setWarningNotification('Vui lòng điền đầy đủ thông tin bắt buộc (kể cả các ô Học vị)!');
            return;
        }

        const body = {
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            address: address,
            identity: identity,
            dob: dob,
            teacherPositionsId: positionId,
            degrees: degrees
        }
        console.log(body);
        const response = await fetch('http://localhost:8080/teachers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                address: address,
                identity: identity,
                dob: dob,
                startDate: Date.now(),
                endDate: Date.now() + 365 * 24 * 60 * 60 * 1000,
                teacherPositionsId: positionId,
                degrees: degrees
            })
        });

        const result = await response.json();

        if (response.ok) {
            setWarningNotification('');
        } else {
            setWarningNotification(result.message);
            return;
        }
        setIsCreateModelOpened(false);
        handleApi();
    }

    return (
        <div className='w-screen h-screen fixed top-0 z-10 bg-black/40'>
            <div className='fixed z-20 bg-white p-6 rounded-md w-200 h-full right-0'>
                <div className='flex flex-row gap-2 items-center mb-4'>
                    <div onClick={() => setIsCreateModelOpened(false)} className='text-xl text-slate-600'><CloseOutlined /></div>
                    <div className='text-lg font-bold'>Tạo thông tin giáo viên</div>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex shrink-0 items-start gap-4 mt-2">
                        <div className="w-35 h-40 overflow-hidden">
                            <img
                                src="https://img.freepik.com/premium-vector/young-asian-man-s-portrait-cartoon-vector-illustration-isolated-on-white-background-schoolboy_641617-69.jpg"
                                alt="avatar"
                                className="w-full h-full object-cover rounded-md border border-gray-100"
                            />
                        </div>
                        <button className="w-25 h-30 mt-4 border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 hover:border-gray-400 transition-colors">
                            <CloudUpload size={24} className="mb-1" />
                            <span className="text-[10px] font-medium leading-tight">Upload file</span>
                            <span className="text-xs font-semibold mt-0.5 text-gray-600">Chọn ảnh</span>
                        </button>
                    </div>

                    <div className="flex-1 flex flex-col text-sm">
                        <SectionDivider title="Thông tin cá nhân" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mt-1">
                            <InputField onChange={onChangeName} label="Họ và tên" placeholder="VD: Nguyễn Văn A" required />
                            <div>
                                <div className='text-gray-700 font-semibold mb-0.5'>Ngày sinh <span className='text-red-500'>*</span></div>
                                <input type='date' className='w-full px-3 py-2.25 border border-gray-200 rounded-md text-sm outline-none text-gray-700
            placeholder:text-gray-300 focus:border-purple-500 transition-colors' onChange={onChangeDob} />
                            </div>

                            <InputField onChange={onChangePhoneNumber} label="Số điện thoại" placeholder="Nhập số điện thoại" required />
                            <InputField onChange={onChangeEmail} label="Email" placeholder="example@school.edu.vn" required />
                            <InputField onChange={onChangeIdentity} label="Số CCCD" placeholder="Nhập số CCCD" required />
                            <InputField onChange={onChangeAddress} label="Địa chỉ" placeholder="Địa chỉ thường trú" required />
                        </div>
                    </div>
                </div>

                <div>
                    <SectionDivider title="Thông tin công tác" />
                    <div className='text-gray-700 font-semibold mb-0.5'>Vị trí công tác <span className='text-red-500'>*</span></div>
                    <select onChange={onChangePosition} className='w-full p-2 border border-gray-200 rounded-md text-sm outline-none text-gray-700 placeholder:text-gray-300 focus:border-purple-500 transition-colors'>
                        <option value="">-- Vui lòng chọn vị trí công tác --</option>
                        {positionsData.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>

                <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                        <SectionDivider title="Học vị" className="flex-1" />
                        <button onClick={onClickAddDegree} className="ml-4 px-4 py-1.5 border border-gray-200 rounded-md text-gray-600 font-medium hover:bg-gray-50 transition-colors shadow-sm bg-white">
                            Thêm
                        </button>
                    </div>

                    <div className="border border-gray-100 rounded-md overflow-y-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-[#f2eefd] text-gray-700 text-sm">
                                <tr>
                                    <th className="py-3 px-4 font-semibold w-1/9">Bậc</th>
                                    <th className="py-3 px-4 font-semibold w-1/5">Trường</th>
                                    <th className="py-3 px-4 font-semibold w-1/6">Chuyên ngành</th>
                                    <th className="py-3 px-4 font-semibold w-1/7">Trạng thái (Đã tốt nghiệp)</th>
                                    <th className="py-3 px-4 font-semibold w-1/8">Tốt nghiệp (năm)</th>
                                    <th className="py-3 px-4 font-semibold w-1/12"></th>
                                </tr>
                            </thead>

                            <tbody className="max-h-40 overflow-y-auto">
                                {degrees.map((degree, index) => (
                                    <tr key={index} className="border-t border-gray-100">
                                        <td className="py-2 px-4">
                                            <select
                                                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm outline-none text-gray-700 placeholder:text-gray-300 focus:border-purple-500 transition-colors"
                                                onChange={(e) => onChangeDegree(index, 'type', e.target.value)}
                                            >
                                                <option value="">Chọn bậc học</option>
                                                <option value="Trung học">Trung học</option>
                                                <option value="Cao đẳng">Cao đẳng</option>
                                                <option value="Cử nhân">Cử nhân</option>
                                                <option value="Kỹ sư">Kỹ sư</option>
                                                <option value="Thạc sĩ">Thạc sĩ</option>
                                                <option value="Tiến sĩ">Tiến sĩ</option>
                                                <option value="Hậu tiến sĩ">Hậu tiến sĩ</option>
                                                <option value="Giáo sư">Giáo sư</option>
                                            </select>
                                        </td>
                                        <td className="py-2 px-4">
                                            <input
                                                type="text"
                                                placeholder="Nhập trường"
                                                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm outline-none text-gray-700 placeholder:text-gray-300 focus:border-purple-500 transition-colors"
                                                onChange={(e) => onChangeDegree(index, 'university', e.target.value)}
                                            />
                                        </td>
                                        <td className="py-2 px-4">
                                            <input
                                                type="text"
                                                placeholder="Nhập chuyên ngành"
                                                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm outline-none text-gray-700 placeholder:text-gray-300 focus:border-purple-500 transition-colors"
                                                onChange={(e) => onChangeDegree(index, 'major', e.target.value)}
                                            />
                                        </td>
                                        <td className="py-2 px-4">
                                            <input
                                                type="checkbox"
                                                placeholder="Nhập trạng thái"
                                                className="w-full h-5 border border-gray-200 rounded-md text-sm outline-none text-gray-700 placeholder:text-gray-300 focus:border-purple-500 transition-colors"
                                                onChange={(e) => onChangeDegree(index, 'isGraduated', e.target.checked)}
                                            />
                                        </td>
                                        <td className="py-2 px-4">
                                            <input
                                                type="text"
                                                placeholder="Nhập năm tốt nghiệp"
                                                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm outline-none text-gray-700 placeholder:text-gray-300 focus:border-purple-500 transition-colors"
                                                onChange={(e) => onChangeDegree(index, 'year', e.target.value)}
                                            />
                                        </td>
                                        <td className="py-2 px-4">
                                            <button onClick={() => onClickRemoveDegree(index)} className="px-3 py-1.5 border border-red-200 rounded-md text-red-500 font-medium hover:bg-red-100 transition-colors shadow-sm bg-white">
                                                <DeleteFilled />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {amountOfDegrees === 0 ?
                            <div className="flex flex-col items-center justify-center w-full py-6 text-gray-300">
                                <Inbox size={48} strokeWidth={1} />
                                <span className="mt-2 text-sm font-medium">Trống</span>
                            </div>
                            : null
                        }
                    </div>
                </div>

                {warningNotification && <div className="mt-2 text-red-500 text-sm">{warningNotification}</div>}
                <div className="flex justify-end pt-4 pb-12">
                    <button onClick={onSubmit} className="flex items-center gap-2 px-6 py-2 border border-gray-200 rounded-md shadow-sm font-medium hover:bg-gray-50 transition-colors bg-white text-gray-700">
                        <Save size={16} /> Lưu
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateTeacherModel