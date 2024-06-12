'use client';
import { createContext, useState, ReactNode, FC } from 'react';
import { searchMovies } from '../lib/tmbd';
import { Movie, SearchMoviesResponse } from '@/models/movie';

type SearchContextProps = {
  query: string;
  movies: Movie[];
  page: number;
  totalPages: number;
  totalResults: number;
  searchError: Error | null,
  setQuery: (query: string) => void;
  setMovies: (movies: Movie[]) => void;
  setPage: (page: number) => void;
  setTotalResults: (totalResults: number) => void;
  handleSearch: (query: string) => void;
  handlePageChange: (newPage: number) => void;
};

export const SearchContext = createContext<SearchContextProps>({
  query: '',
  movies: [],
  page: 1,
  totalPages: 0,
  totalResults: 0,
  searchError: null,
  setQuery: () => { },
  setMovies: () => { },
  setPage: () => { },
  setTotalResults: () => { },
  handleSearch: () => { },
  handlePageChange: () => { },
});

export const SearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [query, setQuery] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchError, setSearchError] = useState<Error | null>(null);

  const handleSearch = async (query: string) => {
    try {
      const data: SearchMoviesResponse = await searchMovies(query, 1);
      setMovies(data.results);
      setTotalResults(data.total_results);
      setTotalPages(data.total_pages);
      setQuery(query);
      setPage(1);
    } catch (error: any) {
      setSearchError(error);
    }
  };

  const handlePageChange = async (newPage: number) => {
    try {
      const data: SearchMoviesResponse = await searchMovies(query, newPage);
      setMovies(data.results);
      setPage(newPage);
    } catch (error: any) {
      setSearchError(error);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        query,
        movies,
        page,
        totalPages,
        totalResults,
        searchError,
        setQuery,
        setMovies,
        setPage,
        setTotalResults,
        handleSearch,
        handlePageChange,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};