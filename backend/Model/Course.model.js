import mongoose from 'mongoose'

const FeatureSchema = new mongoose.Schema({
    icon: { type: String, required: true },
    text: { type: String, required: true },
}, { _id: false });

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    oldPrice: { type: Number, required: true },
    newPrice: { type: Number, required: true },
    discount: { type: String, required: true },
    features: { type: [FeatureSchema], required: true },
    subjects: { type: [String], required: true },
    materialsLink: { type: String, required: true },
    mockTestLink: { type: String },
}, { timestamps: true });

export const Course = mongoose.model('Course', CourseSchema);

export default Course;