import express from "express";
import {
  getAllMovies,
  getOneMovie,
  getMovieBySearch,
} from "../controllers/getMoviesController.js";
const Router = express.Router();

Router.route("/").get(getAllMovies);
Router.route("/search").get(getMovieBySearch);
Router.route("/:id").get(getOneMovie);

export default Router;
