const express = require("express")
const router = express.Router();

const Post = require("../schemas/post.js");

//게시글 목록 조회 API
router.get("/posts", (req, res) => {
    res.json({ posts: posts });
});

//게시글 상세 조회 API
router.get("/posts/:postsId", (req, res) => {
    const { postsId } = req.params;

    const [detail] = posts.filter((posts) => posts.postsId === Number(postsId));
    res.json({ detail })
});

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

module.exports = router;

router.post("/posts/", async (req, res) => {
    const { postsId, category, story } = req.body;

    const posts = await Posts.find({ postsId });
    if (posts.length) {
        return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다." });
    }
    const createdPosts = await Posts.create({ postsId, category, story });

    res.json({ posts: createdPosts });
});

// 게시글 수정
router.put("/posts/:postsId", async (req, res) => {
    const { postsId } = req.params;
    const { category } = req.body;
    const { story } = req.body;
  
    const existsPosts = await Posts.find({ postsId: Number(postsId) });
    if (existsPosts.length) {
      await Posts.updateOne({ postsId: Number(postsId) }, { $set: { category, story } });
    }
  
    res.json({ success: true });
  })

// 게시글 삭제 
router.delete("/posts/:postsId", async (req, res) => {
    const { postsId } = req.params;
  
    const existsPosts = await Posts.find({ postsId });
    if (existsPosts.length > 0) {
      await Posts.deleteOne({ postsId });
    }
  
    res.json({ result: "success" });
  });