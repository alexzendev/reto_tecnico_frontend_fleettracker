const DEFAULT_COLOR = "bg-stone-500";

const COLORS = {
  status: {
    Disponible: "bg-green-500",
    "En ruta": "bg-blue-500",
    "En mantenimiento": "bg-yellow-500",
    "Fuera de servicio": "bg-red-500",
  },
  gps: {
    Activo: "bg-green-500",
    Inactivo: "bg-red-500",
    "Sin dispositivo": DEFAULT_COLOR,
  },
} as const;

type StatusType = keyof typeof COLORS;

export const getColor = (type: StatusType, status: string): string => {
  return (
    COLORS[type][status as keyof (typeof COLORS)[typeof type]] ?? DEFAULT_COLOR
  );
};
