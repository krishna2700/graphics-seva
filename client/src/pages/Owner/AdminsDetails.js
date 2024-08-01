import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  VStack,
  Text,
} from "@chakra-ui/react";
import { createAdmin, getAdmins } from "../../api/auth";

const AdminsDetails = () => {
  const [admins, setAdmins] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const adminsData = await getAdmins();
        setAdmins(adminsData);
      } catch (error) {
        console.error("Failed to fetch admins", error);
      }
    };

    fetchAdmins();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCreateAdmin = async () => {
    try {
      const createdAdmin = await createAdmin(newAdmin);
      setAdmins((prevState) => [...prevState, createdAdmin]);
      setModalOpen(false);
      setNewAdmin({ name: "", email: "", password: "" });
    } catch (error) {
      console.error("Failed to create admin", error);
    }
  };

  return (
    <Box p={4}>
      <Button colorScheme="blue" onClick={() => setModalOpen(true)}>
        Create Admin
      </Button>

      {admins.length === 0 ? (
        <Text mt={4}>No Admin Found</Text>
      ) : (
        <VStack spacing={4} mt={4}>
          {admins.map((admin) => (
            <Box
              key={admin._id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              w="100%"
              boxShadow="sm"
            >
              <Text fontWeight="bold">{admin.name}</Text>
              <Text>{admin.email}</Text>
              <Button mt={2} colorScheme="teal">
                View More Details
              </Button>
            </Box>
          ))}
        </VStack>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Admin</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="name" mb={4}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={newAdmin.name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="email" mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={newAdmin.email}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="password" mb={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={newAdmin.password}
                onChange={handleInputChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCreateAdmin}>
              Create
            </Button>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AdminsDetails;
