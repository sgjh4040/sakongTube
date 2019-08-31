import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    //작성자
    creator : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    //영상파일 경로
    fileUrl: {
        type:String,
        required:'파일 URL이 필요합니다.'
    },
    //영상 제목
    title:{
        type:String,
        required:'title 이 필요합니다.'
    },
    //영상 설명
    description:String,
    views:{
        type:Number,
        default: 0
    },
    //등록일
    createdAt:{
        type:Date,
        default:Date.now
    },
    //댓글
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }]
});

const model = mongoose.model("Video",VideoSchema);

export default model;