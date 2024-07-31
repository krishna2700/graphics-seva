import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, VStack, Text } from "@chakra-ui/react";
import { login } from "../api/auth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Updated

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      // Save user info and token to localStorage or context
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.userRole);
      navigate("/dashboard"); // Updated
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <Text color="red.500">{error}</Text>}{" "}
      {/* Changed <p> to <Text> */}
      <Button onClick={handleLogin}>Login</Button>
    </VStack>
  );
};

export default LoginForm;
