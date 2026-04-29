import mongoose from 'mongoose';

const degreeSchema = new mongoose.Schema({
    type: String,
    school: String,
    major: String,
    year: Number,
    isGraduated: Boolean
}, { _id: false });

const teacherSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    code: { type: String, required: true, unique: true },
    startDate: { type: Date },
    endDate: { type: Date },
    teacherPositionsId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TeacherPosition' }],
    degrees:[degreeSchema]
});

const TeacherModel = mongoose.model('Teacher', teacherSchema);
export default TeacherModel;