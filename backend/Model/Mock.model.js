import mongoose from 'mongoose'

const MockSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true,
        trim: true,
    },
    Week:{
        type:String,
        required:true,
        trim:true
    },
    Description: {
        type: String,
        required: true,
        trim: true,
    },
    Img:{
        type:String,
        required:true,
        trim:true
    }
}, {
    timestamps: true,
});

const Mock = mongoose.model('Mock', MockSchema);
export default Mock;
