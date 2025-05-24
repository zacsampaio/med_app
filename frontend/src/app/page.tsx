"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const authentication = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (login && password) {
      const formData = {
        login,
        password,
      };

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );

        const content = await response.json();

        if (content.token) {
          sessionStorage.setItem("token", content.token);
          router.push("/home");
        } else {
          setError(content.error || "Erro ao realizar login.");
        }
      } catch (err) {
        console.error("Erro ao realizar login:", err);
        setError("Erro ao realizar login.");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Todos os campos são obrigatórios.");
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="w-full" onSubmit={authentication}>
        <span className="font-bold text-blue-500 py-2 block text-2xl">
          Login
        </span>
        <div className="w-full py-2">
          <label htmlFor="login" className="text-sm font-bold py-2 block">
            Usuário
          </label>
          <input
            type="text"
            id="login"
            name="login"
            value={login}
            className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLogin(e.target.value)
            }
          />
        </div>
        <div className="w-full py-2">
          <label htmlFor="password" className="text-sm font-bold py-2 block">
            Senha
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </div>
        <div className="w-full py-2">
          <button
            type="submit"
            className="w-20 p-2 text-white border-[1px] border-gray-200 rounded-sm bg-green-400"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Login"}
          </button>
        </div>
        <div>
          {error && (
            <div
              className="p-2 text-white border-[1px] border-gray-200 rounded-sm bg-red-400"
              style={{ color: "red" }}
            >
              {error}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
