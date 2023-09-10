import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials as any;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordMatched = await bcrypt.compare(password, user.password);

          if (!passwordMatched) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Login Error: ", error);
        }
      },
    }),
  ],

  session: {
    stratergy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions as any);

export { handler as GET, handler as POST };
