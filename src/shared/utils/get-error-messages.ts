export const getErrorMessages = (code: number): string => {
  const messages: Record<number, string> = {
    400: "Solicitud Incorrecta",
    401: "No Autorizado",
    403: "Prohibido",
    404: "No Encontrado",
    500: "Error Interno del Servidor",
  };
  return messages[code] || "Error Desconocido";
};
