import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const CommonPage = () => {
  return (
    <Box p={4}>
      <Heading as="h1">Common Page</Heading>
      <Text mt={4}>
        This page is accessible to all users regardless of their role.
      </Text>
    </Box>
  );
};

export default CommonPage;
