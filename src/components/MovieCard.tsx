import { useState } from 'react';
import Image from 'next/image';
import { Movie } from '@/models/movie';

type MovieCardProps = {
  movie: Movie;
  isOwned: boolean;
  toggleOwnership: (movieId: number) => void;
}

export default function MovieCard({ movie, isOwned, toggleOwnership }: MovieCardProps) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative bg-gray-800 text-white rounded overflow-hidden shadow-lg"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative w-full h-96">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          fill
          className="rounded"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw, (max-width: 1280px) 20vw, 16vw"
        />
      </div>
      {hover && (
        <div className="absolute inset-0 bg-black bg-opacity-75 p-4 flex flex-col justify-start items-center overflow-y-auto">
          <h2 className="text-lg font-semibold mb-2">{movie.title}</h2>
          <p className="text-sm text-gray-400 mb-2">Release Date: {movie.release_date}</p>
          <p className="text-sm">{movie.overview}</p>
          <button
            onClick={() => toggleOwnership(movie.id)}
            className={`mt-4 ${isOwned ? 'text-green-500' : 'text-red-500'} hover:underline`}
          >
            {isOwned ? 'Unmark as Owned' : 'Mark as Owned'}
          </button>
        </div>
      )}
    </div>
  );
};