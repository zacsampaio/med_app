"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Params {
  params: {
    id: string;
  };
}

export default function PrescriptionCreate({ params }: Params) {
  const router = useRouter();

  const [date, setDate] = useState<string>("");
  const [medicine, setMedicine] = useState<string>("");
  const [dosage, setDosage] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const appointmentId = params.id;

  const addPrescription = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (date && medicine && dosage) {
      const formData = {
        date,
        appointmentId,
        medicine,
        dosage,
        instructions,
      };

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/postPrescription`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: sessionStorage.getItem("token") || "",
            },
            body: JSON.stringify(formData),
          }
        );

        const content = await response.json();

        if (content.date) {
          router.push("/home");
        } else {
          setError(content.error || "Erro ao criar prescrição.");
        }
      } catch (err) {
        console.error("Erro ao criar prescrição:", err);
        setError("Erro ao criar prescrição.");
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
      <Link
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        href="/home"
      >
        Voltar
      </Link>
      <form className="w-full" onSubmit={addPrescription}>
        <span className="font-bold text-yellow-500 py-2 block underline text-2xl">
          Formulário de prescrição
        </span>
        <div className="w-full py-2">
          <label htmlFor="date" className="text-sm font-bold py-2 block">
            Data da prescrição
          </label>
          <input
            type="date"
            id="date"
            value={date}
            className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDate(e.target.value)
            }
          />
        </div>
        <div className="w-full py-2">
          <label htmlFor="medicine" className="text-sm font-bold py-2 block">
            Medicamento
          </label>
          <input
            type="text"
            id="medicine"
            value={medicine}
            className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMedicine(e.target.value)
            }
          />
        </div>
        <div className="w-full py-2">
          <label htmlFor="dosage" className="text-sm font-bold py-2 block">
            Dosagem
          </label>
          <input
            type="text"
            id="dosage"
            value={dosage}
            className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDosage(e.target.value)
            }
          />
        </div>
        <div className="w-full py-2">
          <label htmlFor="instructions" className="text-sm font-bold py-2 block">
            Instruções de uso
          </label>
          <textarea
            id="instructions"
            value={instructions}
            className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setInstructions(e.target.value)
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
        </div>
      </form>
    </>
  );
}