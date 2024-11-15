import React from 'react';
import useLogOut from './logout'; // Import the custom hook

const LogoutButton = () => {
  useLogOut(); // Call the custom hook when the component renders

  return (
    <button>Logging out...</button> // Button text can be customized
  );
};

export default LogoutButton;