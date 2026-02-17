import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./app/pages/home";
import { Layout } from "./app/layout/layout";
import NotFound from "./app/pages/not-found";
import NewVehicle from "./app/pages/new-vehicle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vehicles/new" element={<NewVehicle />} />
            <Route path="/vehicles/:id" element={<div>Vehicle Details</div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      <Toaster richColors position="top-center" />
    </QueryClientProvider>
  );
}

export default App;
