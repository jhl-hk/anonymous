import NextAuth, { AuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user }) {
      // fetch user email
      const userEmail = user.email;

      // if no email
      if (!userEmail) {
        console.log("GitHub 用户没有提供邮箱，拒绝登录");
        return false;
      }

      const GITHUB_EMAIL_WHITELIST = process.env.GITHUB_EMAIL_WHITELIST || "";

      // check with environmental variables
      if (GITHUB_EMAIL_WHITELIST.includes(userEmail)) {
        return true;
      }

      // refuse login
      return false;
    },
  },
  pages: {
    error: "/", // 当用户被拒绝登录时重定向到此页面
    signOut: "/", // 自定义退出登录页面
  },
}

export default NextAuth(authOptions)