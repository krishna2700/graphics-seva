import React from "react";
import {
  Box,
  VStack,
  Link,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ role }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const sidebarItems = {
    owner: [
      { name: "Projects", path: "/projects" },
      { name: "Albums", path: "/albums" },
      { name: "Requests", path: "/requests" },
      { name: "Create Admin", path: "/create-admin" },
      { name: "Create User", path: "/create-user" },
      { name: "Private Albums", path: "/private-albums" },
    ],
    admin: [
      { name: "Projects", path: "/projects" },
      { name: "Albums", path: "/albums" },
      { name: "Create Users", path: "/create-user" },
      { name: "Requests", path: "/requests" },
    ],
    user: [{ name: "Create Albums", path: "/create-album" }],
  };

  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<HamburgerIcon />}
        variant="outline"
        m={4}
      >
        Menu
      </Button>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4}>
              {sidebarItems[role].map((item) => (
                <Link
                  key={item.name}
                  onClick={() => {
                    navigate(item.path);
                    onClose();
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
