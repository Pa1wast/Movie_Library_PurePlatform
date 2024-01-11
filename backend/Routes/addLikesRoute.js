import express from "express";
import { addLike } from "../controllers/addLikeController.js";
const Router = express.Router();

Router.route("/:id").post(addLike);

export default Router;
