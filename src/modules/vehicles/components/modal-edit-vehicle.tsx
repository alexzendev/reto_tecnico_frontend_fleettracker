import { Modal } from "@/shared/components/ui/modal";
import type { Vehicle } from "../vehicle-types";
import { useUpdateVehicle } from "../vehicle-hooks";
import { Input } from "@/shared/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "@/shared/components/ui/select";
import { DATA_UI } from "@/shared/utils/data-ui";
import { Button } from "@/shared/components/ui/button";
import {
  Fingerprint,
  Gauge,
  Info,
  Loader2,
  Settings2,
  Wrench,
} from "lucide-react";
import { formatDateInput } from "@/shared/utils/formated-date";
import {
  vehicleEditSchema,
  type VehicleEditInput,
  type VehicleEditOutput,
} from "../vehicle-schemas";

interface ModalEditVehicleProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: Vehicle | null;
}

export const ModalEditVehicle = ({
  isOpen,
  onClose,
  vehicle,
}: ModalEditVehicleProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VehicleEditInput, unknown, VehicleEditOutput>({
    resolver: zodResolver(vehicleEditSchema),
    defaultValues: vehicle
      ? {
          ...vehicle,
          last_service: formatDateInput(vehicle.last_service),
          next_service: formatDateInput(vehicle.next_service),
          insurance_expiry: formatDateInput(vehicle.insurance_expiry),
          circulation_card_expiry: formatDateInput(
            vehicle.circulation_card_expiry,
          ),
        }
      : undefined,
  });

  const { mutate: editVehicle, isPending } = useUpdateVehicle();

  const handleConfirm = (formData: VehicleEditOutput) => {
    if (!vehicle) return;

    editVehicle(
      { id: vehicle.id, body: formData },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-full max-w-4xl">
      <div className="p-6">
        <form
          onSubmit={handleSubmit(handleConfirm)}
          className="space-y-5 overflow-y-auto max-h-[80vh] scrollbar-thin pr-3"
        >
          <div>
            <div className="flex sm:gap-2 gap-1 items-center mb-3">
              <Info className="shrink-0 size-4 text-primary" />
              <h3 className="font-semibold lg:text-sm sm:text-xs text-1.5xs uppercase tracking-tighter">
                Información general
              </h3>
            </div>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-4 gap-2">
              <Input
                placeholder="KJX-482-B"
                label="Placa"
                error={errors.plate?.message}
                {...register("plate")}
              />
              <Select
                placeholder="Selecciona el estado del vehículo"
                label="Estado"
                error={errors.status?.message}
                options={DATA_UI.options_status_select}
                {...register("status")}
              />
              <Select
                placeholder="Tipo de vehículo"
                label="Tipo de vehículo"
                error={errors.type?.message}
                options={DATA_UI.options_type_select}
                {...register("type")}
              />
              <Input
                placeholder="Logística"
                label="Departamento"
                error={errors.department?.message}
                {...register("department")}
              />
              <Input
                placeholder="Juan Pérez"
                label="Conductor asignado"
                error={errors.driver?.message}
                {...register("driver")}
              />
            </div>
          </div>

          <div>
            <div className="flex sm:gap-2 gap-1 items-center mb-3">
              <Settings2 className="shrink-0 size-4 text-primary" />
              <h3 className="font-semibold lg:text-sm sm:text-xs text-1.5xs uppercase tracking-tighter">
                Especificaciones del vehículo
              </h3>
            </div>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-4 gap-2">
              <Input
                placeholder="Mazda"
                label="Marca"
                error={errors.brand?.message}
                {...register("brand")}
              />
              <Input
                placeholder="CX-5"
                label="Modelo"
                error={errors.model?.message}
                {...register("model")}
              />
              <Input
                type="number"
                placeholder="1900"
                label="Año"
                error={errors.year?.message}
                {...register("year")}
              />
              <Input
                placeholder="Rojo"
                label="Color"
                error={errors.color?.message}
                {...register("color")}
              />
              <Input
                type="number"
                placeholder="5"
                label="Asientos"
                error={errors.seats?.message}
                {...register("seats")}
              />
              <Input
                type="number"
                placeholder="4"
                label="Puertas"
                error={errors.doors?.message}
                {...register("doors")}
              />
              <Select
                placeholder="Tipo de combustible"
                label="Tipo de combustible"
                error={errors.fuel_type?.message}
                options={DATA_UI.options_fuel_type_select}
                {...register("fuel_type")}
              />
              <Select
                placeholder="Tipo de transmisión"
                label="Tipo de transmisión"
                error={errors.transmission?.message}
                options={DATA_UI.options_transmission_select}
                {...register("transmission")}
              />
            </div>
          </div>

          <div>
            <div className="flex sm:gap-2 gap-1 items-center mb-3">
              <Fingerprint className="shrink-0 size-4 text-primary" />
              <h3 className="font-semibold lg:text-sm sm:text-xs text-1.5xs uppercase tracking-tighter">
                Identificación
              </h3>
            </div>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-4 gap-2">
              <Input
                placeholder="1HGCM82633A004352"
                label="VIN"
                error={errors.vin?.message}
                {...register("vin")}
              />
              <Input
                placeholder="CX-5"
                label="Número de motor"
                error={errors.engine_number?.message}
                {...register("engine_number")}
              />
              <Input
                placeholder="Guadalajara, Jalisco"
                label="Entidad emisora de la licencia"
                error={errors.license_state?.message}
                {...register("license_state")}
              />
            </div>
          </div>

          <div>
            <div className="flex sm:gap-2 gap-1 items-center mb-3">
              <Gauge className="shrink-0 size-4 text-primary" />
              <h3 className="font-semibold lg:text-sm sm:text-xs text-1.5xs uppercase tracking-tighter">
                Operación
              </h3>
            </div>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-4 gap-2 mb-3">
              <Input
                placeholder="8500"
                label="Kilometraje"
                error={errors.mileage?.message}
                {...register("mileage")}
              />
              <Select
                placeholder="Selecciona el estado del GPS"
                label="Estado del GPS"
                error={errors.gps_status?.message}
                options={DATA_UI.options_gps_status_select}
                {...register("gps_status")}
              />
              <Input
                placeholder="Guadalajara, Jalisco"
                label="Ubicación"
                error={errors.location?.message}
                {...register("location")}
              />
            </div>
          </div>

          <div>
            <div className="flex sm:gap-2 gap-1 items-center mb-3">
              <Wrench className="shrink-0 size-4 text-primary" />
              <h3 className="font-semibold lg:text-sm sm:text-xs text-1.5xs uppercase tracking-tighter">
                Mantenimiento y documentación
              </h3>
            </div>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-4 gap-2 mb-3">
              <Input
                type="date"
                placeholder="2025-03-15"
                label="Último mantenimiento"
                error={errors.last_service?.message}
                {...register("last_service")}
              />
              <Input
                type="date"
                placeholder="2025-03-15"
                label="Próximo mantenimiento"
                error={errors.next_service?.message}
                {...register("next_service")}
              />
              <Input
                type="number"
                placeholder="15000"
                label="Próximo mantenimiento (Km)"
                error={errors.next_service_mileage?.message}
                {...register("next_service_mileage")}
              />
              <Input
                type="date"
                placeholder="2025-03-15"
                label="Vencimiento de seguro"
                error={errors.insurance_expiry?.message}
                {...register("insurance_expiry")}
              />
              <Input
                type="date"
                placeholder="2025-03-15"
                label="Vencimiento de tarjeta de circulación"
                error={errors.circulation_card_expiry?.message}
                {...register("circulation_card_expiry")}
              />
            </div>
          </div>

          <div className="mt-6">
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <div className="flex items-center gap-1">
                  <span>Actualizando vehículo</span>
                  <Loader2 className="animate-spin size-4" />
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <span>Actualizar vehículo</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
