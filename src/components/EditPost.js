import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Missing from "./Missing";
import {useContext} from "react";
import DataContext from "../context/dataContext";
import api from "../api/posts";
import format from "date-fns/format";

const EditPost = () => {
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  const {posts, setPosts, navigate} = useContext(DataContext);

  const {id} = useParams();
  const post = posts.find((e) => e.id == id);
  useEffect(() => {
    if (!!post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  const handleEdit = async (id) => {
    try {
      const datetime = format(new Date(), "MMMM dd, yyyy pp");
      const updatedPost = {
        id,
        title: editTitle,
        datetime,
        body: editBody,
      };
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(posts.map((e) => (e.id === id ? {...response.data} : e)));
      setEditTitle("");
      setEditBody("");
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <main className="NewPost">
      {editTitle && (
        <>
          <h1>Edit Post</h1>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle">Title:</label>
            <input
              id="postTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="postBody">Post:</label>
            <textarea
              id="postBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button type="submit" onClick={() => handleEdit(post.id)}>
              Submit
            </button>
          </form>
        </>
      )}
      {!editTitle && <Missing />}
    </main>
  );
};

export default EditPost;
