import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100svh-4rem)]">
      <span className="text-xl font-bold text-primary text-center">404</span>
      <h1 className="lg:text-2xl sm:text-xl text-lg text-center font-semibold">
        Página no encontrada
      </h1>
      <p className="lg:text-sm sm:text-xs text-1.5xs text-center mb-5">
        Lo sentimos, la página que buscas no existe.
      </p>
      <Link
        to="/"
        className="bg-primary hover:bg-secondary text-stone-100 px-5 py-2.5 rounded-full sm:text-xs text-1.5xs uppercase font-semibold flex items-center justify-center gap-1 cursor-pointer transition-all duration-200 group"
      >
        Volver al inicio
        <ArrowRight className="size-3.5 group-hover:-rotate-45 transition-all duration-200" />
      </Link>
    </section>
  );
}
