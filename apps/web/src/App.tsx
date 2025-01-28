import { useState, useEffect } from "react";
import "./App.css";

interface Comment {
  id: number;
  content: string;
  author: string;
  createdAt: string;
}

function App() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({ content: "", author: "" });

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const response = await fetch("http://localhost:3000/comments");
    const data = await response.json();
    setComments(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:3000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    });
    setNewComment({ content: "", author: "" });
    fetchComments();
  };

  return (
    <div className="container mx-auto p-4">
      <h1>Comments</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Your name"
          value={newComment.author}
          onChange={(e) =>
            setNewComment({ ...newComment, author: e.target.value })
          }
        />
        <textarea
          placeholder="Your comment"
          value={newComment.content}
          onChange={(e) =>
            setNewComment({ ...newComment, content: e.target.value })
          }
        />
        <button type="submit">Submit</button>
      </form>

      <div className="comments">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <h3>{comment.author}</h3>
            <p>{comment.content}</p>
            <small>{new Date(comment.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
