export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://crumbsmapinfluencertrails.herokuapp.com/"
    : "https://localhost:8080";
