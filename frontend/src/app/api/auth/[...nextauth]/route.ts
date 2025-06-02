import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface CustomUser {
  id: string;
  login: string;
  token: string;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        login: { label: "Login", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.login || !credentials?.password) return null;

        // Faz a requisição diretamente no backend Express
        const response = await fetch("http://localhost:3001/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            login: credentials.login,
            password: credentials.password,
          }),
          credentials: "include",
        });

        if (!response.ok) return null;

        const data = await response.json();

        // Retorna o objeto do usuário que será salvo no token JWT
        const user: CustomUser = {
          id: "IdLogin", // Pode usar algum ID real aqui, se tiver
          login: credentials.login,
          token: data.token,
        };

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.login = user.login;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        login: token.login,
        token: token.accessToken,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
