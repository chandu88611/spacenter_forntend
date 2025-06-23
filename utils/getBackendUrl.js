export const getBackendUrl = () => {
  if (typeof window !== "undefined") {
    // ✅ Running in the browser (Client)
    if (window.location.hostname === "localhost") {
      return "http://97.74.87.147:8001";
    } else {
      return "https://spacentresnearme.com/api"; // Production
    }
  } else {
    // ✅ Running on the server (e.g., during SSR)
    if (process.env.NODE_ENV === "development") {
      return "http://97.74.87.147:8001";
    } else {
      return "https://spacentresnearme.com/api";
    }
  }
};
