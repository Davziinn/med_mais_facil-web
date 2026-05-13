// Formata para: 25/12/2024
export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(date));
};

// Formata para: 25 de dezembro de 2024
export const formatDateLong = (date: Date) => {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

// Formata para o formato de input (AAAA-MM-DD)
export const formatDateToInput = (date: Date) => {
  return new Date(date).toISOString().split("T")[0];
};

// Formata para: 25/12/24 14:30
export const formatDateTime = (date: Date) => {
  const d = new Date(date);

  // Formata a data: 25/12/24
  const datePart = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(d);

  // Formata a hora: 14:30
  const timePart = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);

  return `${datePart} às ${timePart}`;
};

export const formatarTempo = (minutos: number) => {
  const dias = Math.floor(minutos / 1440);
  const horas = Math.floor((minutos % 1440) / 60);
  const mins = minutos % 60;

  if (dias > 0) {
    return `${dias}d ${horas}h ${mins}min`;
  }

  if (horas > 0) {
    return `${horas}h ${mins}min`;
  }

  return `${mins}min`;
};

export function extrairApenasHoras(date?: Date | string | null): string {
  if (!date) {
    return "00:00:00";
  }

  const data = new Date(date);

  if (isNaN(data.getTime())) {
    return "00:00:00";
  }

  const pad = (n: number) => String(n).padStart(2, "0");

  const horas = pad(data.getHours());
  const minutos = pad(data.getMinutes());
  const segundos = pad(data.getSeconds());

  return `${horas}:${minutos}:${segundos}`;
}