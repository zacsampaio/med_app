"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Doctor, Patient } from "../../types";

export default function AppointmentCreate() {
  const router = useRouter();

  const [date, setDate] = useState<string>("");
  const [doctorId, setDoctorId] = useState<string>("");
  const [patientId, setPatientId] = useState<string>("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);

  const [error, setError] = useState<string | null>(null);

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
        setDoctors(data);
      });
  }, [doctors]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/patients`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token") || "",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPatients(data);
      });
  }, [patients]);

  const addAppointment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (date != "" && doctorId != "" && patientId != "") {
      const formData = {
        date,
        doctorId,
        patientId,
      };

      try {
        const add = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/postAppointment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: sessionStorage.getItem("token") || "",
          },
          body: JSON.stringify(formData),
        });
  
        const content = await add.json();
  
        if (content.login) {
          router.push("/home");
        } else {
          setPatients(content.error);
        }
      } catch (error) {
        console.error("Erro ao enviar os dados:", error);
        setError("Erro ao enviar os dados.");
      }
    } else {
      setError("Todos os campos são obrigatórios.");
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
      <form className="w-full" onSubmit={addAppointment}>
        <span className="font-bold text-yellow-500 py-2 block underline text-2xl">
          Formulário Criação de Consultas
        </span>
        <div className="w-full py-2">
          <label htmlFor="" className="text-sm font-bold py-2 block">
            Data
          </label>
          <input
            type="datetime-local"
            name="date"
            className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
          />
        </div>
        <div className="w-full py-2">
          <label htmlFor="" className="text-sm font-bold py-2 block">
            Médico
          </label>
          <select
            id="doctorId"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDoctorId(e.target.value)}
          >
            {doctors.map((doctor, i) => (
              <option key={i} value={doctor._id}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full py-2">
          <label htmlFor="" className="text-sm font-bold py-2 block">
            Paciente
          </label>
          <select
            id="patientId"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPatientId(e.target.value)}
          >
            {patients.map((patient, i) => (
              <option key={i} value={patient._id}>
                {patient.name}
              </option>
            ))}
          </select>
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
