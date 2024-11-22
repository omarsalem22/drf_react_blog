import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const DeletePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const handleDelete = async (e) => {
    e.preventDefault();

    // Confirm before deletion
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/admin/delete/${id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/admin"); 
    } catch (error) {
      console.error("Error deleting post:", error.response?.data || error.message);
      alert("Failed to delete the post. Please try again.");
    }
  };

  return (
    <button onClick={handleDelete} type="button" className="btn btn-danger">
      Delete
    </button>
  );
};

export default DeletePost;
