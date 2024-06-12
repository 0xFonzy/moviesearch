export type Movie = {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string;
};

export type SearchMoviesResponse = {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
};
