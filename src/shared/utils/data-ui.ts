import {
  CarFront,
  Home,
  IdCardLanyard,
  MapPin,
  Monitor,
  Moon,
  Sun,
  User,
} from "lucide-react";

export const DATA_UI = {
  user: {
    name: "Alexis Jimenez",
    email: "alexis@correo.com",
    role: "usuario",
  },
  navigation: [
    { label: "Inicio", path: "/home", icon: Home },
    { label: "Vehículos", path: "/vehicles", icon: CarFront },
    { label: "Conductores", path: "/drivers", icon: IdCardLanyard },
    { label: "Rastreo de Vehículos", path: "/tracking", icon: MapPin },
    { label: "Monitoreo de Vehículos", path: "/monitoring", icon: Monitor },
    { label: "Usuarios", path: "/users", icon: User },
  ],
  theme: [
    { label: "Sistema", value: "system", icons: Monitor },
    { label: "Claro", value: "light", icons: Sun },
    { label: "Oscuro", value: "dark", icons: Moon },
  ],
  cards_home: {
    "/vehicles": {
      description:
        "Gestiona tu flota de vehículos de manera eficiente y sencilla.",
    },
    "/drivers": {
      description:
        "Administra la información de tus conductores y asigna vehículos fácilmente.",
    },
    "/tracking": {
      description: "Rastrea la ubicación de tus vehículos en tiempo real.",
    },
    "/monitoring": {
      description: "Monitorea el estado de tus vehículos en tiempo real.",
    },
    "/users": {
      description: "Gestiona los usuarios del sistema.",
    },
  },
  options_status_select: [
    { value: "Disponible", label: "Disponible" },
    { value: "En ruta", label: "En ruta" },
    { value: "En mantenimiento", label: "En mantenimiento" },
    { value: "Fuera de servicio", label: "Fuera de servicio" },
  ],
  options_type_select: [
    { value: "Sedán", label: "Sedán" },
    { value: "SUV", label: "SUV" },
    { value: "Pickup", label: "Pickup" },
    { value: "Camión", label: "Camión" },
    { value: "Van", label: "Van" },
  ],

  options_fuel_type_select: [
    { value: "Gasolina", label: "Gasolina" },
    { value: "Diésel", label: "Diésel" },
    { value: "Eléctrico", label: "Eléctrico" },
    { value: "Híbrido", label: "Híbrido" },
  ],
  options_transmission_select: [
    { value: "Manual", label: "Manual" },
    { value: "Automática", label: "Automática" },
  ],
  options_gps_status_select: [
    { value: "Activo", label: "Activo" },
    { value: "Inactivo", label: "Inactivo" },
    { value: "Sin dispositivo", label: "Sin dispositivo" },
  ],
};

