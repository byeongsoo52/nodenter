const express = require("express")

const router = express.Router();

const Posts = [
    {
        postsId: 4,
        category: "daily",
        story: "good",
    },
    {
        postsId: 3,
        category: "study",
        story: "nice",
    },
    {
        postsId: 2,
        category: "hobby",
        story: "interesting",
    },
    {
        postsId: 1,
        category: "daily",
        story: "happy"
    },
];

//포스트 목록 조회 API
router.get("/posts", (req, res) => {
    res.json({ posts: posts });
});

//포스트 상세 조회 API
router.get("/posts/:postsId", (req, res) => {
    const { postsId } = req.params;

    const [detail] = posts.filter((posts) => posts.postsId === Number(postsId));
    res.json({ detail })
});

module.exports = router;

// Router를 만든다
// Router.METHOD(PATH, HANDLER)

const Posts = require("../schemas/posts.js");
router.post("/posts/", async (req, res) => {
    // post 메소드로 요청했을때 body에 데이터가 있었다면 있는 데이터를 객체구조분해할당을 통해 가져와라
    const { postsId, category, story } = req.body;

    const posts = await Posts.find({ postsId });
    // comments 라는 변수에 데이터가 존재한다면,
    // length 즉 array의 길이가 0보다 컸을때 통과
    if (posts.length) {
        return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다." });
    }
    // comments 데이터가 똑같이 존재하지 않는다면 데이터 생성
    const createdPosts = await Posts.create({ postsId, category, story });

    res.json({ posts: createdPosts });
});

// const Posts = [
//     {
//       postsId: 4,
//       category: "daily",
//       story: "good",
//     },
//     {
//       postsId: 3,
//       category: "study",
//       story: "nice",
//     },
//     {
//       postsId: 2,
//       category: "hobby",
//       story: "interesting",
//     },
//     {
//       postsId: 1,
//       category: "daily",
//       story: "happy"
//     },
//   ];