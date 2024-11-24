import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  const getPosts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setErrors("No Token found");
        return;
      }
      const response = await axios.get("http://127.0.0.1:8000/api/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(response.data);
    } catch (error) {
      setErrors(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);
  if (loading) return <p>Loading</p>;

  if (errors) return <p>Error.. {errors}</p>;

  if (!posts.length) return <> <h1>No posts yet </h1>
      <Link
          to={"/admin/create"}
          className="btn btn-success btn-lg"
          // onClick={() => handleAddPost()}
        >
          Add Post
        </Link>
  
  </>;
  
  return (
    <div className="container my-4">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Category</th>
            <th scope="col">Title</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <th scope="row">{post.id}</th>
              <td>{post.category}</td>
              <td>{post.title}</td>
              <td>
                <Link
                  className="btn btn-danger btn-sm"
                  style={{ marginRight: "10px" }}
                  to={`/admin/delete/${post.id}`}

                  // onClick={() => deletePost(post.id)}
                >
                  Delete
                </Link>
                <Link
                  className="btn btn-primary btn-sm"
                  to={`/admin/edit/${post.id}`}

                  // onClick={() => updatePost(post.id)}
                >
                  Update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-end mt0  ">
        <Link
          to={"/admin/create"}
          className="btn btn-success btn-lg"
          // onClick={() => handleAddPost()}
        >
          Add Post
        </Link>
      </div>
    </div>
  );
};

export default AdminPosts;
