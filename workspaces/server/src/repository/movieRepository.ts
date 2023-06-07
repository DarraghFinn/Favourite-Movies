import { Movie } from "@scribbr-assessment-full-stack/common/src";
import { Pool } from "pg";

export const fetchMovies = async (pool: Pool) => {
  try {
    const result = await pool.query("SELECT * FROM movies");
    return result.rows;
  } catch (error) {
    console.error("Failed to fetch movies from DB");
    throw error;
  }
};

export const addNewMovie = async (pool: Pool, movie: Movie) => {
  try {
    const result = await pool.query("SELECT * FROM movies");
    return result.rows;
  } catch (error) {
    console.error("Failed to add movie to DB");
    throw error;
  }
};

export const updateMovie = async (pool: Pool, id: string) => {
  try {
    const result = await pool.query("SELECT * FROM movies");
    return result.rows;
  } catch (error) {
    console.error("Failed to update movie in DB");
    throw error;
  }
};
