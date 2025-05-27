    import mongoose from "mongoose";

    const videoSchema = new mongoose.Schema({
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        }, 
        title:{
            type:String,
            required:true,
        },
        description:{
            type:String,
        },
        videoLink:{
            type:String,
            required:true,
        },
        thumbnail:{
            type:String,
            required:true,
        },
        videoType:{
            type:String,
            default:"All"
        },
        like:{
            type:Number,
            default:0
        },
        dislike:{
            type:Number,
            default:0
        }
        
    }, { timestamps: true })

    export default mongoose.model("video", videoSchema);
