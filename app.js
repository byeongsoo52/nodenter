// express 를 가져와서 서버를 실행 

const express = require('express')
const app = express();
const port = 3000;

const postRouter = require("./routes/post");
const commentsRouter = require("./routes/comments.js");
// connect라는 변수에 require로 schemas 모듈을 가지고온다
const connect = require("./schemas/index");
connect(); 

app.use(express.json());
// app.use("/api", [commentsRouter])
app.use("/", [postRouter, commentsRouter])

app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!')
})