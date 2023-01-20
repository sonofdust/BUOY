import {createStore, action, thunk, computed} from "easy-peasy";
import api from "./api/posts";

export default createStore({
  posts: [],
  setPosts: action((state, payload) => (state.posts = payload)),
});
