import { DetailsCard } from "@/modules/vehicles/components/details-card";
import { ModalDeleteVehicle } from "@/modules/vehicles/components/modal-delete-vehicle";
import { ModalEditVehicle } from "@/modules/vehicles/components/modal-edit-vehicle";
import { useGetVehicleById } from "@/modules/vehicles/vehicle-hooks";
import { Header } from "@/shared/components/elements/header";
import { ErrorState } from "@/shared/components/elements/states";
import { Button } from "@/shared/components/ui/button";
import {
  Calendar,
  CarFront,
  FingerprintPattern,
  Gauge,
  IdCard,
  Info,
  Loader2,
  Palette,
  Settings2,
} from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function DetailsVehicle() {
  const { id } = useParams<{ id: string }>();
  const { data: vehicle, isLoading, isError } = useGetVehicleById(id!);

  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

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
          <ErrorState
            message="Hubo un problema al cargar los detalles del vehículo"
            description="Intentalo de nuevo más tarde o vuelve a la lista de vehículos"
            to="/vehicles"
            labelto="Ir a vehículos"
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-svh flex flex-col">
        <Header title="Detalles del vehículo " />

        <div className="lg:p-4 p-2">
          <div className="flex justify-end gap-2">
            <Button onClick={() => setIsModalEditOpen(true)}>
              Editar vehículo
            </Button>
            <Button
              onClick={() => setIsModalDeleteOpen(true)}
              variant="outline"
            >
              Eliminar vehículo
            </Button>
          </div>

          <div className="mt-10">
            <div className="rounded-md border border-stone-200 dark:border-stone-700 lg:p-4 p-2">
              <div className="flex sm:gap-2 gap-1 items-center">
                <CarFront className="size-6" />
                <h2 className="font-semibold lg:text-xl sm:text-lg text-base tracking-tighter">
                  {vehicle?.brand} - {vehicle?.model}
                </h2>
              </div>
              <div className="flex items-center sm:gap-3 gap-2 mt-1.5">
                <div className="flex items-center sm:gap-1 gap-0.5">
                  <Calendar className="size-3" />
                  <h3 className="lg:text-xs text-1.5xs">{vehicle?.year}</h3>
                </div>
                <div className="flex items-center sm:gap-1 gap-0.5">
                  <Palette className="size-3" />
                  <h3 className="lg:text-xs text-1.5xs">{vehicle?.color}</h3>
                </div>
                <div className="flex items-center sm:gap-1 gap-0.5">
                  <IdCard className="size-3" />
                  <h3 className="lg:text-xs text-1.5xs">{vehicle?.plate}</h3>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <DetailsCard
                title="Información general"
                icon={Info}
                fields={[
                  { label: "Placa", value: vehicle?.plate },
                  { label: "Estado", value: vehicle?.status },
                  { label: "Tipo de vehículo", value: vehicle?.type },
                  { label: "Departamento", value: vehicle?.department },
                  {
                    label: "Conductor asignado",
                    value: vehicle?.driver || "N/A",
                  },
                ]}
              />
              <DetailsCard
                title="Especificaciones del vehículo"
                icon={Settings2}
                fields={[
                  { label: "Marca", value: vehicle?.brand },
                  { label: "Modelo", value: vehicle?.model },
                  { label: "Año", value: vehicle?.year },
                  { label: "Color", value: vehicle?.color },
                  { label: "Asientos", value: vehicle?.seats },
                  { label: "Puertas", value: vehicle?.doors },
                  { label: "Combustible", value: vehicle?.fuel_type },
                  { label: "Transmisión", value: vehicle?.transmission },
                ]}
              />
              <DetailsCard
                title="Identificación"
                icon={FingerprintPattern}
                fields={[
                  { label: "VIN", value: vehicle?.vin },
                  { label: "Número de motor", value: vehicle?.engine_number },
                  {
                    label: "Entidad emisora de la licencia",
                    value: vehicle?.license_state,
                  },
                ]}
              />
              <DetailsCard
                title="Operación"
                icon={FingerprintPattern}
                fields={[
                  { label: "Kilometraje", value: vehicle?.mileage },
                  { label: "Ubicación", value: vehicle?.location },
                ]}
              />
              <DetailsCard
                title="Mantenimiento y documentación"
                icon={Gauge}
                fields={[
                  {
                    label: "Último mantenimiento",
                    value: vehicle?.last_service,
                  },
                  {
                    label: "Próximo mantenimiento",
                    value: vehicle?.next_service,
                  },
                  {
                    label: "Próximo mantenimiento (Km)",
                    value: vehicle?.next_service_mileage,
                  },
                  {
                    label: "Vencimiento de seguro",
                    value: vehicle?.insurance_expiry,
                  },
                  {
                    label: "Vencimiento de tarjeta de circulación",
                    value: vehicle?.circulation_card_expiry,
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      <ModalEditVehicle
        isOpen={isModalEditOpen}
        onClose={() => setIsModalEditOpen(false)}
        vehicle={vehicle}
      />
      <ModalDeleteVehicle
        isOpen={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
        vehicle={vehicle}
      />
    </>
  );
}
