import { Imagotipo } from "@/shared/components/icons/imagotipo";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="min-h-svh flex flex-col bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-200">
      <header className="h-16 border-b border-stone-200 dark:border-stone-700">
        <div className="container mx-auto flex justify-center items-center h-full">
          <Imagotipo className="w-40" />
        </div>
      </header>
      <section className="flex flex-col items-center justify-center flex-1">
        <span className="lg:text-xl sm:text-lg text-base font-bold text-primary text-center">404</span>
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
    </main>
  );
}
