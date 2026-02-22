import type { QueryParams } from "@/shared/types/api-service-types";

type VehicleState =
  | "Disponible"
  | "En ruta"
  | "En mantenimiento"
  | "Fuera de servicio";

type GPSStatus = "Activo" | "Inactivo" | "Sin dispositivo";
type FuelType = "Gasolina" | "Diésel" | "Eléctrico" | "Híbrido";
type TransmissionType = "Manual" | "Automática";
type VehicleType = "Sedán" | "SUV" | "Pickup" | "Camión" | "Van";

export interface Vehicle {
  id: string;

  plate: string;
  status: VehicleState;
  type: VehicleType;
  department: string;
  driver: string;

  brand: string;
  model: string;
  year: number;
  color: string;
  seats: number;
  doors: number;
  fuel_type: FuelType;
  transmission: TransmissionType;

  vin: string;
  engine_number: string;
  license_state: string;

  mileage: number;
  location: string;
  gps_status: GPSStatus;

  last_service: string;
  next_service: string;
  next_service_mileage: number;
  insurance_expiry: string;
  circulation_card_expiry: string;
}

export interface VehicleFilters extends QueryParams {
  page?: number;
  limit?: number;
  q?: string;
  status?: VehicleState;
}
