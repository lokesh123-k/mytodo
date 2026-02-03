import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ✅ Proper CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://your-frontend.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(express.json());

app.use("/api/todos", todoRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Todo API Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
