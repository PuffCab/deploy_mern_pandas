// export const baseUrl = "http://localhost:5002";
// export const baseUrl = "https://deploy-mern-pandas-server.vercel.app";

// export const baseUrl = "http://localhost:5002";
export const baseUrl =
  import.meta.env.MODE === "development"
    ? "http://localhost:5002"
    : "https://deploy-mern-pandas-server.vercel.app";
