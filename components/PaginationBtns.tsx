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
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ shallow: false }),
  );

  if (totalPages <= 1) return null;

  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  // Build visible page numbers with ellipsis markers
  const getPageNumbers = (): (number | "ellipsis")[] => {
    // Show all pages if 7 or fewer
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "ellipsis")[] = [1];

    // Left ellipsis needed when current page is far from start
    if (page > 3) pages.push("ellipsis");

    // Window of pages around current
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    // Right ellipsis needed when current page is far from end
    if (page < totalPages - 2) pages.push("ellipsis");

    pages.push(totalPages);

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => goToPage(page - 1)}
            className={
              page === 1
                ? "pointer-events-none opacity-50 cursor-default"
                : "cursor-pointer"
            }
          />
        </PaginationItem>

        {/* Page numbers + ellipses */}
        {pageNumbers.map((p, i) =>
          p === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink
                isActive={p === page}
                onClick={() => goToPage(p)}
                className="cursor-pointer"
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            onClick={() => goToPage(page + 1)}
            className={
              page === totalPages
                ? "pointer-events-none opacity-50 cursor-default"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
