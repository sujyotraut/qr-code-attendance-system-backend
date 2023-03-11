import { ErrorRequestHandler } from "express";
import APIResponse from "../types/APIResponse.types";

/*
In Express 4 we have to manually pass the error thrown in async function to the next function,
In Express 5 we no longer need to pass error to next function,
Unhandled promise rejections are automatically passed to error handler.
*/
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.json({ status: "fail", message: "An unexpected error occurred" } as APIResponse);
};

export default errorHandler;
