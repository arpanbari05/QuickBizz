let baseUrl = "https://quickbizz-backend.onrender.com";
if (process.env.NODE_ENV === "development") baseUrl = "http://127.0.0.1:5000";

export { baseUrl };
