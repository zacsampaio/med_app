import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "../../../../../env";

interface BackendLoginResponse {
  id: string;
  login: string;
  token: string;
  expiresIn: number;
}

interface CustomUser extends BackendLoginResponse {
  accessTokenExpires: number;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        login: { label: "Login", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.login || !credentials?.password) return null;

        const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        if (!res.ok) return null;
        const data: BackendLoginResponse = await res.json();

        const user: CustomUser = {
          ...data,
          accessTokenExpires: Date.now() + data.expiresIn * 1000,
        };

        return user;
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    // Grava os dados no token do NextAuth e não no JWT do backend!
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as CustomUser).id;
        token.login = (user as CustomUser).login;
        token.accessToken = (user as CustomUser).token;
        token.accessTokenExpires = (user as CustomUser).accessTokenExpires;
      }

      if (Date.now() > (token.accessTokenExpires as number)) {
        token.error = "TokenExpired" // Desloga se o token expirar, tornando o getSession() null!
      }

      return token;
    },

    async session({ session, token }) {
      if (token?.accessToken) {
        session.user = {
          ...session.user,
          id: token.id as string,
          login: token.login as string,
          token: token.accessToken as string,
        };
        session.expires = new Date(
          token.accessTokenExpires as number
        ).toISOString();
      }

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
