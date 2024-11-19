import { useEffect, useState } from "react";
import Posts from "./Posts";
import axiosInstance from "./axios";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Search = () => {
  const location = useLocation(); // Get the current location object
  const [appState, setAppState] = useState({
    search: "",
    posts: [],
    loading: true,
    error: null,
  });

  const getPosts = () => {
    // Extract query params from the URL
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("search") || ""; // Default to empty string if not found

    setAppState((prevState) => ({ ...prevState, loading: true })); // Start loading
    const token = localStorage.getItem("access_token"); 
    console.log(token);
    
    axios.get(`http://127.0.0.1:8000/api/search/?search=${searchQuery}`,{
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      })
      .then((res) => {
        const allPosts = res.data;
        setAppState({
          search: searchQuery,
          posts: allPosts,
          loading: false,
          error: null,
        });
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setAppState({
          search: searchQuery,
          posts: [],
          loading: false,
          error: "An error occurred while fetching posts.",
        });
      });
  };

  useEffect(() => {
    getPosts();
  }, [location.search]); // Re-run when query changes

  // Loading and error state handling
  if (appState.loading) {
    return <p>Loading...</p>;
  }

  if (appState.error) {
    return <p>Error: {appState.error}</p>;
  }

  // Show "No results found" if no posts are found
  if (appState.posts.length === 0) {
    return <p>No results found for: {appState.search}</p>;
  }

  return (
    <div>
      <h1>Search Results for: {appState.search}</h1>
      <div className="container">
        <div className="row justify-content-center">
          {appState.posts.map((post, index) => (
            <div className="col-7 mb-4" key={index}> {/* Full width for each card */}
              <div className="card" style={{ width: '100%', height: 'auto', padding: '1rem' }}>
                <div className="card-body" style={{ height: '100%' }}>
                <Link to={`/post/${post.slug}`} className="card-title">{post.title}</Link>

                  <p className="card-text">{post.content}</p>
                
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
   
    </div>
  );
};

export default Search;
