import express, { Request, Response } from "express";
import MovieController from "../controllers/movieController";

const router = express.Router();

export default function movieRoutes() {
  const controller = new MovieController();

  router.get("/movies/movie/:title", async (req: Request, res: Response) => {
    await controller.getMoviesByTitleAPI(req, res);
  });

  router.get("/movies/favourites", async (___, res: Response) => {
    await controller.getFavouriteMovies(res);
  });

  router.post("/movies/favourites", async (req: Request, res: Response) => {
    await controller.addFavouriteMovie(req, res);
  });

  router.patch(
    "/movies/favourites/:id",
    async (req: Request, res: Response) => {
      await controller.upvoteFavouriteMovie(req, res);
    }
  );

  return router;
}
