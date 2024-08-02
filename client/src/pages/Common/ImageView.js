import React from "react";
import { Box, Image } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const ImageView = () => {
  const { imageUrl } = useParams();

  return (
    <Box p={4}>
      <Image
        src={imageUrl}
        alt="Project Image"
        objectFit="contain"
        width="100%"
        height="auto"
      />
    </Box>
  );
};

export default ImageView;
