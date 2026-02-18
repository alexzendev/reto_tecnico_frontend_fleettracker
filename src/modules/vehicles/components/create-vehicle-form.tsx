import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateVehicle } from "../vehicle-hooks";
import { vehicleSchema, type VehicleFormData } from "../vehicle-schemas";

export const CreateVehicleForm = () => {
  const { mutate: createVehicle, isPending } = useCreateVehicle();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
  });

  const onSubmit = (data: VehicleFormData) => {
    createVehicle(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input placeholder="Placa" {...register("placa")} />
        {errors.placa && <span>{errors.placa.message}</span>}
      </div>

      <div>
        <input placeholder="Marca" {...register("marca")} />
        {errors.marca && <span>{errors.marca.message}</span>}
      </div>

      <div>
        <input placeholder="Modelo" {...register("modelo")} />
        {errors.modelo && <span>{errors.modelo.message}</span>}
      </div>

      <div>
        <input
          type="number"
          placeholder="Año"
          {...register("año", { valueAsNumber: true })}
        />
        {errors.año && <span>{errors.año.message}</span>}
      </div>

      <div>
        <select {...register("estado")}>
          <option value="">Selecciona un estado</option>
          <option value="Disponible">Disponible</option>
          <option value="En ruta">En ruta</option>
          <option value="En mantenimiento">En mantenimiento</option>
          <option value="Fuera de servicio">Fuera de servicio</option>
        </select>
        {errors.estado && <span>{errors.estado.message}</span>}
      </div>

      <div>
        <input placeholder="Color" {...register("color")} />
        {errors.color && <span>{errors.color.message}</span>}
      </div>

      <div>
        <input
          type="number"
          placeholder="Kilometraje"
          {...register("kilometraje", { valueAsNumber: true })}
        />
        {errors.kilometraje && <span>{errors.kilometraje.message}</span>}
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? "Creando..." : "Crear vehículo"}
      </button>
    </form>
  );
};
