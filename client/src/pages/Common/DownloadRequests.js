import React, { useEffect, useState } from "react";
import { Box, Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { getDownloadRequests, updateDownloadRequest } from "../../api/auth";

const DownloadRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const data = await getDownloadRequests();
      setRequests(data);
    };
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    await updateDownloadRequest(id, "approved");
    setRequests((prev) =>
      prev.map((req) => (req._id === id ? { ...req, status: "approved" } : req))
    );
  };

  const handleDeny = async (id) => {
    await updateDownloadRequest(id, "denied");
    setRequests((prev) =>
      prev.map((req) => (req._id === id ? { ...req, status: "denied" } : req))
    );
  };

  return (
    <Box p={4}>
      <h2>Download Requests</h2>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Image URL</Th>
            <Th>User</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {requests.map((request) => (
            <Tr key={request._id}>
              <Td>{request.imageUrl}</Td>
              <Td>{request.userId.email}</Td>
              <Td>{request.status}</Td>
              <Td>
                {request.status === "pending" && (
                  <>
                    <Button
                      colorScheme="green"
                      onClick={() => handleApprove(request._id)}
                      mr={2}
                    >
                      Approve
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => handleDeny(request._id)}
                    >
                      Deny
                    </Button>
                  </>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default DownloadRequests;
