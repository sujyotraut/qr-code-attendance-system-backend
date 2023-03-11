import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import errorHandler from "./middleware/error.middleware";
import exampleMiddleware from "./middleware/example.middleware";
import exampleRouter from "./routes/example.routes";
import APIResponse from "./types/APIResponse.types";

// Load environment variable form .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(exampleMiddleware);

// Base route
app.get("/", (req, res) => res.json({ status: "success", data: "Server is up & running..." } as APIResponse));

// Routes
app.use("/example", exampleRouter);

// Not found route
// In Express 5 `(*)` is no longer valid and must be written as `(.*)`
app.get("(.*)", (req, res) => res.json({ status: "fail", message: "Not Found" } as APIResponse));

// Error handler
app.use(errorHandler);

// Server
app.listen(port, () => console.log(`Server is listening on port ${port}`));
