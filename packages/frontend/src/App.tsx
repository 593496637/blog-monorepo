import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatDate } from "@blog/shared-utils";
import "./App.css";

interface Post {
  id: number;
  title: string;
  content: string;
  date: string;
  comments: { text: string; date: string }[];
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comment, setComment] = useState("");

  // 从环境变量读取 API 地址，默认 http://localhost:5000
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    axios.get(`${API_URL}/api/posts`).then((res) => setPosts(res.data));
  }, [API_URL]);

  const addComment = (postId: number) => {
    if (!comment) return;
    axios
      .post(`${API_URL}/api/posts/${postId}/comments`, { text: comment })
      .then((res) => {
        setPosts(posts.map((p) => (p.id === postId ? res.data : p)));
        setComment("");
      });
  };
  console.log(2222);

  return (
    <div className="App">
      <h1>我的博客</h1>
      {posts.map((post) => (
        <div key={post.id} className="post">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>发布于: {formatDate(new Date(post.date))}</p>
          <h3>评论</h3>
          <ul>
            {post.comments.map((c, i) => (
              <li key={i}>
                {c.text} - {c.date}
              </li>
            ))}
          </ul>
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="写下你的评论"
          />
          <button onClick={() => addComment(post.id)}>提交评论</button>
        </div>
      ))}
    </div>
  );
}

export default App;
