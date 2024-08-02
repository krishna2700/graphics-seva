import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectById, updateProjectImages } from "../../api/auth";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isGalleryOpen, setGalleryOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectData = await getProjectById(id);
        setProject(projectData);
      } catch (error) {
        console.error("Failed to fetch project", error);
      }
    };

    fetchProject();
  }, [id]);

  const handleAddImage = async (e) => {
    const files = e.target.files;
    const formData = new FormData();
    for (let file of files) {
      formData.append("images", file);
    }

    try {
      const response = await updateProjectImages(id, formData);
      setProject(response.data);
      toast({
        title: "Images updated.",
        description: "The project images have been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Failed to update images", error);
      toast({
        title: "Error.",
        description: "Failed to update images.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      {project ? (
        <>
          <Box mb={4}>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
            <p>Assigned To: {project.assignedTo.name}</p>
          </Box>
          <Button onClick={() => setGalleryOpen(true)}>View Images</Button>

          {/* Gallery Modal */}
          <Modal
            isOpen={isGalleryOpen}
            onClose={() => setGalleryOpen(false)}
            size="full"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Project Images</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <SimpleGrid columns={3} spacing={4}>
                  {project.images.map((image, index) => (
                    <Box key={index} position="relative" cursor="pointer">
                      <Image
                        src={`http://localhost:5000/${image}`}
                        alt={`Project Image ${index}`}
                        objectFit="cover"
                        borderRadius="md"
                        onClick={() =>
                          navigate(`/images/${encodeURIComponent(image)}`)
                        }
                      />
                    </Box>
                  ))}
                </SimpleGrid>
                <IconButton
                  aria-label="Add More Images"
                  icon={<AddIcon />}
                  mt={4}
                  onClick={() =>
                    document.querySelector('input[type="file"]').click()
                  }
                />
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleAddImage}
                />
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" onClick={() => setGalleryOpen(false)}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Box>
  );
};

export default ProjectDetails;
