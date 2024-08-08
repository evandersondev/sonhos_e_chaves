import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/login',
    signOut: '/login',
    verifyRequest: '/login',
    error: '/login',
    newUser: '/'
  },
  providers: [
    Credentials({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        authorize: async (credentials) => {
          const user = await prisma.user.findUnique({
            where: { 
                email: credentials.email as string,
                password: credentials.password
            },
          });
  
          if (user) {
            return user;
          }
  
          return null;
        },
      }),
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    jwt:  async ({token, user}) => {
        if (user) {
          token.id = user.id;
        }

        console.log(token)
        return token;
      },
    session: async ({session, token}) => {
      session.user.id = token.id as string;
      console.log(session, token)

      return session;
    }
  }
})