import React, { useState } from "react";
import {
  Button,
  Input,
  VStack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { loginUser } from "../api/api";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken, setRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      const { token, role } = response.data;
      setToken(token);
      setRole(role);
      navigate("/home"); // Redirect to a default page
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <VStack spacing={4}>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button onClick={handleSubmit} colorScheme="blue">
        Login
      </Button>
    </VStack>
  );
};

export default Login;
