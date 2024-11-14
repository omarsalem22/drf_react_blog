import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate in React Router v6
import  axiosInstance  from "./axios"; // Import axios instance
import './register.css'; // Import CSS for styling

const Register = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  // State to hold success or error message
  const [message, setMessage] = useState("");
  
  // State to manage loading state (while the form is being submitted)
  const [loading, setLoading] = useState(false);

  // Use React Router's useNavigate to navigate (redirect after registration)
  const navigate = useNavigate(); // Replaces useHistory in React Router v6

  // Handle input field changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:e.target.value.trim(), // Trim input to remove any leading/trailing spaces
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic validation to check if all fields are filled
    if (!formData.username || !formData.email || !formData.password) {
      setMessage("All fields are required.");
      return;
    }
  
    // Log the data before sending it
    console.log("Form data:",{ email:formData.email,
                              user_name:formData.username,
                              password:formData.password}


    );
  
    try {
      const response = await axiosInstance.post("users/register/", { email:formData.email,
        user_name:formData.username,
        password:formData.password}
);
      setMessage("Registration successful!");
      navigate('/login')
      console.log("User registered:", response.data);
      // Optionally, redirect or perform another action here (e.g., navigate to login page)
    } catch (error) {
      // Log the error response for debugging
      console.error("Registration failed:", error);
  
      // Check if there is an error response
      if (error.response) {
        console.error("Error response data:", error.response.data);
        // Show specific error message from the backend
        setMessage(error.response.data.detail || "Registration failed. Please try again.");
      } else if (error.request) {
        console.error("Error request:", error.request);
        setMessage("No response received from the server. Please check your connection.");
      } else {
        console.error("Error message:", error.message);
        setMessage("An error occurred. Please try again later.");
      }
    }
  };
  
  return (
    <div className="register-container">
      <h2>Register</h2>

      {/* Show success or error message */}
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Show loading spinner */}
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
