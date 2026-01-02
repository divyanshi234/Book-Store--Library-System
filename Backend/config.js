
// config.js
import dotenv from "dotenv";

dotenv.config(); // 👈 Load .env file

export const PORT = process.env.PORT || 4000;
export const MONGO_URI = process.env.MONGO_URI;
