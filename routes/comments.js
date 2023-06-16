// Router를 만든다
// Router.METHOD(PATH, HANDLER)

// 스키마를 선언한 comments 스키마를 가지고와서 Comments 변수에 할당

const Comments = require("../schemas/comments");

// 상품 목록 조회 API
// router.get("/comments", (req, res) => {
//   res.json({ comments: comments })
// })

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
