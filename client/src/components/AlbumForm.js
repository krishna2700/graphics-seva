import React, { useState } from "react";
import {
  Button,
  Input,
  VStack,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { createAlbum } from "../api/api";
import { useNavigate } from "react-router-dom";

const AlbumForm = ({ token }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAlbum({ name, date, privacy }, token);
      alert("Album created successfully");
      navigate("/albums");
    } catch (error) {
      alert("Failed to create album");
    }
  };

  return (
    <VStack spacing={4}>
      <FormControl>
        <FormLabel>Album Name</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Date</FormLabel>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Privacy</FormLabel>
        <Select value={privacy} onChange={(e) => setPrivacy(e.target.value)}>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </Select>
      </FormControl>
      <Button onClick={handleSubmit} colorScheme="blue">
        Create Album
      </Button>
    </VStack>
  );
};

export default AlbumForm;
