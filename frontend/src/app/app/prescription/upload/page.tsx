"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Prescription } from "../../../../lib/types";

export default function PrescriptionCreate() {

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/prescriptions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token") || "",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPrescriptions(data);
      })
      .catch((err) => {
        console.error("Erro ao carregar prescrições:", err);
        setError("Erro ao carregar prescrições.");
      });
  }, []);

  const uploadPrescription = async (id: string) => {
    if (!file) {
      setError("Por favor, selecione um arquivo antes de fazer o upload.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/uploadPrescription/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: sessionStorage.getItem("token") || "",
          },
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error(await res.text());
      }

      setSuccess("Arquivo enviado com sucesso!");
      setPrescriptions((prev) =>
        prev.map((prescription) =>
          prescription._id === id ? { ...prescription, file: "uploaded" } : prescription
        )
      );
    } catch (err) {
      console.error("Erro ao fazer upload:", err);
      setError("Erro ao fazer upload do arquivo.");
    }
  };

  const showFile = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/readPrescription/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: sessionStorage.getItem("token") || "",
          },
        }
      );

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${id}.pdf`;
      link.click();
    } catch (err) {
      console.error("Erro ao visualizar arquivo:", err);
      setError("Erro ao visualizar o arquivo.");
    }
  };

  const generatePrescription = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/generatePrescription/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: sessionStorage.getItem("token") || "",
          },
        }
      );

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const content = await res.json();

      if (content._id) {
        setSuccess("Prescrição gerada com sucesso!");
        setPrescriptions((prev) =>
          prev.map((prescription) =>
            prescription._id === id ? { ...prescription, file: "generated" } : prescription
          )
        );
      } else {
        setError(content.error || "Erro ao gerar prescrição.");
      }
    } catch (err) {
      console.error("Erro ao gerar prescrição:", err);
      setError("Erro ao gerar prescrição.");
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
      <table className="w-full border-collapse border border-slate-400">
        <thead>
          <tr>
            <th className="border border-slate-300">Data</th>
            <th className="border border-slate-300 text-center">Medicamento</th>
            <th className="border border-slate-300 text-center">Dosagem</th>
            <th className="border border-slate-300 text-center">Instruções</th>
            <th className="border border-slate-300 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((prescription) => (
            <tr key={prescription._id}>
              <td className="border border-slate-300">{prescription.date}</td>
              <td className="border border-slate-300 text-center">
                {prescription.medicine}
              </td>
              <td className="border border-slate-300 text-center">
                {prescription.dosage}
              </td>
              <td className="border border-slate-300 text-center">
                {prescription.instructions}
              </td>
              <td className="border border-slate-300 text-center">
                {!prescription.file && (
                  <>
                    <input
                      type="file"
                      className="mb-2"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                    <button
                      onClick={() => uploadPrescription(prescription._id)}
                      className="bg-orange-500 p-2 inline-block text-white text-sm"
                    >
                      Upload
                    </button>
                  </>
                )}
                {prescription.file && (
                  <button
                    onClick={() => showFile(prescription._id)}
                    className="bg-green-500 p-2 inline-block text-white text-sm"
                  >
                    Ver arquivo
                  </button>
                )}
                <button
                  onClick={() => generatePrescription(prescription._id)}
                  className="bg-blue-500 p-2 inline-block text-white text-sm ml-2"
                >
                  Gerar Prescrição
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && (
        <div className="p-2 text-white border-gray-200 border-[1px] rounded-sm bg-red-400">
          {error}
        </div>
      )}
      {success && (
        <div className="p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400">
          {success}
        </div>
      )}
    </>
  );
}