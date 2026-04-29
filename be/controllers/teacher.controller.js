import { get } from "mongoose";
import TeacherModel from "../models/teacher.model.js";
import UserModel from "../models/user.model.js";

// Đảm bảo mã 10 số được gen ngẫu nhiên
const generateRandomCode = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};

const teacherController = {
    createTeacher: async (req, res) => {
        try {
            const { name, email, phoneNumber, address, identity, dob, startDate, endDate, teacherPositionsId, degrees } = req.body;

            let newCode;
            let isCodeExist = true;
            while (isCodeExist) {
                newCode = generateRandomCode();
                const existingTeacher = await TeacherModel.findOne({ code: newCode });
                if (!existingTeacher) isCodeExist = false;
            }

            const newUser = new UserModel({
                name, email, phoneNumber, address, identity, dob, role: 'TEACHER'
            });
            const savedUser = await newUser.save();

            const newTeacher = new TeacherModel({
                userId: savedUser._id,
                code: newCode,
                startDate,
                endDate,
                teacherPositionsId,
                degrees
            });
            await newTeacher.save();

            return res.status(201).json({ message: 'Tạo giáo viên thành công', data: newTeacher });
        } catch (error) {
            return res.status(500).json({ message: 'Lỗi khi tạo giáo viên', error: error.message });
        }
    },

    getTeachers: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;

            const teachers = await TeacherModel.find({ isDeleted: false })
                .populate('userId', 'name email phoneNumber address')
                .populate('teacherPositionsId', 'name code des')
                .skip(skip)
                .limit(limit);

            const formatData = teachers.map(t => {
                return {
                    code: t.code,
                    name: t.userId?.name,
                    email: t.userId?.email,
                    phoneNumber: t.userId?.phoneNumber,
                    isActive: t.isActive,
                    address: t.userId?.address,
                    teacherPositions: t.teacherPositionsId,
                    degrees: t.degrees
                };
            });

            const total = await TeacherModel.countDocuments({ isDeleted: false });

            return res.status(200).json({
                message: 'Lấy dữ liệu thành công',
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                data: formatData
            });

        } catch (error) {
            return res.status(500).json({ message: 'Lỗi khi lấy thông tin giáo viên', error: error.message });
        }
    }
};

export default teacherController;