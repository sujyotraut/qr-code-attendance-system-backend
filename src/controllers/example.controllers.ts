import { RequestHandler } from "express";
import APIResponse from "../types/APIResponse.types";

export const exampleController: RequestHandler = (req, res) => {
  res.json({ status: "success", data: "This is a message form an example route" } as APIResponse);
};
