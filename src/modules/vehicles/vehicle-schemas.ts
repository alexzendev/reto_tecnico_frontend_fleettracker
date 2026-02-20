import { z } from "zod";

export const vehicleSchema = z.object({
  plate: z.string().min(1, "La placa es requerida"),
  brand: z.string().min(1, "La marca es requerida"),
  model: z.string().min(1, "El modelo es requerido"),
  year: z.coerce
    .number()
    .min(1900, "Año inválido")
    .max(new Date().getFullYear(), "Año inválido"),
  status: z
    .string()
    .min(1, "El estado es requerido")
    .pipe(
      z.enum([
        "available",
        "in_route",
        "maintenance",
        "out_of_service",
      ]),
    ),
  color: z.string().min(1, "El color es requerido"),
  mileage: z.coerce.number().min(0, "El kilometraje no puede ser negativo"),
});

export type VehicleFormInput = z.input<typeof vehicleSchema>;
export type VehicleFormOutput = z.infer<typeof vehicleSchema>;
