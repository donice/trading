import { NextResponse } from 'next/server';

interface CryptoPrice {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
}

const CRYPTO_DATA = [
  { symbol: 'BTC', name: 'Bitcoin', marketCap: 1243000000000 },
  { symbol: 'ETH', name: 'Ethereum', marketCap: 415000000000 },
  { symbol: 'USDT', name: 'Tether', marketCap: 83000000000 },
];

const BINANCE_API_URL = 'https://api.binance.com/api/v3';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestedSymbol = searchParams.get('symbol'); // Renamed to avoid conflict

    // Fetch all ticker data from Binance
    const tickerResponse = await fetch(`${BINANCE_API_URL}/ticker/24hr`);
    if (!tickerResponse.ok) {
      throw new Error(`Binance API error: ${tickerResponse.statusText}`);
    }
    const allTickerData = await tickerResponse.json();

    // Process data to match our interface
    const prices = CRYPTO_DATA.map(crypto => {
      const pairSymbol = `${crypto.symbol}USDT`;
      const ticker = allTickerData.find((t: any) => t.symbol === pairSymbol);

      if (!ticker) {
        console.warn(`No data found for ${pairSymbol}`);
        return {
          ...crypto,
          price: 0,
          change24h: 0,
          volume24h: 0
        };
      }

      return {
        symbol: crypto.symbol,
        name: crypto.name,
        price: parseFloat(ticker.lastPrice),
        change24h: parseFloat(ticker.priceChangePercent),
        marketCap: crypto.marketCap,
        volume24h: parseFloat(ticker.quoteVolume)
      };
    });

    if (requestedSymbol) {
      const price = prices.find(p => p.symbol === requestedSymbol.toUpperCase());
      if (!price) {
        return NextResponse.json(
          { message: 'Cryptocurrency not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(price);
    }

    return NextResponse.json(prices);
  } catch (error) {
    console.error('Error fetching crypto prices:', error);

    // Fallback to mock data if API fails
    const mockPrices = CRYPTO_DATA.map(crypto => ({
      ...crypto,
      price: crypto.symbol === 'BTC' ? 63897.24 :
             crypto.symbol === 'ETH' ? 3456.78 : 1.0,
      change24h: crypto.symbol === 'BTC' ? 2.34 :
                crypto.symbol === 'ETH' ? 1.22 : 0.01,
      volume24h: crypto.symbol === 'BTC' ? 24500000000 :
                crypto.symbol === 'ETH' ? 12300000000 : 52000000000,
    }));

    const { searchParams } = new URL(req.url);
    const requestedSymbol = searchParams.get('symbol'); // Get symbol again in this scope

    if (requestedSymbol) {
      const price = mockPrices.find(p => p.symbol === requestedSymbol.toUpperCase());
      if (!price) {
        return NextResponse.json(
          { message: 'Cryptocurrency not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(price);
    }

    return NextResponse.json(mockPrices, {
      headers: {
        'Cache-Control': 'public, max-age=60',
        'X-API-Status': 'fallback'
      }
    });
  }
}