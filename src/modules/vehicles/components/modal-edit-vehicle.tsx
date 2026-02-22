import { Modal } from "@/shared/components/ui/modal";
import type { Vehicle } from "../vehicle-types";
import { useUpdateVehicle } from "../vehicle-hooks";
import { Input } from "@/shared/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "@/shared/components/ui/select";
import { DATA_UI } from "@/shared/utils/data-ui";
import { Button } from "@/shared/components/ui/button";
import { Info, Loader2, Settings2 } from "lucide-react";
import {
  vehicleSchema,
  type VehicleFormInput,
  type VehicleFormOutput,
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
  } = useForm<VehicleFormInput, unknown, VehicleFormOutput>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: vehicle ?? undefined,
  });

  const { mutate: editVehicle, isPending } = useUpdateVehicle();

  const handleConfirm = (formData: VehicleFormOutput) => {
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
    <Modal isOpen={isOpen} onClose={onClose} className="w-full max-w-2xl">
      <div className="p-6">
        <form onSubmit={handleSubmit(handleConfirm)} className="space-y-5">
          <div>
            <div className="flex sm:gap-2 gap-1 items-center mb-3">
              <Info className="shrink-0 size-4 text-primary" />
              <h3 className="font-semibold lg:text-sm sm:text-xs text-1.5xs uppercase tracking-tighter">
                Información general
              </h3>
            </div>
            <div className="flex md:flex-row flex-col lg:gap-4 gap-2 mb-3">
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
            </div>
            <div className="flex md:flex-row flex-col lg:gap-4 gap-2 mb-3">
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
            </div>
            <Input
              placeholder="Juan Pérez"
              label="Conductor asignado"
              error={errors.driver?.message}
              {...register("driver")}
            />
          </div>

          <div>
            <div className="flex sm:gap-2 gap-1 items-center mb-3">
              <Settings2 className="shrink-0 size-4 text-primary" />
              <h3 className="font-semibold lg:text-sm sm:text-xs text-1.5xs uppercase tracking-tighter">
                Especificaciones del vehículo
              </h3>
            </div>
            <div className="flex md:flex-row flex-col lg:gap-4 gap-2 mb-3">
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
            </div>
            <div className="flex md:flex-row flex-col lg:gap-4 gap-2 mb-3">
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
            </div>
            <div className="flex md:flex-row flex-col lg:gap-4 gap-2 mb-3">
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
            </div>
            <div className="flex md:flex-row flex-col lg:gap-4 gap-2 mb-3">
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

          <div className="mt-6">
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <div className="flex items-center gap-1">
                  <span>Editando vehículo</span>
                  <Loader2 className="animate-spin size-4" />
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <span>Editar vehículo</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
