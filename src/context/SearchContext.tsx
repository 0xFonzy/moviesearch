'use client';
import { createContext, useState, ReactNode, FC, FormEvent } from 'react';
import { searchMovies } from '../lib/tmbd';
import { Movie } from '@/models/movie';

type SearchContextProps = {
  query: string;
  movies: Movie[];
  page: number;
  totalResults: number;
  setQuery: (query: string) => void;
  setMovies: (movies: Movie[]) => void;
  setPage: (page: number) => void;
  setTotalResults: (totalResults: number) => void;
  handleSearch: (event: FormEvent) => void;
  handlePageChange: (newPage: number) => void;
}

export const SearchContext = createContext<SearchContextProps>({
  query: '',
  movies: [],
  page: 1,
  totalResults: 0,
  setQuery: () => { },
  setMovies: () => { },
  setPage: () => { },
  setTotalResults: () => { },
  handleSearch: () => { },
  handlePageChange: () => { },
});

export const SearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();
    const data = await searchMovies(query, 1);
    setMovies(data.results);
    setTotalResults(data.total_results);
  };

  const handlePageChange = async (newPage: number) => {
    setPage(newPage);
    const data = await searchMovies(query, newPage);
    setMovies(data.results);
  };

  return (
    <SearchContext.Provider value={{ query, movies, page, totalResults, setQuery, setMovies, setPage, setTotalResults, handleSearch, handlePageChange }}>
      {children}
    </SearchContext.Provider>
  );
};