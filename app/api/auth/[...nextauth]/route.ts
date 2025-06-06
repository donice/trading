import { User as NextAuthUser } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import { simpleMongoClient } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<NextAuthUser | null> {
        console.log("CREDENTIALS", credentials);
        const client = simpleMongoClient();
        await client.connect();

        const db = client.db(process.env.APP_DB ?? "trading");
        const user = await db.collection('users').findOne({ email: credentials?.email });

        console.log("USER", user);

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(credentials!.password, user.password);
        if (!isValid) return null;

        return {
          id: String(user._id),
          name: user.name,
          email: user.email,
          role: user.role || null,
          verified: user.verified || false,
          location: user.location || null,
        } as NextAuthUser;
      },
    }),
  ],
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin',
  },
});

export { handler as GET, handler as POST };
