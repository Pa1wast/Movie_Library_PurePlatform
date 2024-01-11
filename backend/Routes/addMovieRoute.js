import express from "express";
import { addNewMovie } from "../controllers/addMovieController.js";
const Router = express.Router();

Router.route("/").post(addNewMovie);

export default Router;
