import React from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import Missing from "./Missing";
import {useStoreState, useStoreActions} from "easy-peasy";

const PostPage = () => {
  const {id} = useParams();
  const {deletePosts} = useStoreActions((actions) => actions.deletePosts);
  const getPostById = useStoreState((state) => state.getPostById);
  const post = getPostById(id);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    deletePosts(id);
    navigate("/");
  };

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
            <button className="deleteButton" onClick={() => handleDelete}>
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
