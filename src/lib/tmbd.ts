import { SearchMoviesResponse } from "@/models/movie";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const searchMovies = async (
  query: string,
  page = 1
): Promise<SearchMoviesResponse> => {
  const response = await axios.get<SearchMoviesResponse>(
    `${BASE_URL}/search/movie`,
    {
      params: {
        api_key: API_KEY,
        query,
        page,
      },
    }
  );
  return response.data;
};
