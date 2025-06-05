'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatCurrency, formatCrypto } from '@/lib/utils';
import { Asset } from '@/lib/models/user';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeftRight, RefreshCw } from 'lucide-react';

export default function TradePage() {
  const { toast } = useToast();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fromAsset, setFromAsset] = useState<string>('BTC');
  const [toAsset, setToAsset] = useState<string>('ETH');
  const [amount, setAmount] = useState<string>('');
  const [receiveAmount, setReceiveAmount] = useState<string>('0');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Mock user balances - in a real app, these would come from the database
  const mockBalances = {
    BTC: 0.14,
    ETH: 1.2,
    USDT: 1500,
  };

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch('/api/crypto/prices');
        const priceData = await response.json();

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

  // Calculate receive amount
  useEffect(() => {
    if (amount && fromAsset && toAsset) {
      const fromPrice = assets.find(a => a.symbol === fromAsset)?.price || 0;
      const toPrice = assets.find(a => a.symbol === toAsset)?.price || 0;

      if (fromPrice && toPrice) {
        const valueInUSD = parseFloat(amount) * fromPrice;
        const convertedAmount = valueInUSD / toPrice;
        setReceiveAmount(convertedAmount.toFixed(8));
      }
    } else {
      setReceiveAmount('0');
    }
  }, [amount, fromAsset, toAsset, assets]);

  const handleSwapAssets = () => {
    const temp = fromAsset;
    setFromAsset(toAsset);
    setToAsset(temp);
    setAmount('');
    setReceiveAmount('0');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to trade.",
        variant: "destructive",
      });
      return;
    }

    const selectedAsset = assets.find(a => a.symbol === fromAsset);
    if (!selectedAsset || parseFloat(amount) > selectedAsset.balance) {
      toast({
        title: "Insufficient balance",
        description: `You don't have enough ${fromAsset} to complete this trade.`,
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      // In a real app, you would send the trade to the server here
      // For the prototype, we'll simulate a successful trade

      setTimeout(() => {
        toast({
          title: "Trade executed!",
          description: `Successfully traded ${amount} ${fromAsset} for ${receiveAmount} ${toAsset}.`,
        });
        setAmount('');
        setReceiveAmount('0');
        setIsSubmitting(false);
      }, 1500);

    } catch (error) {
      console.error('Error executing trade:', error);
      toast({
        title: "Trade failed",
        description: "There was an error processing your trade. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Trade</h1>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Exchange</CardTitle>
            <CardDescription>
              Trade your cryptocurrencies at the current market rate
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fromAsset">From</Label>
                  <div className="flex gap-2">
                    <Select
                      value={fromAsset}
                      onValueChange={(value) => {
                        if (value === toAsset) {
                          // Prevent selecting the same asset
                          setToAsset(fromAsset);
                        }
                        setFromAsset(value);
                      }}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Select asset" />
                      </SelectTrigger>
                      <SelectContent>
                        {assets.map((asset) => (
                          <SelectItem key={asset.symbol} value={asset.symbol}>
                            {asset.symbol} - {asset.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex-1">
                      <Input
                        id="amount"
                        placeholder="0.00"
                        type="number"
                        step="any"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Balance: {formatCrypto(mockBalances[fromAsset as keyof typeof mockBalances] || 0, fromAsset)}
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleSwapAssets}
                  >
                    <ArrowLeftRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="toAsset">To</Label>
                  <div className="flex gap-2">
                    <Select
                      value={toAsset}
                      onValueChange={(value) => {
                        if (value === fromAsset) {
                          // Prevent selecting the same asset
                          setFromAsset(toAsset);
                        }
                        setToAsset(value);
                      }}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Select asset" />
                      </SelectTrigger>
                      <SelectContent>
                        {assets.map((asset) => (
                          <SelectItem key={asset.symbol} value={asset.symbol}>
                            {asset.symbol} - {asset.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex-1">
                      <Input
                        id="receiveAmount"
                        placeholder="0.00"
                        type="text"
                        value={receiveAmount}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Balance: {formatCrypto(mockBalances[toAsset as keyof typeof mockBalances] || 0, toAsset)}
                  </div>
                </div>

                <div className="rounded-lg bg-muted p-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Exchange Rate</span>
                    <span>
                      1 {fromAsset} = {(
                        (assets.find(a => a.symbol === fromAsset)?.price || 0) /
                        (assets.find(a => a.symbol === toAsset)?.price || 1)
                      ).toFixed(6)} {toAsset}
                    </span>
                  </div>
                  {amount && (
                    <div className="mt-2 flex justify-between">
                      <span className="text-muted-foreground">You Pay</span>
                      <span>{formatCurrency(parseFloat(amount) * (assets.find(a => a.symbol === fromAsset)?.price || 0))}</span>
                    </div>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Trade Now'
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Market Rates</CardTitle>
            <CardDescription>
              Current exchange rates between assets
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {assets.flatMap((from, i) =>
                  assets.filter((to) => from.symbol !== to.symbol).map((to) => (
                    <div key={`${from.symbol}-${to.symbol}`} className="flex justify-between items-center py-2 border-b last:border-b-0">
                      <div>
                        <span className="font-medium">{from.symbol}/{to.symbol}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          {(from.price / to.price).toFixed(6)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          1 {from.symbol} = {(from.price / to.price).toFixed(6)} {to.symbol}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-4">
            <p className="text-xs text-muted-foreground">
              Rates are updated in real-time. Trading fees are 1% per transaction.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}