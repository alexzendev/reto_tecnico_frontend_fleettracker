import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export const Pagination = ({ page, totalPages, setPage }: PaginationProps) => {
  return (
    <div className="mt-5">
      <p className="sm:text-xs text-1.5xs font-medium mb-2">
        Página {page} de {totalPages}
      </p>

      <div className="flex gap-1">
        <button
          onClick={() => setPage(1)}
          disabled={page === 1}
          className="flex items-center gap-0.5 sm:p-2 p-1 rounded-md bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 disabled:opacity-40 disabled:cursor-default cursor-pointer"
        >
          <ChevronsLeft className="size-3.5" />
        </button>
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
          className="flex items-center gap-0.5 sm:p-2 p-1 rounded-md bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 disabled:opacity-40 disabled:cursor-default cursor-pointer"
        >
          <ChevronLeft className="sm:size-3.5 size-3" />
          <span className="text-2xs uppercase font-semibold sm:flex hidden">
            Anterior
          </span>
        </button>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages}
          className="flex items-center gap-0.5 sm:p-2 p-1 rounded-md bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 disabled:opacity-40 disabled:cursor-default cursor-pointer"
        >
          <span className="text-2xs uppercase font-semibold sm:flex hidden">
            Siguiente
          </span>
          <ChevronRight className="sm:size-3.5 size-3" />
        </button>
        <button
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
          className="flex items-center gap-0.5 sm:p-2 p-1 rounded-md bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 disabled:opacity-40 disabled:cursor-default cursor-pointer"
        >
          <ChevronsRight className="size-3.5" />
        </button>
      </div>
    </div>
  );
};
