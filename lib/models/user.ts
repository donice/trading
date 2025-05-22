import { ObjectId } from 'mongodb';

export interface User {
  _id?: ObjectId;
  name: string;
  email: string;
  image?: string;
  role: 'user' | 'admin';
  emailVerified?: Date;
  createdAt: Date;
  wallets?: {
    btc?: string;
    eth?: string;
    usdt?: string;
  };
  isVerified: boolean;
}

export interface Asset {
  symbol: string;
  name: string;
  balance: number;
  price: number;
  value: number;
  change24h: number;
}

export interface Transaction {
  _id?: ObjectId;
  userId: ObjectId;
  type: 'buy' | 'sell' | 'deposit' | 'withdrawal';
  asset: string;
  amount: number;
  price: number;
  total: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
}

export interface Signal {
  _id?: ObjectId;
  title: string;
  description: string;
  asset: string;
  action: 'buy' | 'sell';
  price: number;
  createdAt: Date;
  expiresAt?: Date;
}

export interface Deposit {
  _id?: ObjectId;
  userId: ObjectId;
  asset: string;
  amount: number;
  txHash?: string;
  status: 'pending' | 'completed' | 'rejected';
  proofUrl?: string;
  createdAt: Date;
}

export interface PlatformWallet {
  _id?: ObjectId;
  asset: string;
  address: string;
  updatedAt: Date;
  updatedBy: ObjectId;
}