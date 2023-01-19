import {createContext, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {format} from "date-fns";
import api from "../api/posts";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});

export const DataProvider = ({children}) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  const navigate = useNavigate();
  const {data, fetchError, isLoading} = useAxiosFetch(
    "http://localhost:3500/posts"
  );

  useEffect(() => {
    setPosts(data);
  }, [data]);

  useEffect(() => {
    const filtered = posts.filter(
      (e) =>
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.body.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filtered.reverse());
  }, [posts, search]);

  const handleDelete = async (id) => {
    setPosts([...posts.filter((e) => e.id !== id)]);
    api.delete(`/posts/${id}`);
    navigate("/");
    try {
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

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
    <DataContext.Provider
      value={{
        search,
        setSearch,
        searchResults,
        fetchError,
        isLoading,
        handleSubmit,
        handleDelete,
        setPostTitle,
        postTitle,
        setPostBody,
        postBody,
        posts,
        handleEdit,
        setEditTitle,
        editTitle,
        setEditBody,
        editBody,
        format,
        api,
        setPosts,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
