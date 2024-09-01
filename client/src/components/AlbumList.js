import React, { useState, useEffect } from "react";
import { VStack, Text, Box } from "@chakra-ui/react";
import { getAlbums } from "../api/api";

const AlbumList = ({ token }) => {
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
    <VStack spacing={4}>
      {albums.map((album) => (
        <Box key={album._id} p={4} borderWidth="1px" borderRadius="md">
          <Text fontWeight="bold">{album.name}</Text>
          <Text>Date: {album.date}</Text>
          <Text>Privacy: {album.privacy}</Text>
        </Box>
      ))}
    </VStack>
  );
};

export default AlbumList;
