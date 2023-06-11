import { Movie } from "@scribbr-assessment-full-stack/common/src";
import Database from "../config/db";

export class MovieRepository {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async fetchMovies() {
    try {
      const result = await this.db.query("SELECT * FROM movies");
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  async addNewMovie(movie: Movie) {
    try {
      const query = "INSERT INTO movies (id) VALUES ($1) RETURNING *";
      await this.db.query(query, [movie.imdbID]);
    } catch (error) {
      throw error;
    }
  }

  async upvoteMovie(id: string, upvotes: number) {
    try {
      const query = "UPDATE movies SET upvotes = $1 WHERE id = $2 RETURNING *";
      await this.db.query(query, [id, upvotes]);
    } catch (error) {
      throw error;
    }
  }
}
