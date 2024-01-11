import express from "express";
import { addComment } from "../controllers/addCommentController.js";
const Router = express.Router();

Router.route("/:id").post(addComment);

export default Router;
