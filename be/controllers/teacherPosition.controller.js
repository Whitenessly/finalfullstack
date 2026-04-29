import TeacherPositionModel from "../models/teacherPosition.model.js";

const positionController = {
    createPosition: async (req, res) => {
        try {
            const { name, code, des } = req.body;

            const newPosition = new TeacherPositionModel({
                name,
                code,
                des
            });
            await newPosition.save();

            return res.status(201).json({ message: 'Tạo vị trí thành công', data: newPosition });
        } catch (error) {
            return res.status(500).json({ message: 'Lỗi khi tạo vị trí', error: error.message });
        }
    },

    getPositions: async (req, res) => {
        try {
            const positions = await TeacherPositionModel.find({ isDeleted: false });

            return res.status(200).json({
                message: 'Lấy thông tin các vị trí thành công',
                data: positions
            });
        } catch (error) {
            return res.status(500).json({ message: 'Lỗi khi lấy thông tin vị trí', error: error.message });
        }
    }
};

export default positionController;