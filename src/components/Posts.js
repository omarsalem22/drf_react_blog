import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPosts = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("http://127.0.0.1:8000/api/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch posts.");
      }

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      setErrors(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading posts...</p>
      </div>
    );

  if (errors)
    return (
      <div className="text-center mt-5 text-danger">
        <p>Error: {errors}</p>
      </div>
    );

  return (
    <>
      <h1 className="text-center my-4">Posts</h1>
      <div className="container">
        <div className="row g-4">
          {posts.map((post, index) => (
            <div className="col-md-6 col-lg-4" key={index}>
              <div className="card shadow-sm h-100">
                <div
                  className="card-img-top"
                  style={{
                    backgroundImage: `url(${post.image || "https://via.placeholder.com/600x300"})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "200px",
                    borderRadius: "0.25rem 0.25rem 0 0",
                  }}
                ></div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">
                    <Link to={`post/${post.slug}`} className="text-decoration-none">
                      {post.title}
                    </Link>
                  </h5>
                  <p className="card-text text-truncate">{post.content}</p>
                  <div className="mt-auto">
                    <Link to={`post/${post.slug}`} className="btn btn-primary btn-sm">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Posts;
