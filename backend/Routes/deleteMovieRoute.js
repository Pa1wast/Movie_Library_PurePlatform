import express from "express";
import { deleteMovie } from "../controllers/deleteMovieController.js";

const Router = express.Router();

Router.route("/").delete(deleteMovie);

export default Router;
