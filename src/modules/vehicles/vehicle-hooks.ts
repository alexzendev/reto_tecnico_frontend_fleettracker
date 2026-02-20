import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createVehicleService,
  deleteVehicleService,
  getVehiclesService,
  updateVehicleService,
} from "./vehicle-services";
import { QUERY_CACHE_KEYS } from "@/shared/config/constants";
import { toast } from "sonner";
import type { Vehicle, VehicleFilters } from "./vehicle-types";

const VEHICLE_KEY = [QUERY_CACHE_KEYS.VEHICLE];

export const useGetVehicles = (filters?: VehicleFilters) => {
  return useQuery({
    queryKey: [...VEHICLE_KEY, filters],
    queryFn: () => getVehiclesService(filters),
  });
};

export const useCreateVehicle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createVehicleService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: VEHICLE_KEY });
      toast.success("Vehiculo creado exitosamente");
    },
  });
};

export const useUpdateVehicle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: Omit<Vehicle, "id"> }) =>
      updateVehicleService(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: VEHICLE_KEY });
      toast.success("Vehiculo actualizado exitosamente");
    },
  });
};

export const useDeleteVehicle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteVehicleService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: VEHICLE_KEY });
      toast.success("Vehiculo eliminado exitosamente");
    },
  });
};
