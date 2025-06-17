import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Ensure this route is dynamic

interface CryptoMarketData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  sparkline_in_7d: { price: number[] };
}

export async function GET() {
  try {
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin,solana,cardano,ripple,polkadot,dogecoin,avalanche,chainlink&per_page=10&price_change_percentage=24h&sparkline=true';

    const response = await fetch(apiUrl, {
      headers: {
        'x-cg-demo-api-key': process.env.COINGECKO_API_KEY || ''
      },
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.statusText}`);
    }

    const data: CryptoMarketData[] = await response.json();

    // Transform the data to match your frontend interface
    const transformedData = data.map((crypto) => {
      // Create 7-day chart data (CoinGecko provides 168 hours - we'll sample 7 points)
      const priceData = crypto.sparkline_in_7d.price;
      const step = Math.floor(priceData.length / 7);
      const chart7d = Array.from({ length: 7 }, (_, i) => ({
        time: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
        value: priceData[i * step] || priceData[priceData.length - 1]
      }));

      return {
        symbol: crypto.symbol.toUpperCase(),
        name: crypto.name,
        price: crypto.current_price,
        change24h: crypto.price_change_percentage_24h,
        marketCap: crypto.market_cap,
        volume24h: crypto.total_volume,
        chart7d
      };
    });

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch market data' },
      { status: 500 }
    );
  }
}