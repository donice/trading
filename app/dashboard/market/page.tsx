'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { Search, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface CryptoMarketData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  chart7d: { time: string; value: number }[];
}

// Mock market data
const mockMarketData: CryptoMarketData[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 63897.24,
    change24h: 2.34,
    marketCap: 1243000000000,
    volume24h: 24500000000,
    chart7d: [
      { time: 'Mon', value: 62000 },
      { time: 'Tue', value: 61000 },
      { time: 'Wed', value: 63000 },
      { time: 'Thu', value: 62500 },
      { time: 'Fri', value: 63500 },
      { time: 'Sat', value: 64000 },
      { time: 'Sun', value: 63897 },
    ],
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: 3456.78,
    change24h: 1.22,
    marketCap: 415000000000,
    volume24h: 12300000000,
    chart7d: [
      { time: 'Mon', value: 3300 },
      { time: 'Tue', value: 3250 },
      { time: 'Wed', value: 3400 },
      { time: 'Thu', value: 3380 },
      { time: 'Fri', value: 3420 },
      { time: 'Sat', value: 3470 },
      { time: 'Sun', value: 3456 },
    ],
  },
  {
    symbol: 'BNB',
    name: 'Binance Coin',
    price: 612.45,
    change24h: -0.87,
    marketCap: 94000000000,
    volume24h: 1800000000,
    chart7d: [
      { time: 'Mon', value: 620 },
      { time: 'Tue', value: 615 },
      { time: 'Wed', value: 610 },
      { time: 'Thu', value: 608 },
      { time: 'Fri', value: 605 },
      { time: 'Sat', value: 610 },
      { time: 'Sun', value: 612 },
    ],
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    price: 137.89,
    change24h: 4.52,
    marketCap: 58000000000,
    volume24h: 2300000000,
    chart7d: [
      { time: 'Mon', value: 128 },
      { time: 'Tue', value: 130 },
      { time: 'Wed', value: 133 },
      { time: 'Thu', value: 135 },
      { time: 'Fri', value: 134 },
      { time: 'Sat', value: 136 },
      { time: 'Sun', value: 137 },
    ],
  },
  {
    symbol: 'ADA',
    name: 'Cardano',
    price: 0.65,
    change24h: -1.23,
    marketCap: 23000000000,
    volume24h: 580000000,
    chart7d: [
      { time: 'Mon', value: 0.67 },
      { time: 'Tue', value: 0.66 },
      { time: 'Wed', value: 0.65 },
      { time: 'Thu', value: 0.64 },
      { time: 'Fri', value: 0.64 },
      { time: 'Sat', value: 0.65 },
      { time: 'Sun', value: 0.65 },
    ],
  },
  {
    symbol: 'XRP',
    name: 'Ripple',
    price: 0.53,
    change24h: 0.87,
    marketCap: 28000000000,
    volume24h: 1200000000,
    chart7d: [
      { time: 'Mon', value: 0.52 },
      { time: 'Tue', value: 0.52 },
      { time: 'Wed', value: 0.53 },
      { time: 'Thu', value: 0.53 },
      { time: 'Fri', value: 0.53 },
      { time: 'Sat', value: 0.53 },
      { time: 'Sun', value: 0.53 },
    ],
  },
  {
    symbol: 'DOT',
    name: 'Polkadot',
    price: 7.45,
    change24h: 1.65,
    marketCap: 8700000000,
    volume24h: 320000000,
    chart7d: [
      { time: 'Mon', value: 7.3 },
      { time: 'Tue', value: 7.35 },
      { time: 'Wed', value: 7.4 },
      { time: 'Thu', value: 7.42 },
      { time: 'Fri', value: 7.38 },
      { time: 'Sat', value: 7.42 },
      { time: 'Sun', value: 7.45 },
    ],
  },
  {
    symbol: 'DOGE',
    name: 'Dogecoin',
    price: 0.081,
    change24h: -2.34,
    marketCap: 10800000000,
    volume24h: 540000000,
    chart7d: [
      { time: 'Mon', value: 0.085 },
      { time: 'Tue', value: 0.084 },
      { time: 'Wed', value: 0.083 },
      { time: 'Thu', value: 0.082 },
      { time: 'Fri', value: 0.082 },
      { time: 'Sat', value: 0.081 },
      { time: 'Sun', value: 0.081 },
    ],
  },
  {
    symbol: 'AVAX',
    name: 'Avalanche',
    price: 35.72,
    change24h: 3.18,
    marketCap: 12300000000,
    volume24h: 650000000,
    chart7d: [
      { time: 'Mon', value: 34 },
      { time: 'Tue', value: 34.5 },
      { time: 'Wed', value: 35 },
      { time: 'Thu', value: 35.2 },
      { time: 'Fri', value: 35.4 },
      { time: 'Sat', value: 35.6 },
      { time: 'Sun', value: 35.72 },
    ],
  },
  {
    symbol: 'LINK',
    name: 'Chainlink',
    price: 16.98,
    change24h: 0.65,
    marketCap: 9500000000,
    volume24h: 420000000,
    chart7d: [
      { time: 'Mon', value: 16.8 },
      { time: 'Tue', value: 16.85 },
      { time: 'Wed', value: 16.9 },
      { time: 'Thu', value: 16.92 },
      { time: 'Fri', value: 16.95 },
      { time: 'Sat', value: 16.97 },
      { time: 'Sun', value: 16.98 },
    ],
  },
];

