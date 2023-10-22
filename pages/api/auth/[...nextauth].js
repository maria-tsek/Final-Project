import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/db/mongodb";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(data) {
        return {
          id: data.id,
          name: data.name,
          email: data.email,
          image: data.avatar_url,
          admin: false,
          preferedColors: ["#dddddd", "#ffffff"],
        };
      },
    }),
    // Add more providers if needed
  ],
  adapter: MongoDBAdapter(clientPromise), // Use the adapter correctly

  callbacks: {
    async session({ session, user }) {
      session.user.userId = user.id;
      return session;
    },
    // Add more callbacks if needed
  },
};

export default NextAuth(authOptions);
