import app from "./app"
import "./db";  //mongodb 연결
import dotenv from "dotenv";
dotenv.config();
import "./models/Video";
import "./models/Comment";
import "./models/User";

const PORT = process.env.PORT || 4000;

const handlelistening = () =>console.log(`http://localhost:${PORT}`)

app.listen(PORT,handlelistening)