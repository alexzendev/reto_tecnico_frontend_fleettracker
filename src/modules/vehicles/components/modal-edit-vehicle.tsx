import { Modal } from "@/shared/components/ui/modal";
import type { Vehicle } from "../vehicle-types";
import { useUpdateVehicle } from "../vehicle-hooks";
import { Input } from "@/shared/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "@/shared/components/ui/select";
import { DATA_UI } from "@/shared/utils/data-ui";
import { Button } from "@/shared/components/ui/button";
import { Loader2 } from "lucide-react";
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
    <Modal isOpen={isOpen} onClose={onClose} className="w-full max-w-lg">
      <form onSubmit={handleSubmit(handleConfirm)} className="space-y-4 p-4">
        <Input
          placeholder="KJX-482-B"
          label="Placa vehícular"
          error={errors.plate?.message}
          {...register("plate")}
        />
        <Input
          placeholder="Toyota"
          label="Marca"
          error={errors.brand?.message}
          {...register("brand")}
        />
        <Input
          placeholder="Corolla"
          label="Modelo"
          error={errors.model?.message}
          {...register("model")}
        />
        <Input
          type="number"
          min={0}
          placeholder="2020"
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
          min={0}
          placeholder="15000"
          label="Kilometraje"
          error={errors.mileage?.message}
          {...register("mileage")}
        />
        <Select
          placeholder="Selecciona el estado del vehículo"
          label="Estado"
          error={errors.status?.message}
          options={DATA_UI.options_status_select}
          {...register("status")}
        />
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
      </form>
    </Modal>
  );
};
