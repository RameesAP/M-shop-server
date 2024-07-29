import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from 'url';
import cors from "cors";
dotenv.config();

// Define __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Enable CORS
app.use(cors({
  origin: '*',
}));

// import routes
import userRoutes from "./routes/user_route.js";
import authRoutes from "./routes/auth_router.js";
import technicianRoutes from "./routes/technician_route.js";

//use of routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/technician", technicianRoutes);


//middleware

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "internal server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.use('/static', express.static(path.join(__dirname, 'public')));


// DB Connect
mongoose
  .connect(process.env.MONGO,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 90000, // Increase timeout to 30 seconds
  })
  .then(() => {
    console.log("Connected to Mongo DB!!");
  })
  .catch((error) => {
    console.log(error);
  });

//5000 port
app.listen(process.env.PORT||10000, () => {
  console.log("Server is running on port 5000!");
});
