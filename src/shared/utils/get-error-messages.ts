export const getErrorMessages = (code: number): string => {
  const messages: Record<number, string> = {
    400: "Los datos enviados no son válidos. Revisa el formulario e intenta de nuevo.",
    401: "No tienes autorización para realizar esta acción. Inicia sesión.",
    403: "No tienes permisos para acceder a este recurso.",
    404: "No se encontró el recurso solicitado. Puede que haya sido eliminado.",
    500: "Error en el servidor. Por favor intenta más tarde.",
  };
  return messages[code] || "Ocurrió un error inesperado. Intenta de nuevo.";
};
