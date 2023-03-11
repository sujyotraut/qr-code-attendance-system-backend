import { RequestHandler } from "express";

const exampleMiddleware: RequestHandler = (req, res, next) => {
  console.log(`path: ${req.path}`);
  next();
};

export default exampleMiddleware;
