import { Box, ChakraProvider } from "@chakra-ui/react";
import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import Sidebar from "./components/Sidebar";
import useAuth from "./hooks/useAuth";
import AdminHome from "./pages/Admin/AdminHome";
import CommonPage from "./pages/CommonPage";
import OwnerHome from "./pages/Owner/OwnerHome";
import UserHome from "./pages/User/UserHome";

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const { isAuthenticated, userRole } = useAuth();

  console.log("isAuthenticated:", isAuthenticated);
  console.log("userRole:", userRole);

  const handleSidebarToggle = () => setSidebarOpen(!isSidebarOpen);

  return (
    <ChakraProvider>
      <Router>
        <Box display="flex" flexDirection="column" minHeight="100vh">
          {isAuthenticated ? (
            <>
              <Header handleSidebarToggle={handleSidebarToggle} />
              <Box display="flex" flex="1">
                <Sidebar
                  isOpen={isSidebarOpen}
                  onClose={() => setSidebarOpen(false)}
                  userRole={userRole}
                />
                <Box
                  ml={isSidebarOpen ? "250px" : "0"}
                  transition="margin-left 0.3s"
                  p={4}
                  flex="1"
                >
                  <Routes>
                    <Route
                      path="/login"
                      element={
                        <Navigate to={`/${userRole.toLowerCase()}/home`} />
                      }
                    />
                    <Route
                      path="/owner/home"
                      element={
                        userRole === "Owner" ? (
                          <OwnerHome />
                        ) : (
                          <Navigate to="/login" />
                        )
                      }
                    />
                    <Route
                      path="/admin/home"
                      element={
                        userRole === "Admin" ? (
                          <AdminHome />
                        ) : (
                          <Navigate to="/login" />
                        )
                      }
                    />
                    <Route
                      path="/user/home"
                      element={
                        userRole === "User" ? (
                          <UserHome />
                        ) : (
                          <Navigate to="/login" />
                        )
                      }
                    />
                    <Route
                      path="/common"
                      element={
                        isAuthenticated ? (
                          <CommonPage />
                        ) : (
                          <Navigate to="/login" />
                        )
                      }
                    />
                    <Route
                      path="/"
                      element={
                        isAuthenticated ? (
                          <Navigate to={`/${userRole.toLowerCase()}/home`} />
                        ) : (
                          <Navigate to="/login" />
                        )
                      }
                    />
                  </Routes>
                </Box>
              </Box>
            </>
          ) : (
            <Box
              flex="1"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            </Box>
          )}
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default App;
