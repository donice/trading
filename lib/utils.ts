import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchCryptoPrice(symbol: string): Promise<number> {
  // In a real application, you'd call a crypto price API like CoinGecko
  // This is a mock implementation for the prototype
  const mockPrices: Record<string, number> = {
    BTC: 63897.24,
    ETH: 3456.78,
    USDT: 1.0,
  };

  return mockPrices[symbol] || 0;
}

// Format currency with 2 decimal places
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

// Format crypto amount with appropriate decimal places
export function formatCrypto(amount: number, symbol: string): string {
  const decimals = symbol === 'USDT' ? 2 : 6;
  return amount.toFixed(decimals) + ' ' + symbol;
}

// Format percentage with +/- sign
export function formatPercentage(percentage: number): string {
  const sign = percentage >= 0 ? '+' : '';
  return sign + percentage.toFixed(2) + '%';
}

// Check if user is admin
export function isAdmin(user: any): boolean {
  return user?.role === 'admin';
}