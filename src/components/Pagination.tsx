import { useContext } from "react";
import { SearchContext } from "@/context/SearchContext";
import { Button, Chip, Pagination as Pages } from "@nextui-org/react";

export default function Pagination() {
  const { page, totalPages, totalResults, handlePageChange } = useContext(SearchContext);

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <Chip>{totalResults} results</Chip>
      <Pages className='' total={totalPages} color="primary" showControls page={page} onChange={handlePageChange}>
        <div className="flex gap-2">
          <Button size="sm" variant="flat" color='secondary' onPress={() => handlePageChange(page - 1)} disabled={page <= 1}>
            Previous
          </Button>
          <Button size="sm" variant="flat" color='secondary' onPress={() => handlePageChange(page + 1)} disabled={page >= totalPages}>
            Next
          </Button>
        </div>
      </Pages>
    </div>
  )

};