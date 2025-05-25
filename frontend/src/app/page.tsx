'use client'
import Link from "next/link";
import { api } from "@/lib/axios";
import { useEffect } from 'react'
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/");
      } catch {
        router.replace("/auth/sign-in");
      }
    };

    checkAuth()
  }, [router]);

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
