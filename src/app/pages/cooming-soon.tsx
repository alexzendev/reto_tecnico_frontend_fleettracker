import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface CoomingSoonProps {
  readonly title: string;
}

export default function CoomingSoon({ title }: CoomingSoonProps) {
  return (
    <main className="min-h-[calc(100vh-5rem)] flex flex-col bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-200 sm:px-4 px-2 py-4">
      <section className="flex flex-col items-center justify-center flex-1">
        <span className="lg:text-base sm:text-sm text-xs font-medium text-primary text-center tracking-tighter">
          Próximamente
        </span>
        <h1 className="lg:text-3xl sm:text-2xl text-xl text-center font-bold tracking-tight">
          {title}
        </h1>
        <p className="lg:text-sm sm:text-xs text-1.5xs text-center mb-5">
          Estamos trabajando para que puedas acceder pronto.
        </p>
        <Link
          to="/"
          className="sm:px-4 px-3 sm:py-2 py-1.5 rounded-full lg:text-xs sm:text-1.5xs text-2xs uppercase font-semibold flex items-center justify-center gap-1 cursor-pointer transition-all duration-200 disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:bg-primary group bg-primary hover:bg-secondary text-stone-100 group"
        >
          Volver al inicio
          <ArrowRight className="size-3.5 group-hover:-rotate-45 transition-all duration-200" />
        </Link>
      </section>
    </main>
  );
}
