export const formatDateLong = (date: string): string => {
  return new Date(date).toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatDateInput = (date: string): string => {
  return date.split("T")[0];
};
