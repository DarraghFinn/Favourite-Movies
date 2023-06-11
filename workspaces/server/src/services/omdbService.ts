export class OMDbService {
  async getMoviesByTitle(title: string) {
    try {
      const url = `${process.env.OMDB_API_URL}/?apiKey=${process.env.API_KEY}&s=${title}&type=movie`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
}
