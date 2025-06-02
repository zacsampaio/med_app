"use client";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { SignUpFormData, signUpSchema } from "@/lib/schemas/signUp-schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "@/lib/api/auth/signUp";
import { useMutation } from "@tanstack/react-query";

export interface SingUpBody {
  login: string;
  password: string;
}

export default function SingUp() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const { mutateAsync: signUpMutate } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success("Cadastro realizado com sucesso!");
      router.push("/auth/sign-in");
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Erro ao realizar cadastro.");
      }
    },
  });

  async function handleSignUp(data: SignUpFormData) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...dataToSend } = data;
      await signUpMutate(dataToSend);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="align-center absolute top-8 right-48">
        <Button variant={"ghost"} asChild className="absolute left-14">
          <Link href="/auth/sign-in">Acessar</Link>
        </Button>
        <ThemeToggle />
      </div>

      <div className="justify-content flex w-[350px] flex-col gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Realizar Cadastro
          </h1>
        </div>
        <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" {...register("name")} />

            <Label htmlFor="login">Login</Label>
            <Input id="login" {...register("login")} />

            <Label htmlFor="medicalSpecialty">Especialidade Médica</Label>
            <Input id="medicalSpecialty" {...register("medicalSpecialty")} />

            <Label htmlFor="medicalRegistration">Registro Médico</Label>
            <Input
              id="medicalRegistration"
              type="medicalRegistration"
              {...register("medicalRegistration")}
            />

            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />

            <Label htmlFor="phone">Telefone</Label>
            <Input id="phone" type="phone" {...register("phone")} />

            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" {...register("password")} />

            <Label htmlFor="confirmPassword">Confirmação da Senha</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer text-foreground"
          >
            {isSubmitting ? "Criando cadastro.." : "Finalizar Cadastro"}
          </Button>

          <p className="text-muted-foreground px-6 text-center text-sm leading-relaxed">
            Ao continuar, você concorda com nossos{" "}
            <a className="underline underline-offset-4" href="">
              termos de serviços
            </a>{" "}
            e{" "}
            <a className="underline underline-offset-4" href="">
              políticas de privacidade{" "}
            </a>
            .
          </p>
        </form>
      </div>
    </>
  );
}
