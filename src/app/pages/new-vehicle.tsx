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
      <div className="flex-1 flex items-center justify-center p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-2xl w-full space-y-3"
        >
          <div className="flex md:flex-row flex-col lg:gap-4 gap-2">
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

          <div className="flex md:flex-row flex-col lg:gap-4 gap-2">
            <Input
              placeholder="Corolla"
              label="Modelo"
              error={errors.modelo?.message}
              {...register("modelo")}
            />

            <Input
              type="number"
              min={0}
              placeholder="2020"
              label="Año"
              error={errors.año?.message}
              {...register("año")}
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
              error={errors.kilometraje?.message}
              {...register("kilometraje")}
            />
          </div>

          <div className="flex flex-col gap-1 w-full mb-10">
            <label
              htmlFor="estado"
              className="sm:text-xs text-1.5xs uppercase font-semibold"
            >
              Estado
            </label>
            <select
              id="estado"
              {...register("estado")}
              className="px-3 py-2 sm:text-xs text-1.5xs border rounded-full outline-none autofill-input dark:autofill-input-dark border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 appearance-none w-full"
            >
              <option value="">Selecciona un estado</option>
              <option value="Disponible">Disponible</option>
              <option value="En ruta">En ruta</option>
              <option value="En mantenimiento">En mantenimiento</option>
              <option value="Fuera de servicio">Fuera de servicio</option>
            </select>
            {errors.estado && (
              <span className="sm:text-1.5xs text-2xs text-red-400 dark:text-red-600">
                *{errors.estado.message}
              </span>
            )}
          </div>

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
