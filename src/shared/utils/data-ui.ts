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
};
