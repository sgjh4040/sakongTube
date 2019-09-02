import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";


const UserSchema = new mongoose.Schema({
    //유저 이름
    name: String,
    //이메일
    email: String,
    //프로필 사진
    avatarUrl: String,
    //페이스북 아이디
    facebookId: Number,
    //깃허브 아이디
    githubId: Number,
    //카카오 아이디
    kakaoId: Number,
    //내가 단 댓글
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    //내가 등록한 비디오
    videos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    //내가 등록한 게시판글
    boards: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Board"
        }
    ]
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" })

const model = mongoose.model("User", UserSchema);

export default model;