import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    text:{
        type:String,
        required:"텍스트가 필요합니다."
    },
    createdAt:{
        type:String,
        default:Date.now
    }
});

const model = mongoose.model("Comment",CommentSchema);

export default model;