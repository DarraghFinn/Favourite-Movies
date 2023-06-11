import express from "express";
import request from "supertest";
import movieRoutes from "../../routes/movieRoutes";

describe("MovieController tests", () => {
  const app = express();
  app.use("/api", movieRoutes());
  let appServer = app.listen(3001);

  beforeAll(() => {
    process.env.API_KEY = "8fc6c84a";
    process.env.OMDB_API_URL = "http://www.omdbapi.com";
  });

  afterAll(() => {
    appServer.close();
  });

  describe("GET /movies/:title - getMoviesByTitleAPI tests", () => {
    it("should get a movie based on title entered", async () => {
      const response = await request(app).get("/api/movies/movie/pulp");

      expect(response.status).toBe(200);
    });

    it("should fail to find a movie based on title entered", async () => {
      const response = await request(app).get("/api/movies/movie/zyx");

      expect(response.status).toBe(404);
    });

    it("should fail to find a movie because of too many results", async () => {
      const response = await request(app).get("/api/movies/movie/z");

      expect(response.status).toBe(500);
    });
  });

  describe("POST /movies/favourites - addFavouriteMovie tests", () => {
    it("should fail to add favourite movie", async () => {
      const response = await request(app).post("/api/movies/favourites");
      expect(response.status).toBe(500);
    });
  });

  describe("PATCH /movies/favourites - upvoteFavouriteMovie tests", () => {
    it("should fail to upvote favourite movie", async () => {
      const response = await request(app).patch(
        "/api/movies/favourites/123-abc"
      );
      expect(response.status).toBe(500);
    });
  });
});
