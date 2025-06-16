"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Shield,
  Wallet,
  TrendingUp,
  BarChart2,
  Clock,
  Globe,
  Users,
  PieChart,
  Bell,
  Award,
  Lock,
  Mail,
  Phone,
} from "lucide-react";
import NumberFlow from "@number-flow/react";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import Image from "next/image";

const users = [
  { name: "Michael K.", amount: "$2,450", currency: "BTC" },
  { name: "Sarah L.", amount: "$5,780", currency: "ETH" },
  { name: "David P.", amount: "$1,230", currency: "BTC" },
  { name: "Jennifer T.", amount: "$3,420", currency: "ETH" },
  { name: "Robert G.", amount: "$8,950", currency: "BTC" },
  { name: "Emily S.", amount: "$4,560", currency: "ETH" },
  { name: "Thomas W.", amount: "$6,780", currency: "BTC" },
  { name: "Olivia M.", amount: "$2,340", currency: "ETH" },
  { name: "William B.", amount: "$7,890", currency: "BTC" },
  { name: "Sophia H.", amount: "$3,670", currency: "ETH" },
  // Add more users as needed up to 100
];

const assets = [
  { symbol: "BTC", name: "Bitcoin", price: 63897.24, change: 3.24 },
  { symbol: "ETH", name: "Ethereum", price: 3421.56, change: 1.78 },
  { symbol: "SOL", name: "Solana", price: 145.32, change: 5.42 },
  { symbol: "ADA", name: "Cardano", price: 0.45, change: -0.32 },
  { symbol: "DOT", name: "Polkadot", price: 6.78, change: 2.15 },
];

