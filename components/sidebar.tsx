'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { TrendingUp, LayoutDashboard, Coins as CoinsStacked, BarChart3, Home, Wallet, Upload, Bell, Settings, User, Users, Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAdmin = session?.user?.role === 'staff(admin)';

  const routes = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/dashboard',
      active: pathname === '/dashboard',
    },
    {
      label: 'Assets',
      icon: CoinsStacked,
      href: '/dashboard/assets',
      active: pathname === '/dashboard/assets',
    },
    {
      label: 'Trade',
      icon: BarChart3,
      href: '/dashboard/trade',
      active: pathname === '/dashboard/trade',
    },
    {
      label: 'Market',
      icon: TrendingUp,
      href: '/dashboard/market',
      active: pathname === '/dashboard/market',
    },
    // {
    //   label: 'Real Estate',
    //   icon: Home,
    //   href: '/dashboard/real-estate',
    //   active: pathname === '/dashboard/real-estate',
    // },
    {
      label: 'Deposit',
      icon: Upload,
      href: '/dashboard/deposit',
      active: pathname === '/dashboard/deposit',
    },
    // {
    //   label: 'Signals',
    //   icon: Bell,
    //   href: '/dashboard/signals',
    //   active: pathname === '/dashboard/signals',
    // },
    // {
    //   label: 'Settings',
    //   icon: Settings,
    //   href: '/dashboard/settings',
    //   active: pathname === '/dashboard/settings',
    // },
    // {
    //   label: 'Profile',
    //   icon: User,
    //   href: '/dashboard/profile',
    //   active: pathname === '/dashboard/profile',
    // },
  ];

  const adminRoutes = [
    {
      label: 'Users',
      icon: Users,
      href: '/admin/users',
      active: pathname === '/admin/users',
    },
    {
      label: 'Wallets',
      icon: Wallet,
      href: '/admin/wallets',
      active: pathname === '/admin/wallets',
    },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Mobile Navigation */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="outline" size="icon" className="absolute left-4 top-4 z-50">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-full flex-col border-r bg-background">
            <div className="flex h-14 items-center border-b px-4">
              <Link href="/" className="flex items-center gap-2 font-bold">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>XM Asssets</span>
              </Link>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-2 text-sm font-medium">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground',
                      route.active && 'bg-muted text-foreground'
                    )}
                  >
                    <route.icon className="h-4 w-4" />
                    {route.label}
                  </Link>
                ))}

                {isAdmin && (
                  <>
                    <div className="my-2 px-3 text-xs font-semibold text-muted-foreground">
                      Admin
                    </div>
                    {adminRoutes.map((route) => (
                      <Link
                        key={route.href}
                        href={route.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground',
                          route.active && 'bg-muted text-foreground'
                        )}
                      >
                        <route.icon className="h-4 w-4" />
                        {route.label}
                      </Link>
                    ))}
                  </>
                )}
              </nav>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <div className={cn('hidden border-r bg-background lg:block', className)}>
        <div className="flex h-full w-64 flex-col">
          <div className="flex h-14 items-center border-b px-4">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>XM Asssets</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-2 text-sm font-medium">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground',
                    route.active && 'bg-muted text-foreground'
                  )}
                >
                  <route.icon className="h-4 w-4" />
                  {route.label}
                </Link>
              ))}

              {isAdmin && (
                <>
                  <div className="my-2 px-3 text-xs font-semibold text-muted-foreground">
                    Admin
                  </div>
                  {adminRoutes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground',
                        route.active && 'bg-muted text-foreground'
                      )}
                    >
                      <route.icon className="h-4 w-4" />
                      {route.label}
                    </Link>
                  ))}
                </>
              )}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}