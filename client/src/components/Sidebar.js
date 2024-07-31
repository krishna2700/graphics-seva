import React from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Button,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, onClose, userRole }) => {
  const location = useLocation();

  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              {userRole === "Owner" && (
                <Button
                  as={Link}
                  to="/owner"
                  variant={location.pathname === "/owner" ? "solid" : "outline"}
                >
                  Owner Tab
                </Button>
              )}
              {userRole === "Admin" && (
                <Button
                  as={Link}
                  to="/admin"
                  variant={location.pathname === "/admin" ? "solid" : "outline"}
                >
                  Admin Tab
                </Button>
              )}
              {userRole === "User" && (
                <Button
                  as={Link}
                  to="/user"
                  variant={location.pathname === "/user" ? "solid" : "outline"}
                >
                  User Tab
                </Button>
              )}
              <Button
                as={Link}
                to="/common"
                variant={location.pathname === "/common" ? "solid" : "outline"}
              >
                Common Tab
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default Sidebar;
