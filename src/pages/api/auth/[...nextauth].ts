import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import type { NextAuthOptions } from "next-auth";
import type { Session, User, Account } from "next-auth";
import pool from "@/lib/db";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: User; account: Account | null }) {
      if (account?.provider === "github") {
        try {
          const { id, name, email, image } = user;
          await pool.query(
            `INSERT INTO users (id, name, email, image) VALUES (?, ?, ?, ?) 
             ON DUPLICATE KEY UPDATE name = VALUES(name), image = VALUES(image)`,
            [id, name, email, image]
          );
        } catch (error) {
          console.error("Database insert error:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }: { session: Session; token: any }) {
      if (session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
