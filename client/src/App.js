import React, { useState } from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Home from "./pages/Home";
import Projects from "./pages/Projects ";
import Albums from "./pages/Albums";
import Requests from "./pages/Requests";
import CreateUser from "./pages/CreateUser";
import CreateAdmin from "./pages/CreateAdmin";
import PrivateAlbums from "./pages/PrivateAlbums";
import AlbumForm from "./components/AlbumForm";
import ProjectForm from "./components/ProjectForm";

const App = () => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/requests" element={<Requests />} />
          {/* <Route path="/create-project" element={<CreateProject />} />
          <Route path="/create-album" element={<CreateAlbum />} /> */}
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/create-admin" element={<CreateAdmin />} />
          <Route path="/private-albums" element={<PrivateAlbums />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
