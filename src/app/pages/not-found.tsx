import { Button } from "@/shared/components/ui/button";
import { ArrowRight } from "lucide-react";

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
      <Button>
        Volver al inicio
        <ArrowRight className="size-3.5 group-hover:-rotate-45 transition-all duration-200" />
      </Button>
    </section>
  );
}
