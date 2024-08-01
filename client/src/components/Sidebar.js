import React from "react";
import { Box, List, ListItem, Link, IconButton } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import sidebarConfig from "../config/sidebarConfig";

const Sidebar = ({ onClose, userRole }) => {
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
      <IconButton
        icon={<CloseIcon />}
        onClick={onClose}
        variant="ghost"
        color="white"
        aria-label="Close sidebar"
        mb={4}
      />
      <List spacing={3}>
        {items.map((item) => (
          <ListItem key={item.path}>
            <Link as={RouterLink} to={item.path}>
              {item.name}
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
