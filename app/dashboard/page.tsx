"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import axiosInstance from '@/lib/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import CTA from '.';
import RecentTransactions from './RecentTransactions';

const portfolioData = [
  {
    name: 'Jan',
    value: 4000,
  },
  {
    name: 'Feb',
    value: 4200,
  },
  {
    name: 'Mar',
    value: 5800,
  },
  {
    name: 'Apr',
    value: 5200,
  },
  {
    name: 'May',
    value: 7000,
  },
  {
    name: 'Jun',
    value: 6800,
  },
  {
    name: 'Jul',
    value: 7600,
  },
  {
    name: 'Aug',
    value: 8200,
  },
  {
    name: 'Sep',
    value: 9000,
  },
  {
    name: 'Oct',
    value: 10000,
  },
  {
    name: 'Nov',
    value: 11000,
  },
  {
    name: 'Dec',
    value: 12500,
  },
];

const assetAllocation = [
  {
    name: 'BTC',
    value: 60,
  },
  {
    name: 'ETH',
    value: 30,
  },
  {
    name: 'USDT',
    value: 10,
  },
];

const recentTransactions = [
  {
    id: 1,
    type: 'buy',
    asset: 'BTC',
    amount: 0.05,
    price: 63897.24,
    total: 3194.86,
    date: '2025-05-15T10:30:00Z',
  },
  {
    id: 2,
    type: 'sell',
    asset: 'ETH',
    amount: 1.2,
    price: 3456.78,
    total: 4148.14,
    date: '2025-05-14T14:20:00Z',
  },
  {
    id: 3,
    type: 'deposit',
    asset: 'USDT',
    amount: 5000,
    price: 1.0,
    total: 5000,
    date: '2025-05-10T09:15:00Z',
  },
];

export default function DashboardPage() {
  const session = useSession();
  console.log(session);
  const userName = session?.data?.user?.name || 'User';

const [balance, setBalance] = useState({
  total: 0,
  btc: 0,
  eth: 0,
  usdt: 0,
})

  const {data} = useQuery({
    queryKey: ['balance'],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/account/balance');
      setBalance(res.data.data);
      return res;
    },
  })

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Welcome back, {userName}</h1>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${balance?.total}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">BTC Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{balance?.btc} BTC</div>
            <p className="text-xs text-muted-foreground">
              $8,945.61
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ETH Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{balance?.eth} ETH</div>
            <p className="text-xs text-muted-foreground">
              $4,148.14
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">USDT Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{balance?.usdt} USDT</div>
            <p className="text-xs text-muted-foreground">
              $1,500.00
            </p>
          </CardContent>
        </Card>
      </div>
      <CTA/>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Portfolio Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart
                    data={portfolioData}
                    margin={{
                      top: 0,
                      right: 0,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="name"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">
                                    Month
                                  </span>
                                  <span className="font-bold text-muted-foreground">
                                    {payload[0].payload.name}
                                  </span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">
                                    Value
                                  </span>
                                  <span className="font-bold">
                                    ${payload[0].value}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--chart-1))"
                      fillOpacity={1}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
                <CardDescription>
                  Your current portfolio distribution
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={assetAllocation}>
                    <XAxis
                      dataKey="name"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">
                                    Asset
                                  </span>
                                  <span className="font-bold text-muted-foreground">
                                    {payload[0].payload.name}
                                  </span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">
                                    Allocation
                                  </span>
                                  <span className="font-bold">
                                    {payload[0].value}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar
                      dataKey="value"
                      fill="hsl(var(--chart-2))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          <RecentTransactions />
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>
                  Your portfolio performance over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Total Return</p>
                      <p className="text-muted-foreground text-xs">Since inception</p>
                    </div>
                    <p className="text-green-500 font-bold">+124.5%</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Monthly Return</p>
                      <p className="text-muted-foreground text-xs">May 2025</p>
                    </div>
                    <p className="text-green-500 font-bold">+12.8%</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Best Performing Asset</p>
                      <p className="text-muted-foreground text-xs">Last 30 days</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <p className="font-bold">BTC</p>
                      <p className="text-green-500 font-bold">+18.3%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Market Overview</CardTitle>
                <CardDescription>
                  Current market conditions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Bitcoin Dominance</p>
                    </div>
                    <p className="font-bold">46.2%</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Global Market Cap</p>
                    </div>
                    <p className="font-bold">$2.7T</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">24h Volume</p>
                    </div>
                    <p className="font-bold">$98.5B</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Fear & Greed Index</p>
                    </div>
                    <div className="bg-green-500/20 text-green-500 rounded-full px-3 py-1 text-xs font-bold">
                      75 - Greed
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}