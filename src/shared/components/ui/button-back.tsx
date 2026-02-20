import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const ButtonBack = ({ to }: { to: string }) => {
  return (
    <Link
      to={to}
      className="flex items-center gap-0.5 px-4 py-2 hover:text-primary hover:underline"
    >
      <ArrowRight className="size-3 rotate-180" />
      <span className="sm:text-xs text-1.5xs font-semibold uppercase">Regresar</span>
    </Link>
  );
};
