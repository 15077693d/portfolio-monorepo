import { useState, useEffect } from "react";
import "./App.css";
import { usePostsQuery } from "./features/comment/query";

interface Comment {
  id: number;
  content: string;
  author: string;
  createdAt: string;
}

function App() {
  const { data: posts } = usePostsQuery();

  return (
    <div className="container mx-auto p-4">
      <h1>Comments</h1>
      {JSON.stringify(posts)}
      <form className="mb-4">
        <input type="text" placeholder="Your name" />
        <textarea placeholder="Your comment" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
