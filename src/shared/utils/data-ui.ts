import { Car, Home, MapPin, Monitor, Moon, Sun, User } from "lucide-react";

export const DATA_UI = {
  user: {
    name: "Alexis Jimenez",
    email: "alexis@correo.com",
    role: "usuario",
  },
  navigation: [
    { label: "Inicio", path: "/", icon: Home },
    { label: "Vehículos", path: "/vehicles", icon: Car },
    { label: "Rastreo", path: "/tracking", icon: MapPin },
    { label: "Monitoreo", path: "/monitoring", icon: Monitor },
    { label: "Usuarios", path: "/users", icon: User },
  ],
  theme: [
    { label: "Sistema", value: "system", icons: Monitor },
    { label: "Claro", value: "light", icons: Sun },
    { label: "Oscuro", value: "dark", icons: Moon },
  ],
};
