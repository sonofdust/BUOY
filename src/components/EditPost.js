import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import Missing from "./Missing";
import format from "date-fns/format";
import {useNavigate} from "react-router-dom";
import {useStoreState, useStoreActions} from "easy-peasy";

const EditPost = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const setEditBody = useStoreActions((actions) => actions.setEditBody);
  const editBody = useStoreState((state) => state.editBody);

  const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
  const editTitle = useStoreState((state) => state.editTitle);

  const editPost = useStoreActions((actions) => actions.editPost);

  const getPostById = useStoreState((state) => state.getPostById);
  const post = getPostById(id);

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
      editPost(updatedPost);
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
            <button type="button" onClick={() => handleEdit(post.id)}>
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
