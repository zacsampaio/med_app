"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // espera carregar

    if (!session) {
      router.replace("/auth/sign-in");
    }
  }, [session, status, router]);


  return (
    <>
      <h1>Home</h1>
      <div>
        <Link href="/doctor/create">Criar um novo doutor</Link>
        <br></br>
        <Link href="/doctor/list">Listar todos os doutores</Link>
        <br></br>
        <Link href="/patient/create">Criar um novo paciente</Link>
        <br></br>
        <Link href="/appointment/create">Criar uma nova consulta</Link>
        <br></br>
        <Link href="/prescription/create">Criar uma nova prescrição</Link>
        <br></br>
        <Link href="/prescription/upload">Enviar prescrição</Link>
        <br></br>
      </div>
    </>
  );
}
