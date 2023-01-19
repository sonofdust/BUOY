import React from "react";
import {useContext, useState} from "react";
import DataContext from "../context/dataContext";
import api from "../api/posts";
import format from "date-fns/format";

const NewPost = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const {posts, setPosts, navigate} = useContext(DataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? Math.max(...posts.map((item) => item.id)) + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = {
      id,
      title: postTitle,
      datetime,
      body: postBody,
    };
    try {
      const result = await api.post("/posts", newPost);
      setPosts([...posts, result.data]);
      setPostBody("");
      setPostTitle("");
      navigate("/");
    } catch (e) {
      // Not in 200 response range.
      console.log("Error: ", e.message);
    }
  };

  return (
    <main className="NewPost">
      <h1>New Post</h1>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input
          id="postTitle"
          type="text"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody">Post:</label>
        <textarea
          id="postBody"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
