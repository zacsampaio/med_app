"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Doctor } from "../../types";

export default function DoctorList() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token") || "",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDoctors(data);
        } else {
          setError("Erro ao carregar a lista de médicos.");
        }
      })
      .catch((err) => {
        setError("Erro na requisição.");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const deleteDoctor = async (id: string) => {
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/doctors/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: sessionStorage.getItem("token") || "",
          },
        }
      );

      const content = await response.json();

      if (content.success) {
        setDoctors((prev) => prev.filter((doctor) => doctor._id !== id));
        setSuccess("Médico excluído com sucesso.");
      } else {
        setError(content.error || "Erro ao excluir o médico.");
      }
    } catch (err) {
      console.error("Erro ao excluir médico:", err);
      setError("Erro ao excluir o médico.");
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
      <h1 className="text-xl font-bold mb-4">Lista de Médicos</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <table className="w-full border-collapse border border-slate-400">
          <thead>
            <tr>
              <th className="border border-slate-300">Nome</th>
              <th className="border border-slate-300 text-center">Login</th>
              <th className="border border-slate-300 text-center">
                Especialidade Médica
              </th>
              <th className="border border-slate-300 text-center">
                Registro Médico
              </th>
              <th className="border border-slate-300 text-center">Email</th>
              <th className="border border-slate-300 text-center">Telefone</th>
              <th className="border border-slate-300 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <tr key={doctor._id}>
                  <td className="border border-slate-300">{doctor.name}</td>
                  <td className="border border-slate-300 text-center">
                    {doctor.login}
                  </td>
                  <td className="border border-slate-300 text-center">
                    {doctor.medicalSpecialty}
                  </td>
                  <td className="border border-slate-300 text-center">
                    {doctor.medicalRegistration}
                  </td>
                  <td className="border border-slate-300 text-center">
                    {doctor.email}
                  </td>
                  <td className="border border-slate-300 text-center">
                    {doctor.phone}
                  </td>
                  <td className="border border-slate-300 text-center">
                    <button
                      onClick={() => deleteDoctor(doctor._id)}
                      className="bg-red-500 p-2 inline-block text-white text-sm"
                    >
                      Delete
                    </button>
                    <Link
                      href={`/doctor/edit/${doctor._id}`}
                      className="bg-yellow-500 p-2 inline-block ml-3 text-white text-sm"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center">
                  Nenhum médico encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
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
    </>
  );
}