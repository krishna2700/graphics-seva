import React, { useState } from "react";
import { Input, Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { role } = await login(email, password);
      navigate(`/${role.toLowerCase()}/home`);
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
      {error && <p>{error}</p>}
      <Button onClick={handleLogin}>Login</Button>
    </VStack>
  );
};

export default LoginForm;