export default function MarketPage() {
  const [cryptos, setCryptos] = useState<CryptoMarketData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    // In a real application, you'd fetch this data from a crypto API
    // For the prototype, we'll use the mock data
    setTimeout(() => {
      setCryptos(mockMarketData);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter cryptos based on search query
  const filteredCryptos = cryptos.filter(crypto =>
    crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Market Overview</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Global Market Cap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">$2.7T</div>
            <p className="text-xs text-green-500">+1.2% (24h)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">24h Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">$98.5B</div>
            <p className="text-xs text-muted-foreground">-3.5% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Bitcoin Dominance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">46.2%</div>
            <p className="text-xs text-green-500">+0.3% (24h)</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cryptocurrency Prices</CardTitle>
          <CardDescription>
            Live prices of top cryptocurrencies
          </CardDescription>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or symbol..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">24h Change</TableHead>
                    <TableHead className="hidden md:table-cell text-right">Market Cap</TableHead>
                    <TableHead className="hidden md:table-cell text-right">Volume (24h)</TableHead>
                    <TableHead className="hidden lg:table-cell">Last 7 Days</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCryptos.length > 0 ? (
                    filteredCryptos.map((crypto) => (
                      <TableRow key={crypto.symbol}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center bg-${
                              crypto.symbol === 'BTC' ? 'orange' :
                              crypto.symbol === 'ETH' ? 'blue' : 'green'
                            }-500/20`}>
                              {crypto.symbol.charAt(0)}
                            </div>
                            <div>
                              <div className="font-semibold">{crypto.symbol}</div>
                              <div className="text-xs text-muted-foreground">{crypto.name}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{formatCurrency(crypto.price)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            {crypto.change24h > 0 ? (
                              <TrendingUp className="h-4 w-4 text-green-500" />
                            ) : crypto.change24h < 0 ? (
                              <TrendingDown className="h-4 w-4 text-red-500" />
                            ) : (
                              <Minus className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className={crypto.change24h > 0 ? 'text-green-500' :
                                          crypto.change24h < 0 ? 'text-red-500' : 'text-muted-foreground'}>
                              {formatPercentage(crypto.change24h)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-right">
                          {formatCurrency(crypto.marketCap / 1000000000)}B
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-right">
                          {formatCurrency(crypto.volume24h / 1000000000)}B
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="h-12 w-32">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={crypto.chart7d}>
                                <Line
                                  type="monotone"
                                  dataKey="value"
                                  stroke={crypto.change24h >= 0 ? "hsl(var(--chart-1))" : "hsl(var(--destructive))"}
                                  strokeWidth={2}
                                  dot={false}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No cryptocurrencies found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}