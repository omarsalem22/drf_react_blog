import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SinglePost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPost = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`http://127.0.0.1:8000/api/posts/?slug=${slug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch the post.");
      }

      const data = await response.json();
      if (data.length > 0) {
        setPost(data[0]);
      } else {
        setError("Post not found.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPost();
  }, [slug]);

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading post...</p>
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-5 text-danger">
        <p>Error: {error}</p>
      </div>
    );

  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="card shadow-lg border-0 rounded">
              {/* Image Section */}
              {post.image && (
                <div
                  className="card-img-top rounded-top"
                  style={{
                    backgroundImage: `url(${post.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "450px",
                  }}
                ></div>
              )}
              <div className="card-body p-4">
                {/* Title Section */}
                <h1 className="card-title text-center fw-bold mb-4">{post.title}</h1>
                <p className="text-muted text-center mb-4">{post.excerpt}</p>

                <hr className="my-4" />

                {/* Content Section */}
                <div className="card-text" style={{ lineHeight: "1.8", fontSize: "1.1rem" }}>
                  {post.content}
                </div>

                <hr className="my-4" />

                {/* Metadata */}
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted">Published: {new Date(post.published).toLocaleDateString()}</span>
                  <span className="badge bg-primary text-uppercase">Category: {post.category || "General"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePost;
