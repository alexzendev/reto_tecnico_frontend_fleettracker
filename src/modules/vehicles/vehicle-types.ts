import type { QueryParams } from "@/shared/types/api-service-types";

type VehicleState =
  | "Disponible"
  | "En ruta"
  | "En mantenimiento"
  | "Fuera de servicio";

export interface Vehicle {
  id: string;
  plate: string;
  brand: string;
  model: string;
  year: number;
  status: VehicleState;
  color: string;
  mileage: number;
}

export interface VehicleFilters extends QueryParams {
  page?: number;
  limit?: number;
  q?: string;
  status?: VehicleState;
}
