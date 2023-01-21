import React from "react";
import {useParams, Link} from "react-router-dom";
import Missing from "./Missing";
import {useStoreState, useStoreActions} from "easy-peasy";
import {useNavigate} from "react-router-dom";
const PostPage = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const deletePost = useStoreActions((actions) => actions.deletePost);
  const getPostById = useStoreState((state) => state.getPostById);

  // const setPosts = useStoreActions((actions) => actions.setPosts);
  // const posts = useStoreState((state) => state.posts);

  const post = getPostById(id);

  const handleDelete = async (e) => {
    //    console.log(id);
    e.preventDefault();
    deletePost(id);
    // setPosts(posts);
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
            <button
              type="button"
              className="deleteButton"
              onClick={handleDelete}
            >
              Delete Post
            </button>
          </>
        )}
        {!post && <Missing />}
      </article>
    </main>
  );
};

export default PostPage;
