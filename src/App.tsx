import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./app/pages/home";
import { Layout } from "./app/layout/layout";
import NotFound from "./app/pages/not-found";
import NewVehicle from "./app/pages/new-vehicle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { useTheme } from "./shared/hooks/useTheme";
import CoomingSoon from "./app/pages/cooming-soon";
import Vehicles from "./app/pages/vehicles";

const queryClient = new QueryClient();

function App() {
  useTheme();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/vehicles" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/vehicles/new" element={<NewVehicle />} />
            <Route path="/vehicles/:id" element={<div>Vehicle Details</div>} />
            <Route
              path="/drivers"
              element={<CoomingSoon title="Conductores" />}
            />
            <Route
              path="/tracking"
              element={<CoomingSoon title="Seguimiento de vehículos" />}
            />
            <Route
              path="/monitoring"
              element={<CoomingSoon title="Monitoreo de vehículos" />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="top-center" />
    </QueryClientProvider>
  );
}

export default App;
