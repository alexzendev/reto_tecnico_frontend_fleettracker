import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
  type CellContext,
} from "@tanstack/react-table";
import { Header } from "@/shared/components/elements/header";
import type { Vehicle, VehicleFilters } from "@/modules/vehicles/vehicle-types";
import { useGetVehicles } from "@/modules/vehicles/vehicle-hooks";
import { Input } from "@/shared/components/ui/input";
import { Select } from "@/shared/components/ui/select";
import { DATA_UI } from "@/shared/utils/data-ui";
import { Pagination } from "@/shared/components/elements/pagination";
import { EmptyState, ErrorState } from "@/shared/components/elements/states";
import { Highlight } from "@/shared/components/ui/highlight";
import { VehiclesTableSkeleton } from "@/shared/components/elements/skeletons";

interface TableMeta {
  search: string;
}

function HighlightCell({
  getValue,
  table,
}: Readonly<CellContext<Vehicle, unknown>>) {
  const { search } = table.options.meta as TableMeta;
  return <Highlight query={search} text={getValue() as string} />;
}

const columns: ColumnDef<Vehicle>[] = [
  {
    accessorKey: "plate",
    header: "Placa",
    cell: HighlightCell,
  },
  {
    accessorKey: "brand",
    header: "Marca",
    cell: HighlightCell,
  },
  {
    accessorKey: "model",
    header: "Modelo",
    cell: HighlightCell,
  },
  {
    accessorKey: "year",
    header: "Año",
  },
  {
    accessorKey: "status",
    header: "Estado",
  },
];

export default function Vehicles() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<VehicleFilters["status"] | "">("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useGetVehicles({
    q: search,
    status: status || undefined,
    page,
    limit: limit,
  });

  const vehicles = useMemo(() => {
    if (!search.trim()) return data?.data ?? [];
    const lower = search.toLowerCase();
    return (data?.data ?? []).filter(
      (v) =>
        v.plate.toLowerCase().includes(lower) ||
        v.brand.toLowerCase().includes(lower) ||
        v.model.toLowerCase().includes(lower),
    );
  }, [data?.data, search]);

  const totalPages = data?.totalPages ?? 1;

  const table = useReactTable({
    data: vehicles,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: totalPages,
    meta: { search } satisfies TableMeta,
  });

  const renderContent = () => {
    if (isLoading) {
      return (
        <VehiclesTableSkeleton columnCount={columns.length} rows={limit} />
      );
    }

    if (isError) {
      return (
        <ErrorState
          message="Hubo un problema al cargar los vehículos"
          description="Intentalo de nuevo más tarde o recarga la página. Si el problema persiste,
      contacta al soporte técnico."
        />
      );
    }

    return (
      <div>
        <p className="mb-2 sm:text-xs text-1.5xs">
          <span className="font-semibold">Total:</span> {data?.total ?? 0}{" "}
          vehículo
          {data?.total === 1 ? "" : "s"}
        </p>
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-max rounded-md border border-stone-200 dark:border-stone-700">
            <thead className="bg-stone-200/70 dark:bg-stone-800/70">
              {table.getHeaderGroups().map((hg) => (
                <tr
                  key={hg.id}
                  className="border-b border-stone-200 dark:border-stone-700 divide-x divide-stone-200 dark:divide-stone-700"
                >
                  {hg.headers.map((header) => (
                    <th
                      key={header.id}
                      className="sm:py-2 py-1.5 px-2 sm:text-xs text-1.5xs text-stone-600 dark:text-stone-400"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-700">
              {vehicles.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-5">
                    <EmptyState
                      message="No se encontraron vehículos"
                      description="No se encontraron resultados."
                    />
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => navigate(`/vehicles/${row.original.id}`)}
                    className="hover:bg-stone-200/40 dark:hover:bg-stone-800/40 divide-x divide-stone-200 dark:divide-stone-700 transition-colors duration-200 cursor-pointer"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="sm:py-2 py-1.5 px-2 text-center sm:text-xs text-1.5xs"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    );
  };

  return (
    <div className="min-h-svh flex flex-col">
      <Header title="Vehículos" />
      <div className="flex-1 flex flex-col">
        <div className="lg:p-4 p-2 sm:space-y-4 space-y-2 border-b border-stone-200 dark:border-stone-700">
          <div className="flex justify-end">
            <Link
              to="/vehicles/new"
              className="bg-primary hover:bg-secondary text-stone-100 px-4 py-2.5 rounded-full sm:text-1.5xs text-2xs uppercase font-semibold flex items-center justify-center gap-1 cursor-pointer transition-all duration-200 group"
            >
              Nuevo vehículo
            </Link>
          </div>
          <div className="flex sm:flex-row flex-col sm:gap-4 gap-2">
            <div className="sm:max-w-xl w-full">
              <Input
                type="text"
                label="Buscar por:"
                placeholder="Placa, marca, modelo..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>
            <div className="sm:max-w-56 w-full">
              <Select
                label="Filtrar por:"
                placeholder="Estado del vehículo"
                options={[
                  { value: "", label: "Todos" },
                  ...DATA_UI.options_status_select,
                ]}
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value as VehicleFilters["status"]);
                  setPage(1);
                }}
              />
            </div>
          </div>
        </div>

        <div className="lg:p-4 p-2 flex flex-col flex-1">{renderContent()}</div>
      </div>
    </div>
  );
}
