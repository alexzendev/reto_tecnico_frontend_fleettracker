import { useCreateVehicle } from "@/modules/vehicles/vehicle-hooks";
import {
  vehicleSchema,
  type VehicleFormInput,
  type VehicleFormOutput,
} from "@/modules/vehicles/vehicle-schemas";
import { Header } from "@/shared/components/elements/header";
import { Button } from "@/shared/components/ui/button";
import { ButtonBack } from "@/shared/components/ui/button-back";
import { Input } from "@/shared/components/ui/input";
import { Select } from "@/shared/components/ui/select";
import { DATA_UI } from "@/shared/utils/data-ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { CarFront, Loader } from "lucide-react";
import { useForm } from "react-hook-form";

export default function NewVehicle() {
  const { mutate: createVehicle, isPending } = useCreateVehicle();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VehicleFormInput, unknown, VehicleFormOutput>({
    resolver: zodResolver(vehicleSchema),
  });

  const onSubmit = (data: VehicleFormOutput) => {
    createVehicle(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <section className="min-h-svh flex flex-col">
      <Header title="Agregar nuevo vehículo" />
      <ButtonBack to="/vehicles" />
      <div className="flex-1 flex items-center justify-center p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-2xl w-full space-y-3"
        >
          <div className="flex md:flex-row flex-col lg:gap-4 gap-2">
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
          </div>

          <div className="flex md:flex-row flex-col lg:gap-4 gap-2">
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
          </div>

          <div className="flex md:flex-row flex-col lg:gap-4 gap-2">
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
          </div>

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
                <span>Creando vehículo</span>
                <Loader className="animate-spin size-4" />
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <span>Agregar vehículo</span>
                <CarFront className="size-4" />
              </div>
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}
