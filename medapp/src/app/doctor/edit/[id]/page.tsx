"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Params {
  params: {
    id: string;
  };
}

export default function DoctorEdit({ params }: Params) {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [medicalSpecialty, setMedicalSpecialty] = useState<string>("");
  const [medicalRegistration, setMedicalRegistration] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const id = params.id;

  useEffect(() => {
    if (!id) {
      setError("ID do médico não fornecido.");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/getDoctor` + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token") || "",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
        setLogin(data.login);
        setPassword(data.password);
        setMedicalSpecialty(data.medicalSpecialty);
        setMedicalRegistration(data.medicalRegistration);
        setEmail(data.email);
        setPhone(data.phone);
      })
      .catch((err) => {
        console.error("Erro ao buscar dados do médico:", err);
        setError("Erro ao buscar dados do médico.");
      });
  }, [id]);

  const edit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    //Caso a variavel esteja vazia, vamos usar o valor que foi carregado pela página, caso ela esteja preenchida, vamos colocar o novo valor
    const formData = {
      name,
      login,
      password,
      medicalSpecialty,
      medicalRegistration,
      email,
      phone,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/updateDoctor/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: sessionStorage.getItem("token") || "",
          },
          body: JSON.stringify(formData),
        }
      );

      const content = await response.json();

      if (content.success) {
        router.push("/home");
      } else {
        setError(content.error);
      }
    } catch (err) {
      console.error("Erro ao atualizar médico:", err);
      setError("Erro ao atualizar médico.");
    }
  };

  return (
    <>
      <Link
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        href="/doctor/list"
      >
        Voltar
      </Link>
      <form className="w-full" onSubmit={edit}>
        <span className="font-bold text-yellow-500 py-2 block underline text-2xl">
          Formulário Criação de Médico
        </span>
        <div className="w-full py-2">
          <label htmlFor="" className="text-sm font-bold py-2 block">
            Nome
          </label>
          <input
            type="text"
            id="name"
            value={name}
            name="name"
            className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
        </div>
        <div className="w-full py-2">
          <label htmlFor="" className="text-sm font-bold py-2 block">
            Login
          </label>
          <textarea
            name="login"
            id="login"
            value={login}
            className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setLogin(e.target.value)
            }
          />
        </div>
        <div className="w-full py-2">
          <label htmlFor="" className="text-sm font-bold py-2 block">
            Senha
          </label>
          <input
            type="password"
            id="password"
            value={password}
            className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </div>
        <div className="w-full py-2">
          <label htmlFor="" className="text-sm font-bold py-2 block">
            Especialidade Médica
          </label>
          <textarea
            id="medicalSpecialty"
            value={medicalSpecialty}
            className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setMedicalSpecialty(e.target.value)
            }
          />
        </div>
        <div className="w-full py-2">
          <label htmlFor="" className="text-sm font-bold py-2 block">
            Registro Médico
          </label>
          <textarea
            name="medicalRegistration"
            id="medicalRegistration"
            value={medicalRegistration}
            className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setMedicalRegistration(e.target.value)
            }
          />
        </div>
        <div className="w-full py-2">
          <label htmlFor="" className="text-sm font-bold py-2 block">
            Email
          </label>
          <textarea
            name="email"
            id="email"
            value={email}
            className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-full py-2">
          <label htmlFor="" className="text-sm font-bold py-2 block">
            Telefone
          </label>
          <textarea
            name="phone"
            id="phone"
            value={phone}
            className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPhone(e.target.value)}
          />
        </div>
        <div className="w-full py-2">
          <button className="w-20 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400">
            Submit
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
        </div>
      </form>
    </>
  );
}
