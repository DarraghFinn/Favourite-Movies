import { Request, Response } from "express";
import { MovieService } from "../services/movieService";
import { OMDbService } from "../services/omdbService";

export default class MovieController {
  private movieService: MovieService;
  private omdbService: OMDbService;

  constructor() {
    this.movieService = new MovieService();
    this.omdbService = new OMDbService();
  }

  async getMoviesByTitleAPI(req: Request, res: Response) {
    try {
      const { title } = req.params;
      const movies = await this.omdbService.getMoviesByTitle(title);

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
      const favouriteMovies = await this.movieService.getMovies();
      res.status(200).json(favouriteMovies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async addFavouriteMovie(req: Request, res: Response) {
    try {
      await this.movieService.addMovie(req.body);
      res.status(201).json({});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async upvoteFavouriteMovie(req: Request, res: Response) {
    try {
      const { id, upvotes } = req.body;
      await this.movieService.upvoteMovie(id, upvotes);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
