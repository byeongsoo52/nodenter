// express 를 가져와서 서버를 실행 

const express = require('express')
const app = express();
const port = 3000;

// const commentsRouter = require("./routes/comments");
// // connect라는 변수에 require로 schemas 모듈을 가지고온다
// const connect = require("./schemas/");
// connect(); 

const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const connect = require("./schemas/");
connect(); 


app.use(express.json());
// app.use("/api", [commentsRouter])
app.use("/api", [postsRouter, commentsRouter])

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!')
})