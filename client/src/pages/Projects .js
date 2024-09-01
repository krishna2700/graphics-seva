import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { getProjects } from "../api/api";

const Projects = ({ token }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects(token);
        setProjects(response.data);
      } catch (error) {
        alert("Failed to fetch projects");
      }
    };

    fetchProjects();
  }, [token]);

  return (
    <Box p={4}>
      <Text fontSize="xl" mb={4}>
        Projects
      </Text>
      {projects.map((project) => (
        <Box key={project._id} p={4} borderWidth="1px" borderRadius="md" mb={2}>
          <Text fontWeight="bold">{project.name}</Text>
          <Text>Date: {project.date}</Text>
          <Text>Assigned To: {project.assignedTo}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default Projects;
