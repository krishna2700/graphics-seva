import React from "react";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = ({ handleSidebarToggle }) => {
  const navigate = useNavigate();
  const { logout } = React.useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
      window.location.reload();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <Flex
      as="header"
      width="100%"
      padding="4"
      backgroundColor="gray.800"
      color="white"
      justifyContent="space-between"
      alignItems="center"
    >
      <Button onClick={handleSidebarToggle}>Toggle Sidebar</Button>
      <Heading size="md">My Application</Heading>
      <Button onClick={handleLogout}>Logout</Button>
    </Flex>
  );
};

export default Header;
