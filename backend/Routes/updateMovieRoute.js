import express from "express";
import { updateMovie } from "../controllers/updateMovieController.js";
const Router = express.Router();

Router.route("/").post(updateMovie);

export default Router;
