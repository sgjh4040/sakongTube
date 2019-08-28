import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    fileUrl: {
        type:String,
        required:'파일 URL이 필요합니다.'
    },
    title:{
        type:String,
        required:'title 이 필요합니다.'
    },
    description:String,
    views:{
        type:Number,
        default: 0
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }]
});

const model = mongoose.model("Video",VideoSchema);

export default model;