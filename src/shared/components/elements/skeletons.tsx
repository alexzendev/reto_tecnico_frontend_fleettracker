const CELL_WIDTHS: Record<number, string> = {
  0: "w-20 mx-auto",
  1: "w-16 mx-auto",
  2: "w-24 mx-auto",
  3: "w-10 mx-auto",
};

const getCellWidth = (colIdx: number): string =>
  CELL_WIDTHS[colIdx] ?? "w-14 mx-auto";

const Cell = ({ className = "" }: { className?: string }) => (
  <div
    className={`h-3 rounded bg-stone-200 dark:bg-stone-700 animate-pulse ${className}`}
  />
);

const PAGINATION_KEYS = ["pg-first", "pg-prev", "pg-next", "pg-last"];

const PaginationSkeleton = () => (
  <div className="mt-5">
    <div className="h-3 w-24 rounded bg-stone-200 dark:bg-stone-700 animate-pulse mb-2" />
    <div className="flex gap-1">
      {PAGINATION_KEYS.map((key) => (
        <div
          key={key}
          className="sm:p-2 p-1 rounded-md bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700"
        >
          <div className="size-3.5 rounded bg-stone-200 dark:bg-stone-700 animate-pulse" />
        </div>
      ))}
    </div>
  </div>
);

export const VehiclesTableSkeleton = ({
  columnCount = 5,
  rows = 10,
}: {
  columnCount: number;
  rows?: number;
}) => {
  const colKeys = Array.from({ length: columnCount }, (_, i) => `th-${i}`);
  const rowKeys = Array.from({ length: rows }, (_, i) => `tr-${i}`);
  return (
    <div>
      <div className="h-3 w-28 rounded bg-stone-200 dark:bg-stone-700 animate-pulse mb-2" />

      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-max rounded-sm border border-stone-200 dark:border-stone-700">
          <thead className="bg-stone-200/50 dark:bg-stone-800">
            <tr className="border-b border-stone-200 dark:border-stone-700 divide-x divide-stone-200 dark:divide-stone-700">
              {colKeys.map((key) => (
                <th key={key} className="sm:py-2 py-1.5 px-2">
                  <div className="h-3 w-12 mx-auto rounded bg-stone-300 dark:bg-stone-600 animate-pulse" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 dark:divide-stone-700">
            {rowKeys.map((rowKey) => (
              <tr
                key={rowKey}
                className="divide-x divide-stone-200 dark:divide-stone-700"
              >
                {colKeys.map((colKey, colIdx) => (
                  <td key={colKey} className="sm:py-2 py-1.5 px-2 text-center">
                    <Cell className={getCellWidth(colIdx)} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PaginationSkeleton />
    </div>
  );
};
