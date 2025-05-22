import { NextResponse } from 'next/server';

interface CryptoPrice {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
}

// Mock data for crypto prices
const mockPrices: CryptoPrice[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 63897.24,
    change24h: 2.34,
    marketCap: 1243000000000,
    volume24h: 24500000000,
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: 3456.78,
    change24h: 1.22,
    marketCap: 415000000000,
    volume24h: 12300000000,
  },
  {
    symbol: 'USDT',
    name: 'Tether',
    price: 1.0,
    change24h: 0.01,
    marketCap: 83000000000,
    volume24h: 52000000000,
  },
];

export async function GET(req: Request) {
  // In a real application, you would fetch prices from a crypto API
  // For the prototype, we're returning mock data

  try {
    // Extract symbol from query params if specified
    const { searchParams } = new URL(req.url);
    const symbol = searchParams.get('symbol');

    if (symbol) {
      const price = mockPrices.find(p => p.symbol === symbol.toUpperCase());
      if (!price) {
        return NextResponse.json(
          { message: 'Cryptocurrency not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(price);
    }

    return NextResponse.json(mockPrices);
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}