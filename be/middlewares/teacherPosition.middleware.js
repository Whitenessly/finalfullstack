import TeacherPositionModel from "../models/teacherPosition.model.js";

const positionMiddleware = {
    createPosition: async (req, res, next) => {
        try {
            const { name, code } = req.body;

            if (!name || !code) {
                return res.status(400).json({ message: 'Tên và mã (code) là bắt buộc' });
            }

            const existingPosition = await TeacherPositionModel.findOne({ code });
            if (existingPosition) {
                return res.status(400).json({ message: 'Mã vị trí (code) bị trùng, vui lòng chọn mã khác' });
            }

            next();
        } catch (error) {
            return res.status(500).json({ message: 'Lỗi validate dữ liệu vị trí', error: error.message });
        }
    }
};

export default positionMiddleware;