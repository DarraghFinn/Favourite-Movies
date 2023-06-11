import { Movie } from "@scribbr-assessment-full-stack/common/src";
import { QueryResult } from "pg";
import Database from "../../config/db";
import { MovieRepository } from "../../repository/movieRepository";

describe("MovieRepository tests", () => {
  let db: Database;
  let movieRepository: MovieRepository;

  beforeAll(() => {
    process.env.POSTGRES_USER = "test";
    process.env.POSTGRES_HOST = "localhost";
    process.env.POSTGRES_DB_NAME = "movies";
    process.env.POSTGRES_PASSWORD = "test";
    process.env.POSTGRES_PORT = "5432";
  });

  beforeEach(() => {
    db = new Database();
    movieRepository = new MovieRepository(db);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchMovies", () => {
    it("should return all favourite movies from database", async () => {
      const expectedResult = [
        {
          Poster: "www.poster1.com",
          Title: "The Godfather",
          Type: "Thriller",
          Year: "1972",
          imdbID: "1-abc",
          upvotes: 1,
        },
        {
          Poster: "www.poster2.com",
          Title: "The Godfather Part II",
          Type: "Thriller",
          Year: "1974",
          imdbID: "12-abc",
          upvotes: 2,
        },
        {
          Poster: "www.poster3.com",
          Title: "The Godfather Part III",
          Type: "Thriller",
          Year: "1990",
          imdbID: "123-abc",
          upvotes: 3,
        },
      ];
      const mockResult: QueryResult<Movie> = {
        rows: expectedResult,
        rowCount: expectedResult.length,
        command: "SELECT",
        oid: null,
        fields: [],
      };
      const mockQuery = jest.spyOn(db, "query").mockResolvedValue(mockResult);

      const result = await movieRepository.fetchMovies();

      expect(mockQuery).toHaveBeenCalledWith("SELECT * FROM movies");
      expect(result).toEqual(expectedResult);
    });

    it("should throw an error if favourite movies fetch fails", async () => {
      const mockQueryError = new Error("Failed to get entries from db");
      const mockQuery = jest
        .spyOn(db, "query")
        .mockRejectedValue(mockQueryError);

      try {
        await movieRepository.fetchMovies();
      } catch (error) {
        expect(error).toEqual(mockQueryError);
      }

      expect(mockQuery).toHaveBeenCalledWith("SELECT * FROM movies");
    });
  });

  describe("addNewMovie", () => {
    it("should add new movie to database", async () => {
      const expectedRequest: Movie = {
        Poster: "www.poster1.com",
        Title: "The Godfather",
        Type: "Thriller",
        Year: "1972",
        imdbID: "1-abc",
      };
      const mockQuery = jest.spyOn(db, "query").mockResolvedValue(undefined);

      await movieRepository.addNewMovie(expectedRequest);

      expect(mockQuery).toHaveBeenCalledWith(
        "INSERT INTO movies (id) VALUES ($1) RETURNING *",
        ["1-abc"]
      );
    });

    it("should throw an error if add new movie to database fails", async () => {
      const expectedRequest: Movie = {
        Poster: "www.poster1.com",
        Title: "The Godfather",
        Type: "Thriller",
        Year: "1972",
        imdbID: "1-abc",
      };
      const mockQueryError = new Error("Failed to add entry to db");
      const mockQuery = jest
        .spyOn(db, "query")
        .mockRejectedValue(mockQueryError);

      try {
        await movieRepository.addNewMovie(expectedRequest);
      } catch (error) {
        expect(error).toEqual(mockQueryError);
      }
      expect(mockQuery).toHaveBeenCalledWith(
        "INSERT INTO movies (id) VALUES ($1) RETURNING *",
        ["1-abc"]
      );
    });
  });

  describe("upvoteMovie", () => {
    it("should upvote existing movie in database", async () => {
      const mockQuery = jest.spyOn(db, "query").mockResolvedValue(undefined);

      await movieRepository.upvoteMovie("1-abc", 2);

      expect(mockQuery).toHaveBeenCalledWith(
        "UPDATE movies SET upvotes = $1 WHERE id = $2 RETURNING *",
        ["1-abc", 2]
      );
    });

    it("should throw an error if upvote existing movie in database fails", async () => {
      const mockQueryError = new Error("Failed to update entry in db");
      const mockQuery = jest
        .spyOn(db, "query")
        .mockRejectedValue(mockQueryError);

      try {
        await movieRepository.upvoteMovie("1-abc", 2);
      } catch (error) {
        expect(error).toEqual(mockQueryError);
      }

      expect(mockQuery).toHaveBeenCalledWith(
        "UPDATE movies SET upvotes = $1 WHERE id = $2 RETURNING *",
        ["1-abc", 2]
      );
    });
  });
});
