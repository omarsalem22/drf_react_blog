import { useEffect, useState } from "react";
// import './css/posts.css'

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPosts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/");
      if (!response.ok) {
        throw new Error("resposnse was not Ok");
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
  },[]);

  if (loading) return( <p>Loading</p>)

    if(errors) return(<p>Error.. {errors}</p>)
    
      return (
        <>
        
        <h1 className="text-center mb-4">Posts</h1> {/* Centered title with margin */}
      <div className="container">
        <div className="row justify-content-center">
          {posts.map((post, index) => (
            <div className="col-7 mb-4" key={index}> {/* Full width for each card */}
              <div className="card" style={{ width: '100%', height: 'auto', padding: '1rem' }}>
                <div className="card-body" style={{ height: '100%' }}>
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.content}</p>
                
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