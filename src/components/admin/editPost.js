import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://127.0.0.1:8000/api/admin";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", excerpt: "", content: "" });
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
        "Content-Type": "application/json",

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
    const { name, value } = e.target;
  
    setFormData((prevFormData) => {
      const updatedFormData = { 
        ...prevFormData, 
        [name]: value 
      };
  
      // Update slug if the title changes
      if (name === "title") {
        updatedFormData.slug = value.trim().toLowerCase().replace(/\s+/g, "-");
      }
  
      console.log(updatedFormData); // Log the updated form data here
      return updatedFormData;
    });
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
   
      
  
      await axios.put(`${API_BASE_URL}/edit/${id}/`, formData, {
        headers: { Authorization: `Bearer ${token}` },
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
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  );
};

export default EditPost;
