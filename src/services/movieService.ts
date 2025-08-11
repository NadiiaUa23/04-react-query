import axios from "axios";
import type { Movie } from "../types/movie";

//описує об/єкт відповіді від API
export interface MoviesHttpResponse {
  results: Movie[];
  total_pages: number;
}

const API_URL = "https://api.themoviedb.org/3/search/movie";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
// console.log("TOKEN:", TOKEN);

export const fetchMovies = async (
  query: string,
  page: number = 1
): Promise<MoviesHttpResponse> => {
  const response = await axios.get<MoviesHttpResponse, Error>(API_URL, {
    params: {
      query,
      page,
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return response.data;
};
