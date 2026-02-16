import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./app/pages/home";
import { Layout } from "./app/layout/layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicles/:id" element={<div>Vehicle Details</div>} />
          <Route path="/vehicles/new" element={<div>New Vehicle</div>} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
