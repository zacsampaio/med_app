import { apiClient } from "../axiosClient";
import { Appointment } from "../types";

function parseAppointment(raw: unknown): Appointment {
  const dto = raw as Appointment;
  return {
    ...dto,
    date: dto.date ? new Date(dto.date) : null,
  }
}




export const AppointmentsAPI = {
  list: async (): Promise<Appointment[]> => {
    const { data } = await apiClient.get<Appointment[]>("/appointments");
    return data.map(parseAppointment);
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<Appointment>(`/appointments/${id}`);
    return parseAppointment(data);
  },

  create: async (payload: Omit<Appointment, "id">) => {
    const { data } = await apiClient.post("/appointments", payload);
    return parseAppointment(data);
  },

  update: async (id: string, payload: Partial<Omit<Appointment, "id">>) => {
    const { data } = await apiClient.patch<Appointment>(
      `/appointments/${id}`,
      payload
    );
    return parseAppointment(data);
  },

  delete: async (id: string) => {
    await apiClient.delete(`/appointments/${id}`);
  },

  reschedule: async (id: string, date: string, status: string) => {
    const { data } = await apiClient.patch<Appointment>(
      `/appointments/${id}/reschedule`,
      { date, status }
    );
    return parseAppointment(data);
  },
} as const;
