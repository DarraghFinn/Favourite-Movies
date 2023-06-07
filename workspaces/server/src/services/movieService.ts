import { Movie } from "@scribbr-assessment-full-stack/common/src";
import { Pool } from "pg";
import { addNewMovie, fetchMovies } from "../repository/movieRepository";

const API_KEY = process.env.API_KEY;
const OMDB_API_URL = process.env.OMDB_API_URL;

export const getMoviesByTitle = async (title: string) => {
  try {
    const url = `${OMDB_API_URL}/?apiKey=${API_KEY}&s=${title}&type=movie`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMovies = async (pool: Pool) => {
  try {
    const rows = await fetchMovies(pool);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addMovie = async (pool: Pool, request: Movie) => {
  try {
    const rows = await addNewMovie(pool, request);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateMovie = async (pool: Pool, id: string) => {
  try {
    const rows = await updateMovie(pool, id);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
