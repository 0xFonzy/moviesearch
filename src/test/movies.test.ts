import { toggleMovieOwnership } from "../lib/movies";

describe("toggleMovieOwnership", () => {
  it("should add a movie to the ownedMovies set if it is not already owned", () => {
    const initialSet = new Set<number>();
    const movieId = 1;
    const updatedSet = toggleMovieOwnership(initialSet, movieId);

    expect(updatedSet.has(movieId)).toBe(true);
    expect(updatedSet.size).toBe(1);
  });

  it("should remove a movie from the ownedMovies set if it is already owned", () => {
    const initialSet = new Set<number>([1]);
    const movieId = 1;
    const updatedSet = toggleMovieOwnership(initialSet, movieId);

    expect(updatedSet.has(movieId)).toBe(false);
    expect(updatedSet.size).toBe(0);
  });

  it("should not affect other movies in the ownedMovies set", () => {
    const initialSet = new Set<number>([1, 2, 3]);
    const movieId = 2;
    const updatedSet = toggleMovieOwnership(initialSet, movieId);

    expect(updatedSet.has(1)).toBe(true);
    expect(updatedSet.has(3)).toBe(true);
    expect(updatedSet.has(2)).toBe(false);
    expect(updatedSet.size).toBe(2);
  });

  it("should handle toggling multiple times correctly", () => {
    const initialSet = new Set<number>();
    let updatedSet = toggleMovieOwnership(initialSet, 1);
    updatedSet = toggleMovieOwnership(updatedSet, 1); // Toggling back to remove

    expect(updatedSet.has(1)).toBe(false);
    expect(updatedSet.size).toBe(0);
  });
});
