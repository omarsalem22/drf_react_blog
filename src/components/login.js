import { useState } from "react";
import axiosInstance from "./axios"; // Import the axios instance (configured with interceptors)
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate(); // Hook for navigation
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState(""); // Message for success or errors

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Dynamically update form data
    });
  };

  // Handle form submission
 const handleSubmit = async (e) => {
  e.preventDefault();

  // Validation
  if (!formData.email || !formData.password) {
    setMessage("Both fields are required.");
    return;
  }

  try {
    // Send POST request to login API
    const response = await axiosInstance.post("token/", {
      email: formData.email,
      password: formData.password,
    });

    // Check if the response contains the access token
    if (response.data && response.data.access_token) {
      // Store the JWT token in localStorage
      localStorage.setItem("access_token", response.data.access_token);
      sessionStorage.setItem("access_token", response.data.access_token);

      // Success message and redirect
      setMessage("Login successful!");
      navigate("/");  // Redirect to the homepage or another protected route
    } else {
      setMessage("Login failed. Please try again.");
    }
  } catch (error) {
    console.error("Login failed:", error);

    // Log the error response to see the full error data
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error status:", error.response.status);
      setMessage(error.response.data.detail || "Login failed. Please try again.");
    } else if (error.request) {
      console.error("Error request:", error.request);
      setMessage("No response received from the server. Please check your connection.");
    } else {
      console.error("Error message:", error.message);
      setMessage("An unexpected error occurred. Please try again later.");
    }
  }
};


  return (
    <div>
      <h2>Login</h2>
      {message && <p>{message}</p>} {/* Display success/error message */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
