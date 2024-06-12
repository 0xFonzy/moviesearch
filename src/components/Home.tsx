'use client';
import { useContext, useState } from 'react';
import MovieCard from '@/components/MovieCard';
import { SearchContext } from '../context/SearchContext';

export default function Home() {
  const { movies, page, totalResults, handlePageChange } = useContext(SearchContext);
  const [ownedMovies, setOwnedMovies] = useState<Set<number>>(new Set());

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