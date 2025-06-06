import type { DefaultSession } from 'next-auth';

export type roleForUser = 'alumni' | 'staff' | 'staff(admin)' | null;
// auth.d.ts
declare module 'next-auth' {
	interface Session {
		user: User & DefaultSession['user'];
	}

	interface User {
		role: any;
		verified: boolean;
		location: string | null;
		communities?: string[];
	}
}
