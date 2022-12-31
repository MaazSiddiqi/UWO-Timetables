import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@lib/prisma"
import { AdapterUser } from "next-auth/adapters"

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  callbacks: {
    async session({ session }) {
      const profile = await prisma.profile.findUnique({
        where: { email: session.user.email || "" },
        include: {
          timetables: true,
        },
      })

      const newSession = { ...session, profile }
      return newSession
    },
  },
})
