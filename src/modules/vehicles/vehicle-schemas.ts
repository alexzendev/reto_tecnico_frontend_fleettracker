import { z } from "zod";

export const vehicleSchema = z.object({
  plate: z.string().min(1, "La placa es requerida"),
  status: z
    .string()
    .min(1, "El estado es requerido")
    .pipe(
      z.enum([
        "Disponible",
        "En ruta",
        "En mantenimiento",
        "Fuera de servicio",
      ]),
    ),
  type: z
    .string()
    .min(1, "El tipo de vehículo es requerido")
    .pipe(z.enum(["Sedán", "SUV", "Pickup", "Camión", "Van"])),
  department: z.string().min(1, "El departamento es requerido"),
  driver: z.string().nullable().default(null),

  brand: z.string().min(1, "La marca es requerida"),
  model: z.string().min(1, "El modelo es requerido"),
  year: z.coerce
    .number()
    .min(1900, "Año inválido")
    .max(new Date().getFullYear(), "Año inválido"),
  color: z.string().min(1, "El color es requerido"),
  seats: z.coerce.number().min(1, "Mínimo 1 asiento"),
  doors: z.coerce.number().min(1, "Mínimo 1 puerta"),
  fuel_type: z
    .string()
    .min(1, "El tipo de combustible es requerido")
    .pipe(z.enum(["Gasolina", "Diésel", "Eléctrico", "Híbrido"])),
  transmission: z
    .string()
    .min(1, "El tipo de transmisión es requerido")
    .pipe(z.enum(["Manual", "Automática"])),

  vin: z.string().min(1, "El VIN es requerido"),
  engine_number: z.string().min(1, "El número de motor es requerido"),
  license_state: z.string().min(1, "El estado de las placas es requerido"),

  mileage: z.coerce.number().min(0, "El kilometraje no puede ser negativo"),
  location: z.string().min(1, "La ubicación es requerida"),
  gps_status: z
    .string()
    .min(1, "El estado del GPS es requerido")
    .pipe(z.enum(["Activo", "Inactivo", "Sin dispositivo"])),

  last_service: z.string().nullable().default(null),
  next_service: z.string().min(1, "La fecha de próximo servicio es requerida"),
  next_service_mileage: z.coerce.number().min(0),
  insurance_expiry: z.string().min(1, "El vencimiento del seguro es requerido"),
  circulation_card_expiry: z
    .string()
    .min(1, "El vencimiento de la tarjeta de circulación es requerido"),
});

export type VehicleFormInput = z.input<typeof vehicleSchema>;
export type VehicleFormOutput = z.infer<typeof vehicleSchema>;
