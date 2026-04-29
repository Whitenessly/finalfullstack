import UserModel from "../models/user.model.js";

const teacherMiddleWare = {
    createTeacher: async (req, res, next) => {
        try {
            const { name, email, phoneNumber, identity, address, dob } = req.body;

            if (!name || !email || !phoneNumber || !identity || !address || !dob) {
                return res.status(400).json({ message: 'Tất cả các trường đều là bắt buộc!' });
            }

            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email đã tồn tại trong hệ thống, vui lòng dùng email khác.' });
            }

            next();
        } catch (error) {
            return res.status(500).json({ message: 'Lỗi validate dữ liệu giáo viên', error: error.message });
        }
    }
};

export default teacherMiddleWare;