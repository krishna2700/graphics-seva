import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { getRequests } from "../api/api";

const Requests = ({ token }) => {
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
    <Box p={4}>
      <Text fontSize="xl" mb={4}>
        Requests
      </Text>
      {requests.map((request) => (
        <Box key={request._id} p={4} borderWidth="1px" borderRadius="md" mb={2}>
          <Text fontWeight="bold">{request.name}</Text>
          <Text>Date: {request.date}</Text>
          <Text>Status: {request.status}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default Requests;
