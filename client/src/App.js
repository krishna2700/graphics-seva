import { Box, Button, ChakraProvider } from "@chakra-ui/react";
import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import useAuth from "./hooks/useAuth"; // Custom hook to get auth status
import CommonPage from "./pages/CommonPage";
import Dashboard from "./pages/Dashboard";
import OwnerPage from "./pages/OwnerPage";

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const { isAuthenticated, userRole } = useAuth();

  const handleSidebarToggle = () => setSidebarOpen(!isSidebarOpen);

  return (
    <ChakraProvider>
      <Router>
        <Box>
          <Button onClick={handleSidebarToggle}>Toggle Sidebar</Button>
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={handleSidebarToggle}
            userRole={userRole}
          />
          <Routes>
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <LoginForm />
              }
            />
            <Route
              path="/dashboard"
              element={<ProtectedRoute element={Dashboard} />}
            />
            <Route
              path="/owner"
              element={<ProtectedRoute element={OwnerPage} />}
            />
            {/* <Route
              path="/admin"
              element={<ProtectedRoute element={AdminPage} />}
            />
            <Route
              path="/user"
              element={<ProtectedRoute element={UserPage} />}
            /> */}
            <Route
              path="/common"
              element={<ProtectedRoute element={CommonPage} />}
            />
            <Route
              path="/"
              element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <LoginForm />
              }
            />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default App;
