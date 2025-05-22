import NextAuth from 'next-auth';
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
      async authorize(credentials) {
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
          verified: true, // Add required properties
          location: '',   // Add required properties
        } as { id: string; name: string; email: string; verified: boolean; location: string }; // Explicitly define the User type inline
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin', // same page for simplicity
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
