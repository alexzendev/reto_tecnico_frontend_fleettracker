import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./app/pages/home";
import { Layout } from "./app/layout/layout";
import NotFound from "./app/pages/not-found";
import NewVehicle from "./app/pages/new-vehicle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { useTheme } from "./shared/hooks/useTheme";
import CoomingSoon from "./app/pages/cooming-soon";
import Vehicles from "./app/pages/vehicles";
import DetailsVehicle from "./app/pages/details-vehicle";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

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
            <Route path="/vehicles/:id" element={<DetailsVehicle />} />
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
