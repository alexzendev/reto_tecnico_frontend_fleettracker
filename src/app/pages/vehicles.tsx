import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import { Header } from "@/shared/components/elements/header";
import { Link } from "react-router-dom";
import type { Vehicle, VehicleFilters } from "@/modules/vehicles/vehicle-types";
import { useGetVehicles } from "@/modules/vehicles/vehicle-hooks";
import { Input } from "@/shared/components/ui/input";
import { Select } from "@/shared/components/ui/select";
import { DATA_UI } from "@/shared/utils/data-ui";
import { List, Pencil, Plus, Trash2 } from "lucide-react";
import { Pagination } from "@/shared/components/elements/pagination";
import { ModalDeleteVehicle } from "@/modules/vehicles/components/modal-delete-vehicle";

const createColumns = (
  onDelete: (vehicle: Vehicle) => void,
): ColumnDef<Vehicle>[] => [
  { accessorKey: "plate", header: "Placa" },
  { accessorKey: "brand", header: "Marca" },
  { accessorKey: "model", header: "Modelo" },
  { accessorKey: "year", header: "Año" },
  { accessorKey: "color", header: "Color" },
  { accessorKey: "mileage", header: "Kilometraje" },
  { accessorKey: "status", header: "Estado" },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const vehicle = row.original;
      return (
        <div className="flex items-center justify-center gap-1">
          <Link
            to={`/vehicles/${vehicle.id}`}
            className="p-1.5 rounded text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            title="Ver detalles"
          >
            <List className="size-3.5" />
          </Link>
          <button
            className="p-1.5 rounded text-amber-600 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors"
            title="Editar"
          >
            <Pencil className="size-3.5" />
          </button>
          <button
            onClick={() => onDelete(vehicle)}
            className="p-1.5 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            title="Eliminar"
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>
      );
    },
  },
];

export default function Vehicles() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<VehicleFilters["status"] | "">("");
  const [page, setPage] = useState(1);
  const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);

  const { data, isLoading, isError } = useGetVehicles({
    q: search,
    status: status || undefined,
    page,
    limit: 10,
  });

  const vehicles = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

  const columns = useMemo(() => createColumns(setVehicleToDelete), []);

  const table = useReactTable({
    data: vehicles,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: totalPages,
  });

  const renderContent = () => {
    if (isLoading) {
      return <p className="text-center py-10 text-gray-500">Cargando...</p>;
    }

    if (isError) {
      return (
        <p className="text-center py-10 text-red-500">
          Error al cargar vehículos
        </p>
      );
    }

    return (
      <div>
        <table className="w-full rounded-sm border border-stone-200 dark:border-stone-700 overflow-x-auto">
          <thead className="bg-stone-200/50 dark:bg-stone-800">
            {table.getHeaderGroups().map((hg) => (
              <tr
                key={hg.id}
                className="border-b border-stone-200 dark:border-stone-700 divide-x divide-stone-200 dark:divide-stone-700"
              >
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="sm:py-2 py-1.5 sm:text-xs text-1.5xs text-stone-600 dark:text-stone-400"
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
                  No se encontraron vehículos
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-stone-200/30 dark:hover:bg-stone-700/30 divide-x divide-stone-200 dark:divide-stone-700 transition-colors duration-200"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="sm:py-2 py-1.5 text-center sm:text-xs text-1.5xs"
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
    );
  };

  return (
    <div>
      <Header title="Vehículos" />
      <div className="lg:p-4 p-2">
        <div className="sm:space-y-4 space-y-2">
          <div className="flex justify-end">
            <Link
              to="/vehicles/new"
              className="bg-primary hover:bg-secondary text-stone-100 px-4 py-2.5 rounded-full sm:text-1.5xs text-2xs uppercase font-semibold flex items-center justify-center gap-1 cursor-pointer transition-all duration-200 group"
            >
              <Plus className="size-3.5 shrink-0" />
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
                disabled={isLoading}
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
                options={DATA_UI.options_status_select}
                value={status}
                disabled={isLoading}
                onChange={(e) => {
                  setStatus(e.target.value as VehicleFilters["status"]);
                  setPage(1);
                }}
              />
            </div>
          </div>
        </div>

        {renderContent()}

        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>

      <ModalDeleteVehicle
        isOpen={!!vehicleToDelete}
        onClose={() => setVehicleToDelete(null)}
        vehicle={vehicleToDelete}
      />
    </div>
  );
}
