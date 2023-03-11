import express from "express";
import { exampleController } from "../controllers/example.controllers";

const exampleRouter = express.Router();

exampleRouter.get("/", exampleController);

export default exampleRouter;
