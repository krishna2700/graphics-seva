import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { createAdmin, getAdminDetails, getAdmins } from "../../api/auth";

const AdminsDetails = () => {
  const [admins, setAdmins] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [adminDetails, setAdminDetails] = useState({ projects: [] }); // Initialized with an empty array for projects

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

  const handleViewDetails = async (admin) => {
    try {
      const details = await getAdminDetails(admin._id);
      setAdminDetails(details);
      setSelectedAdmin(admin);
      setDetailsModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch admin details", error);
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
              <Button
                mt={2}
                colorScheme="teal"
                onClick={() => handleViewDetails(admin)}
              >
                View More Details
              </Button>
            </Box>
          ))}
        </VStack>
      )}

      {/* Create Admin Modal */}
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

      {/* Admin Details Modal */}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Admin Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold">Name: {selectedAdmin?.name}</Text>
            <Text>Email: {selectedAdmin?.email}</Text>
            <Box mt={4}>
              <Text fontWeight="bold">Projects:</Text>
              <VStack spacing={2}>
                {adminDetails.projects.length === 0 ? (
                  <Text>No Projects Found</Text>
                ) : (
                  adminDetails.projects.map((project) => (
                    <Box
                      key={project._id}
                      p={2}
                      borderWidth="1px"
                      borderRadius="md"
                      w="100%"
                      boxShadow="sm"
                    >
                      <Text fontWeight="bold">{project.name}</Text>
                      <Text>{project.description}</Text>
                    </Box>
                  ))
                )}
              </VStack>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setDetailsModalOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AdminsDetails;
