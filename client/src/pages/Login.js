import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Input, Button, VStack } from "@chakra-ui/react";
import { login } from "../api/auth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      // Save user info and token to localStorage or context
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.userRole);
      history.push("/dashboard");
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
