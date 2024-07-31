import React from "react";
import { Box, List, ListItem, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import sidebarConfig from "../config/sidebarConfig";

const Sidebar = ({ isOpen, onClose, userRole }) => {
  if (!isOpen) return null;

  const items = sidebarConfig[userRole] || [];

  return (
    <Box
      position="fixed"
      left="0"
      top="0"
      bottom="0"
      width="250px"
      bg="gray.700"
      color="white"
      p={4}
      overflowY="auto"
    >
      <List spacing={3}>
        {items.map((item) => (
          <ListItem key={item.path}>
            <Link as={RouterLink} to={item.path} onClick={onClose}>
              {item.name}
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
