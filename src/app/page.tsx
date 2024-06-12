'use client';
import { useState, FormEvent } from 'react';
import { searchMovies } from '../lib/tmbd';
import MovieCard from '../components/MovieCard';
import { Movie } from '@/models/movie';

export default function Home() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [ownedMovies, setOwnedMovies] = useState<Set<number>>(new Set());

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();
    const data = await searchMovies(query, page);
    setMovies(data.results);
    setTotalResults(data.total_results);
  };

  const handlePageChange = async (newPage: number) => {
    setPage(newPage);
    const data = await searchMovies(query, newPage);
    setMovies(data.results);
  };

  const toggleOwnership = (movieId: number) => {
    setOwnedMovies((prevOwnedMovies) => {
      const updatedOwnedMovies = new Set(prevOwnedMovies);
      if (updatedOwnedMovies.has(movieId)) {
        updatedOwnedMovies.delete(movieId);
      } else {
        updatedOwnedMovies.add(movieId);
      }
      return updatedOwnedMovies;
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-8 font-sans">
      <h1 className="text-3xl font-bold text-center mb-8">Movie Search</h1>
      <form onSubmit={handleSearch} className="flex justify-center mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          className="text-black w-72 p-2 border border-gray-300 rounded mr-4"
        />
        <button type="submit" className="p-2 bg-red-600 text-white rounded hover:bg-red-800">Search</button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.slice(0, 10).map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isOwned={ownedMovies.has(movie.id)}
            toggleOwnership={toggleOwnership}
          />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          className="p-2 bg-gray-300 text-black rounded mr-4 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={movies.length < 10}
          className="p-2 bg-gray-300 text-black rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <p className="text-center mt-4 text-white">Total Results: {totalResults}</p>
    </div>
  );
}