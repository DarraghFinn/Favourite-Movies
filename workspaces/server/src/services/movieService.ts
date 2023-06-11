import { Movie } from "@scribbr-assessment-full-stack/common/src";
import { MovieRepository } from "../repository/movieRepository";

export class MovieService {
  private movieRepository: MovieRepository;

  constructor() {
    this.movieRepository = new MovieRepository();
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
      const rows = await this.movieRepository.addNewMovie(movie);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async updateMovie(id: string) {
    try {
      const rows = await this.movieRepository.updateMovie(id);
      return rows;
    } catch (error) {
      throw error;
    }
  }
}
