import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://127.0.0.1:8000/api/admin";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", excerpt: "", content: "" });
  const [formImage, setFormImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPost();
  }, [id]);

  const getPost = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.warn("No access token found");
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/detail/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching post:", error.response?.data || error.message);
      alert("Failed to fetch post details.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setFormImage(files[0]);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value.trim(),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      alert("Title and Content are required.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.warn("No access token found");
        return;
      }

      const updatedData = new FormData();
      updatedData.append("title", formData.title);
      updatedData.append("excerpt", formData.excerpt);
      updatedData.append("content", formData.content);
      updatedData.append("author", 1); 

      if (formImage) {
        updatedData.append("image", formImage);
      }

      await axios.put(`${API_BASE_URL}/edit/${id}/`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Post updated successfully!");
      navigate("/admin");
    } catch (error) {
      console.error("Error updating post:", error.response?.data || error.message);
      alert("Failed to update post.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Edit Post {id}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="excerpt" className="form-label">Excerpt</label>
          <input type="text" className="form-control" name="excerpt" value={formData.excerpt} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea className="form-control" name="content" value={formData.content} onChange={handleChange} rows="6" />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Upload Image</label>
          <input
            type="file"
            className="form-control"
            name="image"
            onChange={handleChange}
            accept="image/*"
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </>
  );
};

export default EditPost;
