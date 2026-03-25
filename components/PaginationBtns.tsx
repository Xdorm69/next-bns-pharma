"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { useQueryState, parseAsInteger } from "nuqs";

type Props = {
  totalPages: number;
};

export default function PaginationBtns({ totalPages }: Props) {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => goToPage(page - 1)}
            className={page === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .slice(Math.max(0, page - 2), Math.min(totalPages, page + 1))
          .map((p) => (
            <PaginationItem key={p}>
              <PaginationLink isActive={p === page} onClick={() => goToPage(p)}>
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}

        {/* Ellipsis */}
        {page + 2 < totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            onClick={() => goToPage(page + 1)}
            className={
              page === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
