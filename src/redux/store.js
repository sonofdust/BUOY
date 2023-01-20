import {createStore, action, thunk, computed} from "easy-peasy";
import api from "../api/posts";

export default createStore({
  posts: [],
  setPosts: action((state, payload) => (state.posts = payload)),

  postTitle: "",
  setPostTitle: action((state, payload) => (state.postTitle = payload)),

  postBody: "",
  setPostBody: action((state, payload) => (state.postBody = payload)),

  editTitle: "",
  setEditTitle: action((state, payload) => (state.editTitle = payload)),

  editBody: "",
  setEditBody: action((state, payload) => (state.editBody = payload)),

  search: "",
  setSearcj: action((state, payload) => (state.search = payload)),

  searchResults: [],
  setSearchResults: action((state, payload) => (state.searchResults = payload)),

  postCount: computed((state) => state.posts.lenght),
  getPostById: computed((state) => {
    return (id) => state.posts.find((post) => post.id.toString() === id);
  }),

  savePost: thunk(async (actions, newPost, helpers) => {
    const {posts} = helpers.getState();
    try {
      const result = await api.post("/posts", newPost);
      actions.setPosts([...posts, result.data]);
      actions.setPostBody("");
      actions.setPostTitle("");
    } catch (e) {
      // Not in 200 response range.
      console.log("Error: ", e.message);
    }
  }),

  deletePost: thunk(async (actions, id, helpers) => {
    const {posts} = helpers.getState();

    try {
      actions.setPosts([...posts.filter((e) => e.id !== id)]);
      api.delete(`/posts/${id}`);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }),

  editPost: thunk(async (actions, updatedPost, helpers) => {
    const {posts} = helpers.getState();

    try {
      const {id, title: editTitle, datetime, body: editBody} = updatedPost;
      const response = await api.put(`/posts/${id}`, updatedPost);
      actions.setPosts(
        posts.map((e) => (e.id === id ? {...response.data} : e))
      );
      actions.setEditTitle("");
      actions.setEditBody("");
    } catch (error) {
      console.log(error.message);
    }
  }),
});
