export const toggleMovieOwnership = (
  ownedMovies: Set<number>,
  movieId: number
): Set<number> => {
  const updatedOwnedMovies = new Set(ownedMovies);
  if (updatedOwnedMovies.has(movieId)) {
    updatedOwnedMovies.delete(movieId);
  } else {
    updatedOwnedMovies.add(movieId);
  }
  return updatedOwnedMovies;
};
