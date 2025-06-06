'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';

interface Transaction {
  _id: string;
  userName: string;
  userEmail: string;
  cryptoType: string;
  cryptoAmount: number;
  usdAmount: number;
  walletAddress: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<Record<string, boolean>>({});
  const router = useRouter();

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/transactions');
      const data = await response.json();
      if (data.success) {
        setTransactions(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTransactionStatus = async (id: string, status: 'completed' | 'failed') => {
    try {
      setUpdating(prev => ({ ...prev, [id]: true }));
      const response = await fetch(`/api/admin/transactions/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      if (data.success) {
        fetchTransactions(); // Refresh the list
      }
    } catch (error) {
      console.error('Failed to update transaction:', error);
    } finally {
      setUpdating(prev => ({ ...prev, [id]: false }));
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className=" w-full">
      <Card>
        <CardHeader>
          <CardTitle>Transaction Management</CardTitle>
          <CardDescription>
            Review and approve pending transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Crypto</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>USD Value</TableHead>
                    <TableHead>Wallet</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.length > 0 ? (
                    transactions.map((transaction) => (
                      <TableRow key={transaction._id}>
                        <TableCell>{transaction.userName}</TableCell>
                        <TableCell>{transaction.userEmail}</TableCell>
                        <TableCell>{transaction.cryptoType}</TableCell>
                        <TableCell>{transaction.cryptoAmount}</TableCell>
                        <TableCell>${transaction.usdAmount.toFixed(2)}</TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {transaction.walletAddress}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              transaction.status === 'completed'
                                ? 'default'
                                : transaction.status === 'failed'
                                ? 'destructive'
                                : 'secondary'
                            }
                          >
                            {transaction.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="space-x-2">
                          {transaction.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => updateTransactionStatus(transaction._id, 'completed')}
                                disabled={updating[transaction._id]}
                              >
                                {updating[transaction._id] ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  'Approve'
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => updateTransactionStatus(transaction._id, 'failed')}
                                disabled={updating[transaction._id]}
                              >
                                {updating[transaction._id] ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  'Reject'
                                )}
                              </Button>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No transactions found
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