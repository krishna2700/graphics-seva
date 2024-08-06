import React, { useState } from "react";
import {
  Input,
  Button,
  VStack,
  Grid,
  GridItem,
  Image,
  Box,
  Text,
} from "@chakra-ui/react";
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
      navigate(`/${role.toLowerCase()}/home`, { replace: true });
      window.location.reload();
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <Grid templateColumns="repeat(2, 1fr)" height="100vh">
      <GridItem display="flex" alignItems="center" justifyContent="center">
        <Box width="80%">
          <VStack spacing={4} align="stretch">
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              Login
            </Text>
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
            {error && <Text color="red.500">{error}</Text>}
            <Button colorScheme="blue" onClick={handleLogin}>
              Login
            </Button>
          </VStack>
        </Box>
      </GridItem>
      <GridItem>
        <Image
          src="https://via.placeholder.com/600x800"
          alt="Login Image"
          objectFit="cover"
          height="100%"
          width="100%"
        />
      </GridItem>
    </Grid>
  );
};

export default LoginForm;
