import { z } from "zod";

const vehicleBaseSchema = z.object({
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
  driver: z.string().min(1, "El conductor es requerido"),
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
  next_service_mileage: z.coerce.number().min(0),
});

const datFields = {
  last_service: z
    .string()
    .min(1, "La fecha del último servicio es requerida")
    .pipe(z.coerce.date())
    .transform((date) => {
      date.setUTCHours(12, 0, 0, 0);
      return date.toISOString();
    }),
  next_service: z
    .string()
    .min(1, "La fecha de próximo servicio es requerida")
    .pipe(z.coerce.date())
    .transform((date) => {
      date.setUTCHours(12, 0, 0, 0);
      return date.toISOString();
    }),
  insurance_expiry: z
    .string()
    .min(1, "El vencimiento del seguro es requerido")
    .pipe(z.coerce.date())
    .transform((date) => {
      date.setUTCHours(12, 0, 0, 0);
      return date.toISOString();
    }),
  circulation_card_expiry: z
    .string()
    .min(1, "El vencimiento de la tarjeta de circulación es requerido")
    .pipe(z.coerce.date())
    .transform((date) => {
      date.setUTCHours(12, 0, 0, 0);
      return date.toISOString();
    }),
};

export const vehicleEditSchema = vehicleBaseSchema.extend(datFields);

export const vehicleCreateSchema = vehicleBaseSchema.extend({
  last_service: datFields.last_service.refine(
    (date) => {
      const today = new Date();
      today.setUTCHours(23, 59, 59, 999);
      return new Date(date) <= today;
    },
    { message: "El último mantenimiento no puede ser una fecha futura" },
  ),
  next_service: datFields.next_service.refine(
    (date) => {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      return new Date(date) >= today;
    },
    { message: "El próximo mantenimiento no puede ser una fecha pasada" },
  ),
  insurance_expiry: datFields.insurance_expiry.refine(
    (date) => {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      return new Date(date) >= today;
    },
    { message: "El vencimiento del seguro no puede ser una fecha pasada" },
  ),
  circulation_card_expiry: datFields.circulation_card_expiry.refine(
    (date) => {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      return new Date(date) >= today;
    },
    {
      message:
        "El vencimiento de la tarjeta de circulación no puede ser una fecha pasada",
    },
  ),
});

export type VehicleCreateInput = z.input<typeof vehicleCreateSchema>;
export type VehicleCreateOutput = z.infer<typeof vehicleCreateSchema>;

export type VehicleEditInput = z.input<typeof vehicleEditSchema>;
export type VehicleEditOutput = z.infer<typeof vehicleEditSchema>;
