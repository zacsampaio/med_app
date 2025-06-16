import { apiClient } from "../axiosClient";
import { Appointment } from "../types";


export const AppointmentsAPI = {
  list: async (): Promise<Appointment[]> => {
    const { data } = await apiClient.get<Appointment[]>("/appointments");
    return data;
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<Appointment>(`/appointments/${id}`);
    return data;
  },

  create: async (payload: Omit<Appointment, "id">) => {
    const { data } = await apiClient.post("/appointments", payload);
    return data;
  },

  update: async (id: string, payload: Partial<Omit<Appointment, "id">>) => {
    const { data } = await apiClient.patch<Appointment>(
      `/appointments/${id}`,
      payload
    );
    return data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`/appointments/${id}`);
  },

  reschedule: async (id: string, date: string) => {
    const { data } = await apiClient.patch<Appointment>(
      `/appointments/${id}/reschedule`,
      { date }
    );
    return data;
  },
} as const;
