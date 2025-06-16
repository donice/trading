import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Asset {
  symbol: string;
  price: number;
  change24h: number;
}

const MarketRates = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const eventSource = new EventSource('/api/crypto/prices');

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setAssets(data);
      setIsLoading(false);
    };

    eventSource.onerror = () => {
      console.error('EventSource failed');
      eventSource.close();
      setIsLoading(false);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Live Market Rates</CardTitle>
          <CardDescription>
            Real-time exchange rates between assets
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
                assets
                  .filter((to) => from.symbol !== to.symbol)
                  .map((to) => (
                    <div
                      key={`${from.symbol}-${to.symbol}`}
                      className="flex justify-between items-center py-2 border-b last:border-b-0"
                    >
                      <div>
                        <span className="font-medium">
                          {from.symbol}/{to.symbol}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {new Date().toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          {(from.price / to.price).toFixed(6)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {from.change24h > 0 ? '↑' : '↓'} {Math.abs(from.change24h).toFixed(2)}%
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
            Rates update in real-time. Data from Binance.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MarketRates;