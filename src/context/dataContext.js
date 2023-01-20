import {createContext, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import useAxiosFetch from "../hooks/useAxiosFetch";
const DataContext = createContext({});

export const DataProvider = ({children}) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [posts, setPosts] = useState([]);

  const {data, fetchError, isLoading} = useAxiosFetch(
    "http://localhost:3500/posts"
  );
  const navigate = useNavigate();

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

  return (
    <DataContext.Provider
      value={{
        search,
        setSearch,
        searchResults,
        fetchError,
        isLoading,
        setPosts,
        posts,
        navigate,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
