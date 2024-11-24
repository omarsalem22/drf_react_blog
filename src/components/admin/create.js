import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
  });
  const [formImage, setFormImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files.length > 0) {
      setFormImage(files[0]); 
    } else {
      setFormData({
        ...formData,
        [name]: value.trim(),
      });
    }
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    const token = localStorage.getItem("access_token");

    const formDataToSend = new FormData();
    const config= {
      headers: {
        "Content-Type": "multipart/form-data", 
        Authorization: `Bearer ${token}`,
      },
    }
    

    const URL="http://127.0.0.1:8000/api/admin/create/"
    
    formDataToSend.append("title", formData.title);
    formDataToSend.append("author", 1); 
    formDataToSend.append("excerpt", formData.excerpt);
    formDataToSend.append("content", formData.content);
    formDataToSend.append("published", new Date().toISOString());
    formDataToSend.append("image", formImage); 
  

    try {
      await axios.post(URL, formDataToSend, config);

      navigate("/admin"); 
    } catch (error) {
      console.error("Error response:", error.response?.data || error.message);
      alert("Failed to create post. Please check the form.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="excerpt" className="form-label">
            Excerpt
          </label>
          <input
            type="text"
            className="form-control"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            className="form-control"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="6"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Upload Image
          </label>
          <input
            type="file"
            className="form-control"
            name="image"
            onChange={handleChange}
            accept="image/*"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default CreatePost;
