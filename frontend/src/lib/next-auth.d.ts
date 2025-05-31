// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      login: string;
      token: string;
    };
  }

  interface User {
    login: string;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    login: string;
    accessToken: string;
  }
}
