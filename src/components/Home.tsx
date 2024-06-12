'use client';
import { useContext, useState } from 'react';
import MovieCard from '@/components/MovieCard';
import { SearchContext } from '../context/SearchContext';
import Pagination from './Pagination';

export default function Home() {
  const { movies, totalResults, searchError } = useContext(SearchContext);
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

  if (searchError) return <div className="text-red-500 text-center">{searchError.message}</div>;

  return (
    <div className="flex flex-col justify-between max-w-full mx-auto p-8 font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {movies.slice(0, 10).map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isOwned={ownedMovies.has(movie.id)}
            toggleOwnership={toggleOwnership}
          />
        ))}
      </div>
      {totalResults !== 0 && <Pagination />}
    </div>
  );
}