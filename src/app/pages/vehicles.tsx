import { Header } from "@/shared/components/elements/header";
import { Link } from "react-router-dom";

export default function Vehicles() {
  return (
    <div>
      <Header title="Vehículos" />
      <div className="lg:p-4 p-2">
        <div>
            <Link to="/vehicles/new" className="btn btn-primary">
              Agregar Vehículo
            </Link>
        </div>
      </div>
    </div>
  );
}
