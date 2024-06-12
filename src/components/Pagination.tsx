import { useContext } from "react";
import { SearchContext } from "@/context/SearchContext";

export default function Pagination() {
  const { movies, page, totalResults, handlePageChange } = useContext(SearchContext);

  return (
    <div>
      <div className="flex justify-center p-8">
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
  )

};