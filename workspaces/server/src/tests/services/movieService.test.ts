import { MovieService } from "../../services/movieService";
import { OMDbService } from "../../services/omdbService";
import { fakeFetchErrorResponse, fakeFetchSuccessResponse } from "../helpers";

describe("MovieService tests", () => {
  let movieService: MovieService;
  let omdbService: OMDbService;

  beforeEach(() => {
    movieService = new MovieService();
    omdbService = new OMDbService();
  });

  describe("getMoviesByTitle tests", () => {
    it("should get a movie(s) based on title entered", async () => {
      const response = {
        Search: [
          {
            Poster: "www.poster1.com",
            Title: "The Godfather",
            Type: "Thriller",
            Year: "1972",
            imdbID: "1-abc",
          },
          {
            Poster: "www.poster2.com",
            Title: "The Godfather Part II",
            Type: "Thriller",
            Year: "1974",
            imdbID: "12-abc",
          },
          {
            Poster: "www.poster3.com",
            Title: "The Godfather Part III",
            Type: "Thriller",
            Year: "1990",
            imdbID: "123-abc",
          },
        ],
        totalResults: "3",
        Response: "True",
      };
      fakeFetchSuccessResponse(response);

      const result = await omdbService.getMoviesByTitle("The Godfather");
      expect(result.response.Response).toBe("True");
      expect(result.response.totalResults).toBe("3");
      expect(result.response.Search.length).toBe(3);
    });

    it("should fail to find a movie", async () => {
      const response = { error: "Movie not found" };
      fakeFetchErrorResponse(response);

      try {
        await omdbService.getMoviesByTitle("zyx");
      } catch (error) {
        expect(error.response.error).toBe("Movie not found");
      }
    });

    it("should fail to find a movie because of too many results", async () => {
      const response = { error: "Too many results" };
      fakeFetchErrorResponse(response);

      try {
        await omdbService.getMoviesByTitle("z");
      } catch (error) {
        expect(error.response.error).toBe("Too many results");
      }
    });
  });
});
