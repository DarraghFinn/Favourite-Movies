import { Movie } from "@scribbr-assessment-full-stack/common/src";
import { Client } from "pg";
import client from "../config/dbSetup";

export class MovieRepository {
  private db: Client;

  constructor() {
    this.db = client;
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
      const result = await this.db.query("SELECT * FROM movies");
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  async updateMovie(id: string) {
    try {
      const result = await this.db.query("SELECT * FROM movies");
      return result.rows;
    } catch (error) {
      throw error;
    }
  }
}
