import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false
});

const db = mongoose.connection;

//몽고디비 연결 성공시 확인
db.once('open', () => {
  console.log('몽고디비 연결 성공');
});
//에러발생시 콘솔로 에러 확인하도록 listener 등록
db.on('error', (error) => {
  console.error('몽고디비 연결 에러', error);
});
db.on('disconnected', () => {
  console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
  connect();
});



