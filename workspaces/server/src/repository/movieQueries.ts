export const queries = {
  createMovieTable: `CREATE TABLE IF NOT EXISTS movies (
        id VARCHAR(10) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        year INTEGER,
        type VARCHAR(255),
        poster TEXT,
        upvotes INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
  fetchAllMovies: "SELECT * FROM movies",
  addNewMovie: `INSERT INTO movies (id, title, year, type, poster, upvotes)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;`,
  upvoteMovie: "UPDATE movies SET upvotes = $1 WHERE id = $2",
};
