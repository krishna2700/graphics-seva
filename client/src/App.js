import React from "react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import Sidebar from "./components/Sidebar";
import AdminHome from "./pages/Admin/AdminHome";
import CommonPage from "./pages/Common/CommonPage";
import OwnerHome from "./pages/Owner/OwnerHome";
import UserHome from "./pages/User/UserHome";
import CreateAlbums from "./pages/Common/CreateAlbums";
import CreateProjects from "./pages/Common/CreateProjects";
import AdminsDetails from "./pages/Owner/AdminsDetails";
import UsersDetails from "./pages/Owner/UsersDetails";
import DownloadRequests from "./pages/Owner/DownloadRequests";
import { AuthContext } from "./context/AuthContext";
import ProjectDetails from "./pages/Common/ProjectDetails";
import ImageView from "./pages/Common/ImageView";

const App = () => {
  const { isAuthenticated, userRole } = React.useContext(AuthContext);
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);

  const handleSidebarToggle = () => setSidebarOpen(!isSidebarOpen);
  const handleSidebarClose = () => setSidebarOpen(false);

  return (
    <ChakraProvider>
      <Router>
        <Box display="flex" flexDirection="column" minHeight="100vh">
          {isAuthenticated ? (
            <>
              <Header handleSidebarToggle={handleSidebarToggle} />
              <Box display="flex" flex="1">
                {isSidebarOpen && (
                  <Sidebar onClose={handleSidebarClose} userRole={userRole} />
                )}
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
                        <Navigate
                          to={`/${userRole.toLowerCase()}/home`}
                          replace
                        />
                      }
                    />
                    <Route
                      path="/owner/home"
                      element={
                        userRole === "Owner" ? (
                          <OwnerHome />
                        ) : (
                          <Navigate to="/login" replace />
                        )
                      }
                    />
                    <Route
                      path="/common/create-albums"
                      element={<CreateAlbums />}
                    />
                    <Route
                      path="/common/create-projects"
                      element={<CreateProjects />}
                    />
                    <Route path="/projects/:id" element={<ProjectDetails />} />
                    <Route path="/images/:imageUrl" element={<ImageView />} />
                    <Route
                      path="/owner/admins-details"
                      element={
                        userRole === "Owner" ? (
                          <AdminsDetails />
                        ) : (
                          <Navigate to="/login" replace />
                        )
                      }
                    />
                    <Route
                      path="/owner/users-details"
                      element={
                        userRole === "Owner" ? (
                          <UsersDetails />
                        ) : (
                          <Navigate to="/login" replace />
                        )
                      }
                    />
                    <Route
                      path="/owner/download-requests"
                      element={
                        userRole === "Owner" ? (
                          <DownloadRequests />
                        ) : (
                          <Navigate to="/login" replace />
                        )
                      }
                    />
                    <Route
                      path="/admin/home"
                      element={
                        userRole === "Admin" ? (
                          <AdminHome />
                        ) : (
                          <Navigate to="/login" replace />
                        )
                      }
                    />
                    <Route
                      path="/user/home"
                      element={
                        userRole === "User" ? (
                          <UserHome />
                        ) : (
                          <Navigate to="/login" replace />
                        )
                      }
                    />
                    <Route path="/common" element={<CommonPage />} />
                  </Routes>
                </Box>
              </Box>
            </>
          ) : (
            <LoginForm />
          )}
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default App;
