
// Server.js
import express, { response } from "express";
import mongoose from "mongoose";
import { PORT, MONGO_URI } from "./config.js";
import bookRoute from './routes/booksRoute.js'
import cors from "cors";

const app = express();

// Middleware
app.use(express.json());

// Middleware for handing CORS POLICY
// Option 1: Allow All origins with Default of cors 
app.use(cors())


app.get("/", (req, res) => {

  res.send("Server is running with MongoDB connection 🚀");
});


app.use('/books',bookRoute);

// MongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error.message);
  });



// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
