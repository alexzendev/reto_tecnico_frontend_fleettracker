import { useGetVehicleById } from "@/modules/vehicles/vehicle-hooks";
import { Header } from "@/shared/components/elements/header";
import { ErrorState } from "@/shared/components/elements/states";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";

export default function DetailsVehicle() {
  const { id } = useParams<{ id: string }>();
  const { data: vehicle, isLoading, isError, error } = useGetVehicleById(id!);

  console.log(isError);
  console.log(error);

  if (isLoading) {
    return (
      <div className="min-h-svh flex flex-col items-center justify-center">
        <Loader2 className="animate-spin lg:size-12 sm:size-10 size-8 text-primary" />
        <p className="sm:text-sm text-xs mt-2">Cargando vehículo...</p>
      </div>
    );
  }

  if (isError || !vehicle) {
    return (
      <div className="min-h-svh flex flex-col items-center justify-center">
        <div>
          <ErrorState message="Hubo un problema al cargar los detalles del vehículo" description="Intentalo de nuevo más tarde o vuelve a la lista de vehículos" to="/vehicles" labelto="Ir a vehículos" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-svh flex flex-col items-center justify-center">
      <Header
        title={`Detalles del vehículo ${vehicle?.brand} - ${vehicle?.model}`}
      />
    </div>
  );
}
