import { Movie } from "@scribbr-assessment-full-stack/common/src";
import Database from "../config/db";
import { MovieRepository } from "../repository/movieRepository";

export class MovieService {
  private movieRepository: MovieRepository;
  private db: Database;

  constructor() {
    this.db = new Database();
    this.movieRepository = new MovieRepository(this.db);
  }

  async getMovies() {
    try {
      const rows = await this.movieRepository.fetchMovies();
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async addMovie(movie: Movie) {
    try {
      await this.movieRepository.addNewMovie(movie);
    } catch (error) {
      throw error;
    }
  }

  async upvoteMovie(id: string, upvotes: string) {
    try {
      await this.movieRepository.upvoteMovie(id, Number(upvotes));
    } catch (error) {
      throw error;
    }
  }
}
