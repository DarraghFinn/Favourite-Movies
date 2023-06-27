import {
  OMDbMovie,
  PersistedMovie,
} from "@scribbr-assessment-full-stack/common/src";
import Database from "../config/db";
import { queries } from "./movieQueries";

export class MovieRepository {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async fetchMovies() {
    try {
      const result = await this.db.query(queries.fetchAllMovies);
      return result.rows as PersistedMovie[];
    } catch (error) {
      throw error;
    }
  }

  async addNewMovie(movie: OMDbMovie) {
    try {
      await this.db.query(queries.addNewMovie, [
        movie.imdbID,
        movie.Title,
        movie.Year,
        movie.Type,
        movie.Poster,
        movie.upvotes,
      ]);
    } catch (error) {
      throw error;
    }
  }

  async upvoteMovie(id: string, upvotes: number) {
    try {
      await this.db.query(queries.upvoteMovie, [upvotes, id]);
    } catch (error) {
      throw error;
    }
  }
}
