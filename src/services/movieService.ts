import axios from "axios";
import type { Movie } from "../types/movie";

//описує об/єкт відповіді від API
export interface MoviesHttpResponse {
  results: Movie[];
}

const API_URL = "https://api.themoviedb.org/3/search/movie";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
// console.log("TOKEN:", TOKEN);

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<MoviesHttpResponse>(API_URL, {
    params: {
      query,
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return response.data.results;
};
