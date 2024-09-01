import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { getAlbums } from "../api/api";

const PrivateAlbums = ({ token }) => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await getAlbums(token);
        setAlbums(response.data.filter((album) => album.privacy === "private"));
      } catch (error) {
        alert("Failed to fetch private albums");
      }
    };

    fetchAlbums();
  }, [token]);

  return (
    <Box p={4}>
      <Text fontSize="xl" mb={4}>
        Private Albums
      </Text>
      {albums.map((album) => (
        <Box key={album._id} p={4} borderWidth="1px" borderRadius="md" mb={2}>
          <Text fontWeight="bold">{album.name}</Text>
          <Text>Date: {album.date}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default PrivateAlbums;
