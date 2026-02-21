import { Link } from "react-router-dom";
import { BoxIcon } from "../icons/box-icon";
import { ErrorIcon } from "../icons/error-icon";

interface StateProps {
  message: string;
  description?: string;
}

interface ErrorStateProps extends StateProps {
  to?: string;
  labelto?: string;
}

export const ErrorState = ({
  message,
  description,
  to,
  labelto,
}: ErrorStateProps) => (
  <div className="text-center py-10 flex flex-col items-center justify-center flex-1">
    <ErrorIcon className="lg:size-16 sm:size-14 size-12 mb-4 text-primary" />
    <span className="lg:text-base sm:text-sm text-xs font-medium text-primary text-center tracking-tighter">
      Error
    </span>
    <p className="lg:text-lg sm:text-base text-sm font-semibold mb-2">
      {message}
    </p>
    <p className="lg:text-xs sm:text-1.5xs text-2xs max-w-md text-center">
      {description || "Intentalo de nuevo más tarde o recarga la página."}
    </p>
    {to && (
      <Link
        to={to}
        className="bg-primary hover:bg-secondary text-stone-100 px-4 py-2.5 rounded-full sm:text-1.5xs text-2xs uppercase font-semibold flex items-center justify-center gap-1 cursor-pointer transition-all duration-200 group mt-5"
      >
        {labelto || "Volver al inicio"}
      </Link>
    )}
  </div>
);

export const EmptyState = ({ message, description }: StateProps) => (
  <div className="text-center py-10 flex flex-col items-center justify-center flex-1">
    <BoxIcon className="lg:size-24 sm:size-20 size-16 mb-4 text-primary" />
    <span className="lg:text-base sm:text-sm text-xs font-medium text-primary text-center tracking-tighter">
      Sin resultados
    </span>
    <p className="lg:text-lg sm:text-base text-sm font-semibold mb-2">
      {message}
    </p>
    <p className="lg:text-xs sm:text-1.5xs text-2xs max-w-md text-center">
      {description || "Intentalo de nuevo más tarde o recarga la página."}
    </p>
  </div>
);
