import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import db from "../../../utils/db";
import User from "../../../components/Models/User";
import bcryptjs from "bcryptjs";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../utils/mongodb";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;
      if (user?.fullName) token.fullName = user.fullName;
      if (user?.userName) token.userName = user.userName;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      return session;
    },
  },
  providers: [
    CredentialProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        await db.connect();
        const user = await User.findOne({
          email: req.body.email,
        });
        await db.disconnect();
        if (user && bcryptjs.compareSync(credentials.password, user.password)) {
          return {
            _id: user._id,
            name: user.userName,
            email: user.email,
            isAdmin: user.isAdmin,
            telephone: user.telephone,
            userName: user.userName,
          };
        }
        throw new Error("Invalid email or password");
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
});
