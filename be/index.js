import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import teacherMiddleWare from './middlewares/teacher.middleware.js';
import positionMiddleware from './middlewares/teacherPosition.middleware.js';
import teacherController from './controllers/teacher.controller.js';
import positionController from './controllers/teacherPosition.controller.js';

mongoose.connect('mongodb://localhost:27017/')
    .then(() => console.log('Kết nối database thành công'))
    .catch((err) => console.log('Lỗi kết nối database', err));
const app = express();
app.use(cors());
app.use(express.json());

app.get('/teachers', teacherController.getTeachers);

app.post('/teachers', teacherMiddleWare.createTeacher, teacherController.createTeacher);

app.get('/teacher-positions', positionController.getPositions);

app.post('/teacher-positions', positionMiddleware.createPosition, positionController.createPosition);

app.use('/', (req, res) => {
    res.send({
        message: 'MindX Final Test Server Working...',
        data: null
    });
});

// Khởi chạy server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});