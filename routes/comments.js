// Router.METHOD(PATH, HANDLER)

// 스키마를 선언한 comments 스키마를 가지고와서 Comments 변수에 할당

const express = require("express")
const router = express.Router();

//댓글 목록 조회 API
router.get("/comments", (req, res) => {
  res.json({ comments: comments });
});

//댓글 상세 조회 API
router.get("/comments/:commentsId", (req, res) => {
  const { commentsId } = req.params;

  const [detail] = comments.filter((comments) => comments.commentsId === Number(commentsId));
  res.json({ detail })
});

const Comments = require("../schemas/comments.js");
router.post("/comments", async (req, res) => {
    // post 메소드로 요청했을때 body에 데이터가 있었다면 있는 데이터를 객체구조분해할당을 통해 가져와라
	const { commentsId, name, content } = req.body;

  const comments = await Comments.find({ commentsId });
  // comments 라는 변수에 데이터가 존재한다면,
  // length 즉 array의 길이가 0보다 컸을때 통과
  if (comments.length) {
    return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다." });
  }
  // comments 데이터가 똑같이 존재하지 않는다면 데이터 생성
  const createdComments = await Comments.create({ commentsId, name, content });

  res.json({ comments: createdComments });
});

module.exports = router;

// 댓글 수정
router.put("/comments/:commentsId", async (req, res) => {
  const { commentsId } = req.params;
  const { name } = req.body;
  const { content } = req.body;

  const existsComments = await Comments.find({ commentsId: Number(commentsId) });
  if (existsComments.length) {
    await Comments.updateOne({ commentsId: Number(commentsId) }, { $set: { name, content } });
  }

  res.json({ success: true });
})

// 댓글 삭제
router.delete("/comments/:commentsId", async (req, res) => {
  const { commentsId } = req.params;

  const existsComments = await Comments.find({ commentsId });
  if (existsComments.length > 0) {
    await Comments.deleteOne({ commentsId });
  }

  res.json({ result: "success" });
});