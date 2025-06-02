import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  login: z.string().min(1, "Login obrigatório"),
  medicalSpecialty: z.string().min(1, "Especialidade obrigatória"),
  medicalRegistration: z.string().min(1, "Registro médico obrigatório"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(1, "Telefone obrigatório"),
  password: z.string().min(6, "Senha precisa ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(6, "Confirmação da senha é obrigatória"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas precisam ser iguais",
  path: ["confirmPassword"],
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
