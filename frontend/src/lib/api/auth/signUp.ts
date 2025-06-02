import { api } from "@/lib/axios";
import { AxiosError } from "axios";

interface SignUpBody {
  name: string;
  login: string;
  medicalSpecialty: string;
  medicalRegistration: string;
  email: string;
  phone: string;
  password: string;
}

export async function signUp({
  name,
  login,
  medicalSpecialty,
  medicalRegistration,
  email,
  phone,
  password,
}: SignUpBody) {
  try {
    const response = await api.post("/auth/register/doctor", {
      name,
      login,
      medicalSpecialty,
      medicalRegistration,
      email,
      phone,
      password,
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ error: string }>;
    const errorMessage =
      axiosError.response?.data?.error || "Erro ao realizar cadastro.";
    throw new Error(errorMessage);
  }
}
