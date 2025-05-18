// src/utils/api.js

export const getBackendUrl = () => {
  // Check if the app is running on localhost or on a remote server
  if (window.location.hostname === "localhost") {
    // Local environment, use localhost
    return "http://localhost:5000";
  } else {
    // Production environment, use your production server
    return "http://97.74.87.147"; // Replace with your production URL
  }
};
