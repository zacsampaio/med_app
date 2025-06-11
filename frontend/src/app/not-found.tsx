import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col h-screen items-center bg-accent justify-center gap-6">
      <h1 className="text-4xl font-bold text-accent-foreground">
        Oops! Página não encontrada.
      </h1>
      <p className="text-accent-foreground">
        Voltar para o{" "}
        <Link href="/" className="text-sky-500 dark:text-sky-400">
          Dashboard
        </Link>
      </p>
    </div>
  );
}
