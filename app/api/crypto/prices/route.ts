import { NextApiRequest, NextApiResponse } from 'next';
import WebSocket from 'ws';

const CRYPTO_SYMBOLS = ['BTC', 'ETH', 'USDT'];
const BINANCE_WS_URL = 'wss://stream.binance.com:9443/ws';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set headers for SSE (Server-Sent Events)
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Content-Encoding', 'none');

  // Create WebSocket connection to Binance
  const streams = CRYPTO_SYMBOLS.map(s => `${s.toLowerCase()}usdt@ticker`).join('/');
  const ws = new WebSocket(`${BINANCE_WS_URL}/stream?streams=${streams}`);

  const prices: Record<string, any> = {};

  ws.on('message', (data: any) => {
    const message = JSON.parse(data.toString());
    const symbol = message.data.s.replace('USDT', '');

    prices[symbol] = {
      symbol,
      price: parseFloat(message.data.c),
      change24h: parseFloat(message.data.P),
      volume24h: parseFloat(message.data.q),
      lastUpdated: Date.now()
    };

    // Send updated prices to client
    res.write(`data: ${JSON.stringify(Object.values(prices))}\n\n`);
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    res.status(500).end();
  });

  req.on('close', () => {
    ws.close();
    res.end();
  });
}