import mongoose from "mongoose";

//코멘트 스키마
const BoardSchema = new mongoose.Schema({
    // 글 제목
    title: { type: String, trim: true, 'default': '' },	
    // 글 내용	
    content: { type: String, trim: true, 'default': '' },	
    // 글쓴 사람					
    writer: { type: mongoose.Schema.ObjectId, ref: 'User' },							
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }],
    tags: { type: [], 'default': '' },
    hits: { type: Number, 'default': 0 },   // 조회수
    createdAt: { type: Date,  'default': Date.now },
    updatedAt: { type: Date,  'default': Date.now }
});

const model = mongoose.model("Board",BoardSchema);

export default model;