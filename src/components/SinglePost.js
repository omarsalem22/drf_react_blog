import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SinglePost = () => {
  const { slug } = useParams(); // Destructure slug from useParams
  const [post, setPost] = useState(null); // Initialize as null
  const [error, setError] = useState(null); // Error state
  const [loading, setLoading] = useState(true); // Loading state

  const getPost = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`http://127.0.0.1:8000/api/${slug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Response was not OK");
      }

      const data = await response.json(); // Await the JSON parsing
      setPost(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPost();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h1 className="text-center mb-4">Post</h1>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-7 mb-4">
            <div
              className="card"
              style={{ width: "100%", height: "auto", padding: "1rem" }}
            >
              <div className="card-body" style={{ height: "100%" }}>
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePost;
