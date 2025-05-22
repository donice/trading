import { Metadata } from 'next';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Admin - XM Asssets',
  description: 'Admin panel for XM Asssets platform',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Check if the user is an admin
  if (!session || session.user.role !== ('admin' as typeof session.user.role)) {
    redirect('/auth/signin');
  }

  return (
    <div className="flex min-h-screen bg-muted/20">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}