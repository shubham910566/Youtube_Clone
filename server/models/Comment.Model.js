import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'video',
        required:true
    },
    message: {
        type: String,
        required:true
    }
    
}, { timestamps: true })

export default mongoose.model('comment', commentsSchema)
