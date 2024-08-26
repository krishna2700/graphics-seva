import React from "react";
import { Flex, Heading, IconButton, Button } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import backGroundImg from "../assets//background.jpg";

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
      style={{
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${backGroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IconButton
        icon={<HamburgerIcon />}
        onClick={handleSidebarToggle}
        variant="ghost"
        color="white"
        aria-label="Open sidebar"
        zIndex={2} // Ensure this is above the background
      />

      <Heading size="md" zIndex={2}>
        My Application
      </Heading>
      <Button onClick={handleLogout} zIndex={2}>
        Logout
      </Button>
    </Flex>
  );
};

export default Header;
