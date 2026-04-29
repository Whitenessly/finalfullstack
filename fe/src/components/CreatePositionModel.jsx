import React from 'react'
import { useState } from 'react';

const CreatePositionModel = ({ setIsCreateModelOpened, handleApi }) => {
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [des, setDes] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [warningNotification, setWarningNotification] = useState('');
    const onChangeCode = (e) => {
        setCode(e.target.value);
    }
    const onChangeName = (e) => {
        setName(e.target.value);
    }
    const onChangeDes = (e) => {
        setDes(e.target.value);
    }
    const onChangeIsActive = (e) => {
        setIsActive(e.target.value === 'true');
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        if (!code || !name || !des) {
            setWarningNotification('Mã, tên và mô tả là bắt buộc!');
            return;
        }
        const response = await fetch('http://localhost:8080/teacher-positions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                code: code.toUpperCase(),
                des: des || '',
                isActive: isActive || true,
                timestamps: true
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
            <div className='fixed z-20 bg-white p-6 rounded-md w-100 h-full right-0'>
                <h2 className='text-lg font-bold mb-4'>Tạo vị trí công tác</h2>
                <form>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>Mã <span className='text-red-500'>*</span></label>
                        <input type="text" className='border w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500' value={code} onChange={onChangeCode} />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>Tên <span className='text-red-500'>*</span></label>
                        <input type="text" className='border w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500' value={name} onChange={onChangeName} />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>Mô tả <span className='text-red-500'>*</span></label>
                        <textarea className='border w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500' value={des} onChange={onChangeDes}></textarea>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>Trạng thái <span className='text-red-500'>*</span></label>
                        <select className='border w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500' value={isActive.toString()} onChange={onChangeIsActive}>
                            <option value="true">Hoạt động</option>
                            <option value="false">Không hoạt động</option>
                        </select>
                    </div>
                    {warningNotification ? <div className='mb-4 text-red-500'>{warningNotification}</div> : null}
                    <div className='flex justify-end gap-2'>
                        <button onClick={() => setIsCreateModelOpened(false)} type="button" className='bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600'>Hủy</button>
                        <button type="submit" className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600' onClick={onSubmit}>Tạo</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatePositionModel