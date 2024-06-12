"use client";
import { useState, FormEvent } from 'react';
import { searchMovies } from '../lib/tmbd';
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
    <div className="max-w-4xl mx-auto p-8 font-sans">
      <h1 className="text-2xl font-bold text-center mb-8">Movie Search</h1>
      <form onSubmit={handleSearch} className="flex justify-center mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          className="w-72 p-2 border border-gray-300 rounded mr-4"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700">Search</button>
      </form>
      <ul className="list-none p-0">
        {movies.slice(0, 10).map((movie) => (
          <li key={movie.id} className="border-b border-gray-300 py-4">
            <h2 className="text-xl font-semibold">{movie.title}</h2>
            <p className="text-gray-600">Release Date: {movie.release_date}</p>
            <p className="mt-2">{movie.overview}</p>
            <button onClick={() => toggleOwnership(movie.id)} className={`mt-2 ${ownedMovies.has(movie.id) ? 'text-green-500' : 'text-blue-500'} hover:underline`}>
              {ownedMovies.has(movie.id) ? 'Unmark as Owned' : 'Mark as Owned'}
            </button>
          </li>
        ))}
      </ul>
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
      <p className="text-center mt-4">Total Results: {totalResults}</p>
    </div>
  );
}