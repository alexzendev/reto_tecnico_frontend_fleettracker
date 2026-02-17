import type { QueryParams } from "@/shared/types/api-service-types";

type VehicleState =
  | "disponible"
  | "en ruta"
  | "en mantenimiento"
  | "fuera de servicio";

export interface Vehicle {
  id: string;
  placa: string;
  marca: string;
  modelo: string;
  año: number;
  estado: VehicleState;
  color: string;
  kilometraje: number;
}

export interface VehicleFilters extends QueryParams {
  _page?: number;
  _limit?: number;
  _q?: string;
  status?: VehicleState;
}
