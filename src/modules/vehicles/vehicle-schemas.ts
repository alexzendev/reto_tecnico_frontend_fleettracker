import { z } from "zod";

export const vehicleSchema = z.object({
  placa: z.string().min(1, "La placa es requerida"),
  marca: z.string().min(1, "La marca es requerida"),
  modelo: z.string().min(1, "El modelo es requerido"),
  año: z
    .number()
    .min(1900, "Año inválido")
    .max(new Date().getFullYear(), "Año inválido"),
  estado: z.enum([
    "Disponible",
    "En ruta",
    "En mantenimiento",
    "Fuera de servicio",
  ]),
  color: z.string().min(1, "El color es requerido"),
  kilometraje: z.number().min(0, "El kilometraje no puede ser negativo"),
});

export type VehicleFormData = z.infer<typeof vehicleSchema>;
