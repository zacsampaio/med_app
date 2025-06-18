import axios from "axios";
import { env } from "../../env";
import { getSession, signOut } from "next-auth/react";
import { jwtDecode } from "jwt-decode";

type JWTPayload = { exp: number };

export const apiClient = axios.create({
  baseURL: `${env.NEXT_PUBLIC_API_URL}/api`,
  withCredentials: true,
});

apiClient.interceptors.request.use(async (config) => {
  const session = await getSession();
  const token = session?.user?.token;

  if (token) {
    const { exp } = jwtDecode<JWTPayload>(token);
    if (Date.now() >= exp * 1000) {
      await signOut({ redirect: true, callbackUrl: "/auth/sign-in" });

      return Promise.reject(new axios.Cancel("Token expirado"));
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      await signOut({ redirect: true, callbackUrl: "/auth/sign-in" });
    }

    return Promise.reject(error);
  }
);
