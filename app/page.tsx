import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight, ArrowRight, Shield, Wallet, TrendingUp } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <TrendingUp className="h-6 w-6 text-primary" />
            <span>XM Asssets</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline">Features</Link>
            <Link href="#markets" className="text-sm font-medium hover:underline">Markets</Link>
            <Link href="#about" className="text-sm font-medium hover:underline">About</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth/signin">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-[1fr_500px] items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Trade with Confidence
                  </h1>
                  <p className="max-w-[700px] text-muted-foreground md:text-xl">
                    A secure and intuitive platform for trading Bitcoin and Ethereum. Get real-time market data and expert signals.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/auth/signup">
                    <Button size="lg" className="gap-2">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto lg:mx-0 rounded-lg overflow-hidden">
                <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl overflow-hidden p-8">
                  <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,#000000_1.5px,transparent_1.5px),linear-gradient(90deg,#000000_1.5px,transparent_1.5px)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/10 to-primary/5"></div>
                  </div>
                  <div className="relative flex flex-col items-center justify-center gap-4 p-4">
                    <div className="w-full max-w-md rounded-lg bg-background/80 p-6 backdrop-blur shadow-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium">BTC/USD</div>
                          <div className="text-2xl font-bold">$63,897.24</div>
                          <div className="text-xs text-green-500">+3.24%</div>
                        </div>
                        <div className="h-12 w-12 bg-chart-1/10 rounded-full flex items-center justify-center">
                          <TrendingUp className="h-6 w-6 text-chart-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-12 md:py-24 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Platform Features</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Our platform offers a comprehensive suite of tools for traders of all levels.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-bold">Real-time Trading</h3>
                <p className="mt-2 text-muted-foreground">
                  Trade Bitcoin and Ethereum with real-time market data and instant execution.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-bold">Secure Platform</h3>
                <p className="mt-2 text-muted-foreground">
                  Industry-leading security practices to keep your assets safe.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-bold">Asset Management</h3>
                <p className="mt-2 text-muted-foreground">
                  Easily deposit, withdraw, and manage your cryptocurrency portfolio.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to start trading?</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Create an account in minutes and start trading your favorite cryptocurrencies.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/auth/signup">
                  <Button size="lg">Create Account</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 font-bold">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>XM Asssets</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 XM Asssets. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}