import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./app/pages/home";
import { Layout } from "./app/layout/layout";
import NotFound from "./app/pages/not-found";
import NewVehicle from "./app/pages/new-vehicle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { useTheme } from "./shared/hooks/useTheme";
import CoomingSoon from "./app/pages/cooming-soon";

const queryClient = new QueryClient();

function App() {
  useTheme();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/vehicles" replace />} />x
            <Route path="/vehicles" element={<Home />} />
            <Route path="/vehicles/new" element={<NewVehicle />} />
            <Route path="/vehicles/:id" element={<div>Vehicle Details</div>} />
            <Route
              path="/tracking"
              element={<CoomingSoon title="Seguimiento" />}
            />
            <Route
              path="/monitoring"
              element={<CoomingSoon title="Monitoreo" />}
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
