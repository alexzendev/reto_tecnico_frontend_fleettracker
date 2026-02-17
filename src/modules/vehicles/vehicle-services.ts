import { API_ENDPOINTS } from "@/shared/config/constants";
import { API_SERVICE } from "@/shared/services/api-service";
import type { Vehicle, VehicleFilters } from "./vehicle-types";

export const getVehiclesService = (params?: VehicleFilters) => {
  return API_SERVICE.GET<Vehicle[]>(API_ENDPOINTS.VEHICLES, params);
};

export const createVehicleService = (body: Omit<Vehicle, "id">) => {
  return API_SERVICE.POST<Vehicle>(API_ENDPOINTS.VEHICLES, body);
};

export const updateVehicleService = (id: string, body: Omit<Vehicle, "id">) => {
  return API_SERVICE.PUT<Vehicle>(`${API_ENDPOINTS.VEHICLES}/${id}`, body);
};

export const deleteVehicleService = (id: string) => {
  return API_SERVICE.DELETE(`${API_ENDPOINTS.VEHICLES}/${id}`);
};