const features = [
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Real-time Trading",
    description:
      "Execute trades instantly with our lightning-fast matching engine and real-time market data.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Bank-grade Security",
    description:
      "Your assets are protected with multi-signature wallets and cold storage solutions.",
  },
  {
    icon: <BarChart2 className="h-6 w-6" />,
    title: "Advanced Charts",
    description:
      "Professional trading tools with customizable indicators and drawing tools.",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "24/7 Support",
    description:
      "Our support team is available around the clock to assist you.",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Global Access",
    description:
      "Trade from anywhere in the world with our mobile and web platforms.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Social Trading",
    description: "Follow and copy the strategies of top-performing traders.",
  },
];

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Professional Trader",
    content:
      "The platform's advanced charting tools and fast execution have transformed my trading strategy.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Maria Garcia",
    role: "Crypto Investor",
    content:
      "I've tried many exchanges, but none match the security and ease of use of this platform.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "James Wilson",
    role: "Institutional Client",
    content:
      "The API integration and liquidity options make this our preferred trading venue.",
    avatar: "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function Home() {
  useEffect(() => {
    const interval = setInterval(() => {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      toast.success(
        <div>
          <p className="font-medium">
            {randomUser.name} just withdrew {randomUser.amount} in{" "}
            {randomUser.currency}
          </p>
          <p className="text-xs text-gray-500">Just now</p>
        </div>,
        {
          icon: <Wallet className="h-5 w-5 text-green-500" />,
          position: "bottom-right",
        }
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Toaster />
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex mx-auto h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2 font-bold">
            <TrendingUp className="h-6 w-6 text-primary" />
            <span className="text-lg">XM Assets Pro</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="#markets"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Markets
            </Link>
            <Link
              href="#security"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Security
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Testimonials
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth/signin">
              <Button variant="outline" className="inline-flex">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="inline-flex">Get Started</Button>
            </Link>

          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    Trusted by 500,000+ traders worldwide
                  </span>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                    The Professional{" "}
                    <span className="text-primary">Crypto Trading</span>{" "}
                    Platform
                  </h1>
                  <p className="max-w-[600px] text-lg text-muted-foreground">
                    Institutional-grade trading tools with retail simplicity.
                    Trade Bitcoin, Ethereum, and 100+ cryptocurrencies with low
                    fees and high liquidity.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                  <Link href="/auth/signup">
                    <Button size="lg" className="gap-2 px-8">
                      Start Trading <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#demo">
                    <Button size="lg" variant="outline" className="px-8">
                      Live Demo
                    </Button>
                  </Link>
                </div>
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[
                        "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                      ].map((img, i) => (
                        <Image
                          key={i}
                          src={img as string}
                          className="h-8 w-8 rounded-full border-2 border-background"
                          alt={`User ${i}`}
                          width={100}
                          height={100}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      500K+ Active Traders
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    <span className="text-sm text-muted-foreground">
                      Best Crypto Platform 2024
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -top-8 -right-8 -z-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
                <div className="rounded-xl border bg-card p-6 shadow-xl">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <h3 className="font-semibold">Market Overview</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        24h
                      </Button>
                      <Button variant="outline" size="sm">
                        1W
                      </Button>
                      <Button size="sm">1M</Button>
                    </div>
                  </div>
                  <div className="mt-4 space-y-4">
                    {assets.map((asset) => (
                      <div
                        key={asset.symbol}
                        className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="font-medium">{asset.symbol}</span>
                          </div>
                          <div>
                            <p className="font-medium">{asset.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {asset.symbol}/USD
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            ${asset.price.toLocaleString()}
                          </p>
                          <p
                            className={`text-sm ${
                              asset.change > 0
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {asset.change > 0 ? "+" : ""}
                            {asset.change}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Button variant="outline" className="w-full">
                      View All Markets
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {[
                "https://banner2.cleanpng.com/20180611/zsb/aa8ovtjoy.webp",
                "https://e7.pngegg.com/pngimages/727/671/png-clipart-bloomberg-round-logo-icons-logos-emojis-iconic-brands.png",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/CoinDesk_logo.svg/1024px-CoinDesk_logo.svg.png",
                "https://e7.pngegg.com/pngimages/669/74/png-clipart-tc-techcrunch-logo-illustration-techcrunch-logo-icons-logos-emojis-iconic-brands.png",
                "https://static.coingecko.com/s/coingecko-logo-5683263fd3ea8a4f152dd5f7299acfc5f84ee73955428acff22913b8e59e6c54.svg",
                "https://www.pngkey.com/png/detail/155-1550175_wall-street-journal-logo-png-wsj-logo-transparent.png",
              ].map((brand, index) => (
                <Image
                  key={index}
                  src={brand}
                  alt={brand}
                  className="h-8 opacity-60 hover:opacity-100 transition-opacity"
                  width={100}
                  height={100}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Professional Trading Features
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Everything you need to trade like a professional, whether you&#39;re
                a beginner or an experienced trader.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="mt-4 text-xl font-bold">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Demo Section */}
        <section
          id="demo"
          className="py-20 bg-gradient-to-br from-primary/5 to-primary/10"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <div className="rounded-xl overflow-hidden border shadow-xl">
                  <div className="bg-foreground p-3 text-background font-mono text-sm">
                    Trading Terminal
                  </div>
                  <div className="bg-background p-4 h-96 flex items-center justify-center">
                    <div className="text-center">
                      <BarChart2 className="h-12 w-12 mx-auto text-primary" />
                      <h3 className="mt-4 text-xl font-bold">
                        Interactive Trading Demo
                      </h3>
                      <p className="mt-2 text-muted-foreground max-w-md">
                        Experience our professional trading interface with
                        real-time (delayed) market data.
                      </p>
                      <Button className="mt-4">Launch Demo</Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Try Before You Trade
                </h2>
                <p className="text-lg text-muted-foreground">
                  Our demo environment mirrors the live trading experience with
                  $10,000 in virtual funds. Test strategies risk-free before
                  committing real capital.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span>Full trading functionality with virtual funds</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span>Real-time market data (15-minute delay)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span>All charting tools and indicators</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Markets Section */}
        <section id="markets" className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Global Crypto Markets
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Trade 100+ cryptocurrencies with deep liquidity and tight
                spreads.
              </p>
            </div>
            <div className="mt-12 overflow-hidden rounded-xl border shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y">
                  <thead className="bg-muted/50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-sm font-medium text-muted-foreground"
                      >
                        Asset
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-sm font-medium text-muted-foreground"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-sm font-medium text-muted-foreground"
                      >
                        24h Change
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-sm font-medium text-muted-foreground"
                      >
                        24h Volume
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-sm font-medium text-muted-foreground"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {assets.map((asset) => (
                      <tr
                        key={asset.symbol}
                        className="hover:bg-muted/50 transition-colors"
                      >
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="font-medium">
                                {asset.symbol}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium">{asset.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {asset.symbol}/USD
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          <NumberFlow value={asset.price} />
                        </td>
                        <td
                          className={`whitespace-nowrap px-6 py-4 ${
                            asset.change > 0 ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {asset.change > 0 ? "+" : ""}
                          {asset.change}%
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          $ {asset.price * 10000}
                          {/* {(
                            asset.price *
                            10000 *
                            (1 + Math.random())
                          ).toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })} */}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right">
                          <Button variant="outline" size="sm">
                            Trade
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="border-t px-6 py-4 text-center">
                <Button variant="ghost">View All Markets</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section id="security" className="py-20 bg-muted">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Enterprise-grade Security
                </h2>
                <p className="text-lg text-muted-foreground">
                  We prioritize the safety of your assets with
                  institutional-grade security measures.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Lock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold">Cold Storage</h3>
                      <p className="text-muted-foreground mt-1">
                        95% of digital assets are stored offline in
                        geographically distributed cold wallets.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold">
                        Insurance Protection
                      </h3>
                      <p className="text-muted-foreground mt-1">
                        All hot wallets are insured against theft and hacking
                        incidents.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Users className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold">
                        Multi-sig Technology
                      </h3>
                      <p className="text-muted-foreground mt-1">
                        Requires multiple approvals for transactions,
                        eliminating single points of failure.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-background rounded-xl border p-8 shadow-lg">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold">Security Checklist</h3>
                  <div className="space-y-4">
                    {[
                      "Enable Two-Factor Authentication",
                      "Use a Strong, Unique Password",
                      "Whitelist Withdrawal Addresses",
                      "Review Account Activity Regularly",
                      "Enable Email Notifications for Logins",
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full">Enhance Your Security</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Trusted by Traders Worldwide
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Join thousands of satisfied traders who trust our platform for
                their crypto investments.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="rounded-xl border bg-card p-6 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full"
                      width={100}
                      height={100}
                    />
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                  &#34;{testimonial.content}&#34;
                  </p>
                  <div className="mt-4 flex gap-1 text-yellow-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simple, Transparent Pricing
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Competitive fees that decrease with your trading volume.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="rounded-xl border bg-card p-6 shadow-sm">
                <h3 className="text-xl font-bold">Starter</h3>
                <p className="mt-2 text-muted-foreground">For new traders</p>
                <div className="mt-6">
                  <span className="text-4xl font-bold">0.20%</span>
                  <span className="text-muted-foreground"> / trade</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Basic trading features</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Email support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Standard verification</span>
                  </li>
                </ul>
                <Button variant="outline" className="mt-8 w-full">
                  Get Started
                </Button>
              </div>
              <div className="rounded-xl border border-primary bg-card p-6 shadow-lg shadow-primary/10 relative">
                <div className="absolute top-0 right-6 -translate-y-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                  Most Popular
                </div>
                <h3 className="text-xl font-bold">Pro</h3>
                <p className="mt-2 text-muted-foreground">For active traders</p>
                <div className="mt-6">
                  <span className="text-4xl font-bold">0.10%</span>
                  <span className="text-muted-foreground"> / trade</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Advanced trading features</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Enhanced verification</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Volume discounts</span>
                  </li>
                </ul>
                <Button className="mt-8 w-full">Get Started</Button>
              </div>
              <div className="rounded-xl border bg-card p-6 shadow-sm">
                <h3 className="text-xl font-bold">Institutional</h3>
                <p className="mt-2 text-muted-foreground">
                  For high-volume traders
                </p>
                <div className="mt-6">
                  <span className="text-4xl font-bold">0.05%</span>
                  <span className="text-muted-foreground"> / trade</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>All Pro features</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>API access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Custom solutions</span>
                  </li>
                </ul>
                <Button variant="outline" className="mt-8 w-full">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Start Trading?
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/90">
                Join XM Assets Pro today and experience professional crypto
                trading with unmatched security and liquidity.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row justify-center">
                <Link href="/auth/signup">
                  <Button
                    size="lg"
                    className="bg-background text-foreground hover:bg-background/90"
                  >
                    Create Free Account
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-background hover:bg-primary/90 hover:text-background"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center">
                Frequently Asked Questions
              </h2>
              <div className="mt-12 space-y-4">
                {[
                  {
                    question: "How do I create an account?",
                    answer:
                      "Click the 'Get Started' button and complete the registration form. You'll need to verify your email address and complete identity verification (KYC) to start trading.",
                  },
                  {
                    question: "What payment methods do you accept?",
                    answer:
                      "We accept bank transfers, credit/debit cards, and cryptocurrency deposits. Processing times and fees vary by method.",
                  },
                  {
                    question: "Is there a minimum deposit amount?",
                    answer:
                      "The minimum deposit is $10 or equivalent in cryptocurrency. Some payment methods may have higher minimums.",
                  },
                  {
                    question: "How do you secure my funds?",
                    answer:
                      "We use a combination of cold storage (95% of funds), multi-signature technology, and insurance coverage for hot wallets. All accounts are protected by 2FA.",
                  },
                  {
                    question: "Can I trade on mobile?",
                    answer:
                      "Yes, we offer full-featured iOS and Android apps with all the functionality of our web platform.",
                  },
                ].map((item, index) => (
                  <div key={index} className="rounded-lg border p-6">
                    <details className="group">
                      <summary className="flex cursor-pointer items-center justify-between font-medium">
                        <span>{item.question}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 transition-transform group-open:rotate-180"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </summary>
                      <p className="mt-4 text-muted-foreground">
                        {item.answer}
                      </p>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 font-bold text-lg">
                <TrendingUp className="h-6 w-6 text-primary" />
                <span>XM Assets Pro</span>
              </div>
              <p className="mt-4 text-muted-foreground">
                The professional cryptocurrency trading platform for traders of
                all levels.
              </p>
              <div className="mt-6 flex gap-4">
                {["twitter", "facebook", "linkedin", "instagram"].map(
                  (social) => (
                    <Link
                      key={social}
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <use href={`/social-icons.svg#${social}`} />
                      </svg>
                    </Link>
                  )
                )}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Company</h3>
              <nav className="mt-4 space-y-2">
                <Link
                  href="#"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </Link>
                <Link
                  href="#"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  Careers
                </Link>
                <Link
                  href="#"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  Blog
                </Link>
                <Link
                  href="#"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  Press
                </Link>
              </nav>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Resources</h3>
              <nav className="mt-4 space-y-2">
                <Link
                  href="#"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  Help Center
                </Link>
                <Link
                  href="#"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  API Documentation
                </Link>
                <Link
                  href="#"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  Trading Guides
                </Link>
                <Link
                  href="#"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  Fee Schedule
                </Link>
              </nav>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Contact</h3>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>support@xmassets.com</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  123 Crypto Street, Blockchain City, BC 10001
                </p>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2025 XM Assets Pro. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
