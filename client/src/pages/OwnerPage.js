import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const OwnerPage = () => {
  return (
    <Box p={4}>
      <Heading as="h1">Owner Page</Heading>
      <Text mt={4}>
        Welcome, Owner! This page is accessible only to users with the Owner
        role.
      </Text>
    </Box>
  );
};

export default OwnerPage;
