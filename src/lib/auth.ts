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
  },
  providers: [
    Credentials({
        authorize: async (credentials: {email: string, password: string}) => {
          const user = await prisma.user.findUnique({
            where: { 
                email: credentials.email,
                password: credentials.password
            },
          });

          if(user != null) {
            return user
          }

          return null;
        },
      }),
  ],
  session: {
    strategy: 'jwt'
  },
})