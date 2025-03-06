require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("PORT:", process.env.PORT);

const express = require("express");
const cors = require("cors");
const { formatDate } = require("@blog/shared-utils");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

let posts = [
  {
    id: 1,
    title: "第一篇博客",
    content: "这是我的第一篇博客！",
    date: formatDate(new Date()),
    comments: [],
  },
];

app.get("/api/posts", (req, res) => {
  res.json(posts);
});

app.post("/api/posts/:id/comments", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((p) => p.id === postId);
  if (post) {
    const comment = { text: req.body.text, date: formatDate(new Date()) };
    post.comments.push(comment);
    res.json(post);
  } else {
    res.status(404).json({ error: "文章不存在" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Backend running on port ${PORT} in ${
      process.env.NODE_ENV || "development"
    } mode`
  );
});
