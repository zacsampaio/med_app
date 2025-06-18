// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      login: string;
      token: string;
    } & DefaultSession["user"];
    /** cópia do expirado, se precisar */
    error?: "TokenExpired";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    login: string;
    accessToken: string;
    accessTokenExpires: number;
    /** flag de erro opcional */
    error?: "TokenExpired";
  }
}
