"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function PatientCreate() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const addPatient = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (name && birthDate && email && phone) {
      const formData = {
        name,
        birthDate,
        email,
        phone,
      };

      try {
        const add = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/postPatient`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );

        const content = await add.json();

        if (content.success) {
          setSuccess("Paciente criado com sucesso!");
          setTimeout(() => {
            router.push("/home");
          }, 2000);
        } else {
          setError(content.error || "Erro ao criar paciente.");
        }
      } catch (err) {
        console.error("Erro ao criar paciente:", err);
        setError("Erro ao criar paciente.");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Todos os campos são obrigatórios.");
      setLoading(false);
    }
  };

  return (
    <>
      <Link href="/home" className="font-medium text-blue-600 hover:underline">
        Voltar
      </Link>
      <div>
        <form className="w-full" onSubmit={addPatient}>
          <span className="font-bold text-yellow-500 py-2 block underline text-2xl">
            Formulário Criação de Paciente
          </span>
          <div className="w-full py-2">
            <label htmlFor="name" className="text-sm font-bold py-2 block">
              Nome
            </label>
            <input
              type="text"
              id="name"
              value={name}
              className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
          </div>
          <div className="w-full py-2">
            <label htmlFor="birthDate" className="text-sm font-bold py-2 block">
              Data de nascimento
            </label>
            <input
              id="birthDate"
              type="date"
              value={birthDate}
              className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBirthDate(e.target.value)
              }
            />
          </div>
          <div className="w-full py-2">
            <label htmlFor="email" className="text-sm font-bold py-2 block">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </div>
          <div className="w-full py-2">
            <label htmlFor="phone" className="text-sm font-bold py-2 block">
              Telefone
            </label>
            <input
              id="phone"
              type="text"
              value={phone}
              className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPhone(e.target.value)
              }
            />
          </div>
          <div className="w-full py-2">
            <button
              type="submit"
              className="w-20 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Submit"}
            </button>
          </div>
          <div>
            {error && (
              <div
                className="p-2 text-white border-gray-200 border-[1px] rounded-sm bg-red-400"
                style={{ color: "red" }}
              >
                {error}
              </div>
            )}
            {success && (
              <div
                className="p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400"
                style={{ color: "green" }}
              >
                {success}
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
