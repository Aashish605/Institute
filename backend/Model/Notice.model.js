import mongoose from 'mongoose'

const NoticeSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true,
        trim: true,
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

const Notice = mongoose.model('Notice', NoticeSchema);
export default Notice;