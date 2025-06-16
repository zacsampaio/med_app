import axios from "axios";
import { env } from "../../env";
import { getSession } from "next-auth/react";


export const apiClient = axios.create({
  baseURL: `${env.NEXT_PUBLIC_API_URL}/api`,
  withCredentials: true,
})

apiClient.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.user?.token){
    config.headers.Authorization = `Bearer ${session.user.token}`;
  }
  return config
})