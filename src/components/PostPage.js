import React from "react";
import {useParams, Link} from "react-router-dom";
import Missing from "./Missing";
import {useContext} from "react";
import DataContext from "../context/dataContext";

const PostPage = () => {
  const {posts, handleDelete} = useContext(DataContext);

  const {id} = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  return (
    <main className="PostPage">
      <article className="post">
        {post && (
          <>
            <h1>{post.title}</h1>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`/edit/${post.id}`}>
              <button className="editButton">Edit Post</button>
            </Link>
            <button
              className="deleteButton"
              onClick={() => handleDelete(post.id)}
            >
              Delete Post
            </button>
          </>
        )}{" "}
        {!post && <Missing />}
      </article>
    </main>
  );
};

export default PostPage;
