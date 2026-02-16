import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./app/pages/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicles/:id" element={<div>Vehicle Details</div>} />
        <Route path="/vehicles/new" element={<div>New Vehicle</div>} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
