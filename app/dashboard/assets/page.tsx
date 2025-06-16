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
import { formatCurrency, formatCrypto, formatPercentage } from '@/lib/utils';
import { Asset } from '@/lib/models/user';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch('/api/crypto/prices');
        const priceData = await response.json();

        // Mock user balances - in a real app, these would come from the database
        const mockBalances = {
          BTC: 0.14,
          ETH: 1.2,
          USDT: 1500,
        };

        // Combine price data with user balances
        const userAssets = priceData.map((crypto: any) => ({
          symbol: crypto.symbol,
          name: crypto.name,
          balance: mockBalances[crypto.symbol as keyof typeof mockBalances] || 0,
          price: crypto.price,
          value: (mockBalances[crypto.symbol as keyof typeof mockBalances] || 0) * crypto.price,
          change24h: crypto.change24h,
        }));

        setAssets(userAssets);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching assets:', error);
        setIsLoading(false);
      }
    };

    fetchAssets();
  }, []);

  // Calculate total portfolio value
  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Your Assets</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{formatCurrency(totalValue)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Asset Breakdown</CardTitle>
          <CardDescription>
            Overview of your cryptocurrency holdings
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead className="hidden md:table-cell">Price</TableHead>
                  <TableHead className="text-right">24h Change</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assets.map((asset) => (
                  <TableRow key={asset.symbol}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center bg-${
                          asset.symbol === 'BTC' ? 'orange' :
                          asset.symbol === 'ETH' ? 'blue' : 'green'
                        }-500/20`}>
                          {asset.symbol.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold">{asset.symbol}</div>
                          <div className="text-xs text-muted-foreground">{asset.name}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{formatCurrency(asset.price)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {asset.change24h > 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : asset.change24h < 0 ? (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        ) : (
                          <Minus className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className={asset.change24h > 0 ? 'text-green-500' :
                                      asset.change24h < 0 ? 'text-red-500' : 'text-muted-foreground'}>
                          {formatPercentage(asset.change24h)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{formatCrypto(asset.balance, asset.symbol)}</TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(asset.value)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}