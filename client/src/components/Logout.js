import React from "react";
import { Button } from "@chakra-ui/react";
import { logoutUser } from "../api/api";
import { useNavigate } from "react-router-dom";

const Logout = ({ token, setToken }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser(token);
      setToken(null); // Clear token
      navigate("/login"); // Redirect to login
    } catch (error) {
      alert("Logout failed");
    }
  };

  return (
    <Button onClick={handleLogout} colorScheme="red">
      Logout
    </Button>
  );
};

export default Logout;
