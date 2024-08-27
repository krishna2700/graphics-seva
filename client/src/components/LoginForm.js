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
import backgroundImg from "../assets/background.jpg";

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
    <Grid
      height="100vh"
      backgroundImage={`url(${backgroundImg})`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      opacity={0.8}
    >
      <GridItem display="flex" alignItems="center" justifyContent="center">
        <Box
          width="80%"
          maxWidth="400px"
          bg="whiteAlpha.900"
          p={8}
          borderRadius="md"
          boxShadow="lg"
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
              boxSize="100px"
              objectFit="cover"
              mb={4}
            />

            <Input
              placeholder="Username or Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg="gray.700"
              color="white"
              _placeholder={{ color: "gray.400" }}
              border="2px"
              borderColor="blue.500"
              _focus={{
                borderColor: "blue.700",
                boxShadow: "0 0 0 1px blue.700",
              }}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              bg="gray.700"
              color="white"
              _placeholder={{ color: "gray.400" }}
              border="2px"
              borderColor="blue.500"
              _focus={{
                borderColor: "blue.700",
                boxShadow: "0 0 0 1px blue.700",
              }}
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
