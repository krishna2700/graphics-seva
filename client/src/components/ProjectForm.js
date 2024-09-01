import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  VStack,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { createProject, getUsers } from "../api/api";
import { useNavigate } from "react-router-dom";

const ProjectForm = ({ token }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers(token);
        setUsers(response.data);
      } catch (error) {
        alert("Failed to fetch users");
      }
    };

    fetchUsers();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProject({ name, date, assignedTo }, token);
      alert("Project created successfully");
      navigate("/projects");
    } catch (error) {
      alert("Failed to create project");
    }
  };

  return (
    <VStack spacing={4}>
      <FormControl>
        <FormLabel>Project Name</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Date</FormLabel>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Assign To</FormLabel>
        <Select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        >
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </Select>
      </FormControl>
      <Button onClick={handleSubmit} colorScheme="blue">
        Create Project
      </Button>
    </VStack>
  );
};

export default ProjectForm;
