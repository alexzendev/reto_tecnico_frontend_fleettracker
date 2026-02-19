import { useCreateVehicle } from "@/modules/vehicles/vehicle-hooks";
import {
  vehicleSchema,
  type VehicleFormInput,
  type VehicleFormOutput,
} from "@/modules/vehicles/vehicle-schemas";
import { Header } from "@/shared/components/elements/header";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
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

  const currentYear = new Date().getFullYear();
  return (
    <section>
      <Header title="Agregar nuevo vehículo" />
      <div className="lg:p-4 p-2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-2xl space-y-3 mx-auto"
        >
          <div className="flex flex-row gap-4">
            <Input
              placeholder="KJX-482-B"
              label="Placa vehícular"
              error={errors.placa?.message}
              {...register("placa")}
            />
            <Input
              placeholder="Toyota"
              label="Marca"
              error={errors.marca?.message}
              {...register("marca")}
            />
          </div>

          <div className="flex flex-row gap-4">
            <Input
              placeholder="Corolla"
              label="Modelo"
              error={errors.modelo?.message}
              {...register("modelo")}
            />

            <Input
              type="number"
              min={0}
              max={currentYear}
              placeholder="2020"
              label="Año"
              error={errors.año?.message}
              {...register("año")}
            />
          </div>

          <div className="flex flex-row gap-4">
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
              error={errors.kilometraje?.message}
              {...register("kilometraje")}
            />
          </div>

          <div className="">
            <select {...register("estado")}>
              <option value="">Selecciona un estado</option>
              <option value="Disponible">Disponible</option>
              <option value="En ruta">En ruta</option>
              <option value="En mantenimiento">En mantenimiento</option>
              <option value="Fuera de servicio">Fuera de servicio</option>
            </select>
            {errors.estado && <span>{errors.estado.message}</span>}
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? "Creando..." : "Agregar vehículo"}
          </Button>
        </form>
      </div>
    </section>
  );
}
