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
  Textarea,
  Select,
  VStack,
  Text,
} from "@chakra-ui/react";
import { getUsers, createProject } from "../../api/auth";

const CreateProjects = () => {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    images: [],
    assignedTo: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewProject((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...Array.from(e.target.files)],
    }));
  };

  const handleCreateProject = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newProject.name);
      formData.append("description", newProject.description);
      newProject.images.forEach((image) => formData.append("images", image));
      formData.append("assignedTo", newProject.assignedTo);

      const projectData = await createProject(formData);
      setProjects((prevState) => [...prevState, projectData]);
      setModalOpen(false);
      setNewProject({ name: "", description: "", images: [], assignedTo: "" });
    } catch (error) {
      console.error("Failed to create project", error);
    }
  };

  return (
    <Box p={4}>
      <Button colorScheme="blue" onClick={() => setModalOpen(true)}>
        Create Project
      </Button>

      {projects.length === 0 ? (
        <Text mt={4}>No Projects Found</Text>
      ) : (
        <VStack spacing={4} mt={4}>
          {projects.map((project) => (
            <Box
              key={project._id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              w="100%"
              boxShadow="sm"
            >
              <Text fontWeight="bold">{project.name}</Text>
              <Text>{project.description}</Text>
            </Box>
          ))}
        </VStack>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="name" mb={4}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={newProject.name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="description" mb={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={newProject.description}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="images" mb={4}>
              <FormLabel>Images</FormLabel>
              <Input
                type="file"
                name="images"
                multiple
                onChange={handleFileChange}
              />
            </FormControl>
            <FormControl id="assignedTo" mb={4}>
              <FormLabel>Assign To</FormLabel>
              <Select
                name="assignedTo"
                value={newProject.assignedTo}
                onChange={handleInputChange}
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleCreateProject}>
              Create Project
            </Button>
            <Button variant="ghost" onClick={() => setModalOpen(false)} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CreateProjects;
