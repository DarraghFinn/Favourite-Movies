import { Request, Response } from "express";
import {
  addMovie,
  getMovies,
  getMoviesByTitle,
  updateMovie,
} from "../services/movieService";
import { Pool } from "pg";

export default class MovieController {
  constructor(private readonly pool: Pool) {}

  async getMoviesByTitleAPI(req: Request, res: Response) {
    try {
      const { title } = req.params;
      const movies = await getMoviesByTitle(title);

      if (movies.Response === "True") {
        res.status(200).json(movies);
      } else if (movies.Error === "Too many results.") {
        res.status(500).json({ error: movies.Error });
      } else {
        res.status(404).json({ error: "Movie not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getFavouriteMovies(res: Response) {
    try {
      const favouriteMovies = await getMovies(this.pool);
      res.status(200).json(favouriteMovies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async addFavouriteMovie(req: Request, res: Response) {
    try {
      const request = req.body;
      await addMovie(this.pool, request);
      res.status(201);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateFavouriteMovie(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await updateMovie(this.pool, id);
      res.status(204);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
