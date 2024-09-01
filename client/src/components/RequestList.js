import React, { useState, useEffect } from "react";
import { VStack, Text, Box } from "@chakra-ui/react";
import { getRequests } from "../api/api";

const RequestList = ({ token }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await getRequests(token);
        setRequests(response.data);
      } catch (error) {
        alert("Failed to fetch requests");
      }
    };

    fetchRequests();
  }, [token]);

  return (
    <VStack spacing={4}>
      {requests.map((request) => (
        <Box key={request._id} p={4} borderWidth="1px" borderRadius="md">
          <Text fontWeight="bold">{request.name}</Text>
          <Text>Date: {request.date}</Text>
          <Text>Status: {request.status}</Text>
        </Box>
      ))}
    </VStack>
  );
};

export default RequestList;
