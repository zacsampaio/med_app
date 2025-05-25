import { api } from "@/lib/axios";

export interface SignInBody {
  login: string
  password: string
}

export async function signIn({login, password} : SignInBody){
  await api.post('/login', {login, password})
}