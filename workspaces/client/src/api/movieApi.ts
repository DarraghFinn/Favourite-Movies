import {
  FavouriteMovies,
  OMDbMovie,
} from "@scribbr-assessment-full-stack/common/src";

const headers = { "Content-Type": "application/json" };

export const fetchMovieBySearch = async (title: string) => {
  const response = await fetch(`/api/movies/movie/${title}`);
  return (await response.json()) as OMDbMovie[];
};

export const fetchAllFavouriteMovies = async () => {
  try {
    const response = await fetch("/api/movies/favourites");
    return (await response.json()) as FavouriteMovies;
  } catch (error) {
    throw error;
  }
};

export const addNewFavouriteMovie = async (movie: OMDbMovie) => {
  try {
    const response = await fetch("/api/movies/favourites", {
      method: "POST",
      headers,
      body: JSON.stringify(movie),
    });
    await response.json();
  } catch (error) {
    throw error;
  }
};

export const upvoteFavouriteMovie = async (movie: OMDbMovie) => {
  try {
    const response = await fetch(`/api/movies/favourites/${movie.imdbID}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ id: movie.imdbID, upvotes: movie.upvotes }),
    });
    if (response.ok) {
      return;
    }
  } catch (error) {
    throw error;
  }
};
