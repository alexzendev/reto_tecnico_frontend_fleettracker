import { Modal } from "@/shared/components/ui/modal";
import { useDeleteVehicle } from "../vehicle-hooks";
import type { Vehicle } from "../vehicle-types";
import { Loader2 } from "lucide-react";

interface ModalDeleteVehicleProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: Vehicle | null;
}

export const ModalDeleteVehicle = ({
  isOpen,
  onClose,
  vehicle,
}: ModalDeleteVehicleProps) => {
  const { mutate: deleteVehicle, isPending } = useDeleteVehicle();
  const handleConfirm = () => {
    if (!vehicle) return null;
    deleteVehicle(vehicle.id, {
      onSuccess: () => onClose(),
    });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-full max-w-md">
      <div className="p-6">
        <h2 className="lg:text-base sm:text-sm text-xs font-bold mb-3">
          Eliminar {vehicle?.brand} - {vehicle?.model}
        </h2>
        <p className="lg:text-sm sm:text-xs text-1.5xs mb-6">
          ¿Estás seguro de que deseas eliminar el vehículo con placa{" "}
          <span className="font-semibold">{vehicle?.plate}</span> ?. Esta acción
          no se puede deshacer.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            disabled={isPending}
            className="px-4 py-2.5 rounded-full sm:text-1.5xs text-2xs uppercase font-semibold border border-stone-300 hover:bg-stone-100 dark:border-stone-600 dark:hover:bg-stone-800 transition-colors duration-200 disabled:opacity-50 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={isPending}
            className="px-4 py-2.5 sm:text-1.5xs text-2xs uppercase font-semibold rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors duration-200 disabled:opacity-50 cursor-pointer"
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <span>Eliminando</span>
                <Loader2 className="animate-spin size-3" />
              </div>
            ) : (
              "Eliminar"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};
