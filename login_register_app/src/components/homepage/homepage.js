import React from "react";
import { useNavigate } from "react-router-dom";
import "./homepage.css";

const Homepage = () => {
  const navigate = useNavigate();

  const logout = () => {
    navigate("/login");
  };

  return (
    <div className="homepage">
      <h1>Welcome to the Homepage</h1>
      <div className="button" onClick={logout}>Logout</div>
    </div>
  );
};

export default Homepage;
