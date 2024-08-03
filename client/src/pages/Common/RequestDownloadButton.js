import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import { requestDownload, getDownloadRequestByImageUrl } from "../../api/auth";

const RequestDownloadButton = ({ imageUrl }) => {
  const [requestStatus, setRequestStatus] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRequestStatus = async () => {
      try {
        const response = await getDownloadRequestByImageUrl(imageUrl);
        console.log("API Response:", response); // Log the full response
        // Assuming the response might be an array, find the request with the matching imageUrl
        const request = response.find((req) => req.imageUrl === imageUrl);
        if (request) {
          setRequestStatus(request.status);
          setDownloadUrl(request.imageUrl);
        } else {
          console.error("No request found for the given imageUrl");
        }
      } catch (error) {
        setRequestStatus(null);
        console.error("Error fetching request status:", error);
      }
    };

    fetchRequestStatus();
  }, [imageUrl]);

  const handleRequestDownload = async () => {
    try {
      await requestDownload(imageUrl);
      alert("Download request submitted successfully!");
      setRequestStatus("pending");
    } catch (error) {
      console.error("Failed to submit download request:", error);
      alert("Failed to submit download request");
    }
  };

  const handleDownload = async () => {
    try {
      setIsLoading(true); // Set loading state to true

      // Ensure the URL is correctly constructed
      const fullUrl = `http://localhost:5000/uploads/${downloadUrl}`;
      console.log("Fetching image from URL:", fullUrl);

      const response = await axios.get(fullUrl, {
        responseType: "blob", // Ensure the response is treated as a blob
      });

      console.log("Download response status:", response.status);

      // Create a URL for the blob
      const blob = response.data;
      const url = URL.createObjectURL(blob);

      // Create a link element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.download = downloadUrl.split("/").pop(); // Use the filename from `downloadUrl`
      document.body.appendChild(link);
      link.click();

      // Clean up
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to download image:", error);
      alert("Failed to download image");
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  return (
    <Button
      colorScheme="blue"
      onClick={
        requestStatus === "approved" ? handleDownload : handleRequestDownload
      }
      isDisabled={requestStatus === "pending" || isLoading}
    >
      {isLoading
        ? "Downloading..."
        : requestStatus === "pending"
        ? "Download Request Pending"
        : requestStatus === "approved"
        ? "Download Image"
        : "Request to Download Image"}
    </Button>
  );
};

export default RequestDownloadButton;
