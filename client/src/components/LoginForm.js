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
import profileImg from "../assets/profile.jpg";

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
    <Grid height="100vh">
      <GridItem display="flex" alignItems="center" justifyContent="center">
        <Box
          width="80%"
          maxWidth="400px" // Optional: Set a maximum width for the form
          bg="whiteAlpha.900" // Optional: Background color or transparency for the box
          p={8} // Padding inside the box
          borderRadius="md"
          
        >
          <VStack
            spacing={4}
            align="stretch"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src={profileImg}
              alt="Login Image"
              borderRadius="full"
              boxSize="100px" // Ensures the image is always a 100px by 100px circle
              objectFit="cover" // Ensures the image maintains its aspect ratio within the circle
              mb={4}
            />

            <Input
              placeholder="Username or Email"
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
    </Grid>
  );
};

export default LoginForm;
