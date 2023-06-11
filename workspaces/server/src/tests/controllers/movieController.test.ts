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
    process.env.POSTGRES_USER = "test";
    process.env.POSTGRES_HOST = "localhost";
    process.env.POSTGRES_DB_NAME = "movies";
    process.env.POSTGRES_PASSWORD = "test";
    process.env.POSTGRES_PORT = "5432";
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
});
