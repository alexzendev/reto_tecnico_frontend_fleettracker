import { BoxIcon } from "../icons/box-icon";
import { ErrorIcon } from "../icons/error-icon";

export const ErrorState = ({ message }: { message: string }) => (
  <div className="text-center py-10 flex flex-col items-center justify-center flex-1">
    <ErrorIcon className="lg:size-16 sm:size-14 size-12 mb-4 text-primary" />
    <span className="lg:text-base sm:text-sm text-xs font-medium text-primary text-center tracking-tighter">
      Error
    </span>
    <p className="lg:text-lg sm:text-base text-sm font-semibold mb-2">
      {message}
    </p>
    <p className="lg:text-xs sm:text-1.5xs text-2xs max-w-md text-center">
      Intentalo de nuevo más tarde o recarga la página. Si el problema persiste,
      contacta al soporte técnico.
    </p>
  </div>
);

export const EmptyState = ({ message }: { message: string }) => (
  <div className="text-center py-10 flex flex-col items-center justify-center flex-1">
    <BoxIcon className="lg:size-24 sm:size-20 size-16 mb-4 text-primary" />
    <span className="lg:text-base sm:text-sm text-xs font-medium text-primary text-center tracking-tighter">
      Sin resultados
    </span>
    <p className="lg:text-lg sm:text-base text-sm font-semibold mb-2">
      {message}
    </p>
    <p className="lg:text-xs sm:text-1.5xs text-2xs max-w-md text-center">
      Intentalo de nuevo más tarde o recarga la página.
    </p>
  </div>
);
