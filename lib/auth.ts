import { NextAuthOptions, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { simpleMongoClient } from "./mongodb";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<NextAuthUser | null> {
        const client = simpleMongoClient();
        await client.connect();

        const db = client.db(process.env.APP_DB);
        const user = await db.collection('users').findOne({ email: credentials?.email });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(credentials!.password, user.password);
        if (!isValid) return null;

        return {
          id: String(user._id),
          name: user.name,
          email: user.email,
          role: user.role || null, // Add missing properties
          verified: user.verified || false, // Add missing properties
          location: user.location || null, // Add missing properties
        } as NextAuthUser;
      },
    }),
  ],
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // On initial login
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.verified = user.verified;
        token.location = user.location;
      }

      // When update() is called from the client
      if (trigger === "update" && session) {
        if (session.name) token.name = session.name;
        if (session.verified !== undefined) token.verified = session.verified;
        if (session.location) token.location = session.location;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin',
  },
}

