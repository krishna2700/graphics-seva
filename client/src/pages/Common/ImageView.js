import React from "react";
import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ImageZoom from "react-image-zoom";

const ImageView = () => {
  const { imageUrl } = useParams();
  const imageSrc = `http://localhost:5000/${imageUrl}`;
  const zoomProps = {
    img: imageSrc,
    zoomWidth: 500,
    imgAlt: "Project Image",
    zoomPosition: "original",
    offset: { vertical: 10, horizontal: 10 },
  };

  return (
    <Box p={4}>
      <ImageZoom {...zoomProps} />
    </Box>
  );
};

export default ImageView;
