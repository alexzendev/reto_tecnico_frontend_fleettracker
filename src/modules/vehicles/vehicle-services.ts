import { API_ENDPOINTS } from "@/shared/config/constants";
import { API_SERVICE } from "@/shared/services/api-service";
import type { Vehicle, VehicleFilters } from "./vehicle-types";
import { v4 as uuidv4 } from "uuid";

export const getVehiclesService = async (params?: VehicleFilters) => {
  const { data, headers } = await API_SERVICE.GET<Vehicle[]>(
    API_ENDPOINTS.VEHICLES,
    {
      _page: params?.page ?? 1,
      _limit: params?.limit ?? 10,
      q: params?.q,
      status: params?.status,
    },
  );

  const total = Number(headers.get("X-Total-Count")) || 0;
  return { data, total, totalPages: Math.ceil(total / (params?.limit ?? 10)) };
};

export const createVehicleService = (body: Omit<Vehicle, "id">) => {
  return API_SERVICE.POST<Vehicle>(API_ENDPOINTS.VEHICLES, {
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    lastUpdatedAt: new Date().toISOString(),
    ...body,
  });
};

export const updateVehicleService = (id: string, body: Omit<Vehicle, "id">) => {
  return API_SERVICE.PUT<Vehicle>(`${API_ENDPOINTS.VEHICLES}/${id}`, body);
};

export const deleteVehicleService = (id: string) => {
  return API_SERVICE.DELETE(`${API_ENDPOINTS.VEHICLES}/${id}`);
};
