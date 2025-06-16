"use client"
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

export function SignOut() {
  const router = useRouter();

  const handleLogOut = async () => {
    await signOut({ redirect: false });

    router.push("/auth/sign-in");
  };

  return (
    <Button onClick={handleLogOut} variant="ghost" >
      Sair
    </Button>
  );
}
