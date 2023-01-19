import {createContext, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import useAxiosFetch from "../hooks/useAxiosFetch";
import api from "../api/posts";
import format from "date-fns/format";

const DataContext = createContext({});

export const DataProvider = ({children}) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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

  return (
    <DataContext.Provider
      value={{
        search,
        setSearch,
        searchResults,
        fetchError,
        isLoading,
        handleDelete,
        posts,
        navigate,
        setPosts,
        format,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
