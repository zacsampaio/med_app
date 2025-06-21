import { z } from "zod";

export const rescheduleSchema = z.object({
  date: z
    .string()
    .nonempty({ message: "Data Orbigatória." })
    .refine((v) => !isNaN(Date.parse(v)), {
      message: "Data inválida",
    })
    .refine((v) => {
      const date = new Date(v);
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      return date >= hoje;
    }, "A data deve ser hoje ou posterior")
    .refine(
      (v) => {
        const horario = new Date(v).getHours();
        return horario >= 8 && horario < 20;
      },
      { message: "O horário deve ser entre 08:00 e 20:00" }
    ),
});
