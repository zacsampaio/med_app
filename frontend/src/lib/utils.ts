import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStatusLabel(status: string) {
  switch (status) {
    case "scheduled":
      return "Agendada";
    case "in_progress":
      return "Em andamento";
    case "completed":
      return "Concluída";
    case "cancelled":
      return "Cancelada";
    case "rescheduled":
      return "Remarcada";
    default:
      return "Desconhecido";
  }
}
