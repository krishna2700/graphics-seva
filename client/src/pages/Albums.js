import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { getAlbums } from "../api/api";

const Albums = ({ token }) => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await getAlbums(token);
        setAlbums(response.data);
      } catch (error) {
        alert("Failed to fetch albums");
      }
    };

    fetchAlbums();
  }, [token]);

  return (
    <Box p={4}>
      <Text fontSize="xl" mb={4}>
        Albums
      </Text>
      {albums.map((album) => (
        <Box key={album._id} p={4} borderWidth="1px" borderRadius="md" mb={2}>
          <Text fontWeight="bold">{album.name}</Text>
          <Text>Date: {album.date}</Text>
          <Text>Privacy: {album.privacy}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default Albums;
