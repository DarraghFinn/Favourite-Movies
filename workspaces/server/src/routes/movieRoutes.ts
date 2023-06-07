import express, { Request, Response } from "express";
import { Pool } from "pg";
import MovieController from "../controllers/movieController";

const router = express.Router();

export default function movieRoutes(pool: Pool) {
  const controller = new MovieController(pool);

  router.get("/movies/:title", async (req: Request, res: Response) => {
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
      await controller.updateFavouriteMovie(req, res);
    }
  );

  return router;
}
