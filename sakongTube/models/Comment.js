import mongoose from "mongoose";

//코멘트 스키마
const CommentSchema = new mongoose.Schema({
    //작성자
    creator : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    //댓글 내용
    text:{
        type:String,
        required:"텍스트가 필요합니다."
    },
    //생성날짜
    createdAt:{
        type:String,
        default:Date.now
    }
});

const model = mongoose.model("Comment",CommentSchema);

export default model;