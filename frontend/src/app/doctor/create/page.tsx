"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { DoctorFormData } from "../../../libs/types";

export default function DoctorCreate() {
  const router = useRouter();

  // Estado inicial utilizando a interface DoctorFormData
  const [formData, setFormData] = useState<DoctorFormData>({
    name: "",
    login: "",
    password: "",
    medicalSpecialty: "",
    medicalRegistration: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState<string | null>(null);

  const addDoctor = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Verifica se todos os campos estão preenchidos
    const isValid = Object.values(formData).every((value) => value !== "");
    if (isValid) {
      try {
        const add = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/postDoctor`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: sessionStorage.getItem("token") || "",
            },
            body: JSON.stringify(formData),
          }
        );

        const content = await add.json();

        if (content.login) {
          router.push("/home");
        } else {
          setError(content.error);
        }
      } catch (error) {
        console.error("Erro ao enviar os dados:", error);
        setError("Erro ao enviar os dados.");
      }
    } else {
      setError("Todos os campos são obrigatórios.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Link href="/home">Voltar</Link>
      <div>
        <form className="w-full" onSubmit={addDoctor}>
          <span className="font-bold text-yellow-500 py-2 block underline text-2x1">
            Formulário Criação de Médico
          </span>
          {Object.keys(formData).map((key) => (
            <div className="w-full py-2" key={key}>
              <label htmlFor={key} className="text-sm font-bold py-2 block">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                type="text"
                name={key}
                className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
                onChange={handleChange}
              />
            </div>
          ))}
          <div className="w-full py-2">
            <button className="w-20 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400">
              Submit
            </button>
          </div>
          <div>
            {error && (
              <div
                className="text-white border-[1px] border-gray-200 p-2 rounded-sm bg-red-400"
                style={{ color: "red" }}
              >
                {error}
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
