import {
  FavouriteMovies,
  OMDbMovie,
  PersistedMovie,
} from "@scribbr-assessment-full-stack/common/src";
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
      const sortedByUpvotes = rows.sort(
        (a: PersistedMovie, b: PersistedMovie) => b.upvotes - a.upvotes
      );
      return sortedByUpvotes.reduce((obj, movie) => {
        const item = {
          Poster: movie.poster,
          Title: movie.title,
          Type: movie.type,
          Year: movie.year,
          imdbID: movie.id,
          upvotes: movie.upvotes,
        };
        obj[movie.id] = item;
        return obj as FavouriteMovies;
      }, {} as { [key: string]: OMDbMovie });
    } catch (error) {
      throw error;
    }
  }

  async addMovie(movie: OMDbMovie) {
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
