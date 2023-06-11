import { Movie } from "@scribbr-assessment-full-stack/common/src";

const headers = { "Content-Type": "application/json" };

export const fetchMovieBySearch = async (title: string) => {
  const response = await fetch(`/api/movies/movie/${title}`);
  console.log(response);
  return await response.json();
};

export const fetchAllFavouriteMovies = async () => {
  const response = await fetch("/api/movies/favourites");
  return await response.json();
};

export const addNewFavouriteMovie = async (movie: Movie) => {
  await fetch("/api/movies/favourites", {
    method: "POST",
    headers,
    body: JSON.stringify({ ...movie, upvotes: 1 }),
  });
};

export const upvoteFavouriteMovie = async (movie: Movie) => {
  await fetch(`/api/movies/favourites/${movie.imdbID}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ id: movie.imdbID, upvotes: movie }),
  });
};
