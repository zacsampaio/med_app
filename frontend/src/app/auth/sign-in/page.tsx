"use client";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { toast } from "sonner";
import { signIn, SignInBody } from "@/api/sign-in";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInBody>();

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  });

  async function handleSignIn(data: SignInBody) {
    try {
      await authenticate(data);
      toast.success("Login realizado com sucesso!");
      router.push('/')
    } catch {
      toast.error("Credenciais inválidas.");
    }
  }

  return (
    <>
      <div className="align-center absolute top-8 right-48">
        <Button variant={"ghost"} asChild className="absolute left-14">
          <Link href="/sign-up">Novo Acesso</Link>
        </Button>
        <ThemeToggle />
      </div>

      <div className="justify-content flex w-[350px] flex-col gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Acessar painel
          </h1>
        </div>
        <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="login">Login</Label>
            <Input id="login" {...register("login")} />

            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" {...register("password")} />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer text-foreground"
          >
            {isSubmitting ? "Acessando.." : "Acessar Painel"}
          </Button>
        </form>
      </div>
    </>
  );
}
