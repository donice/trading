// components/TransactionDetail.tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface Transaction {
  _id: string;
  userEmail: string;
  userName: string;
  cryptoType: string;
  cryptoAmount: number;
  usdAmount: number;
  walletAddress: string;
  proofFile: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
}

export const TransactionDetail = ({ transactionId }: { transactionId: string }) => {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await fetch(`/api/admin/transactions/${transactionId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch transaction');
        }
        const data = await response.json();
        if (data.success) {
          setTransaction(data.data);
        } else {
          throw new Error(data.error || 'Unknown error');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [transactionId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => router.back()} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="text-center py-8">
        <p>Transaction not found</p>
        <Button onClick={() => router.back()} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500">{status}</Badge>;
      case 'failed':
        return <Badge className="bg-red-500">{status}</Badge>;
      default:
        return <Badge className="bg-yellow-500">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Transaction Details</CardTitle>
            {getStatusBadge(transaction.status)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">User</h3>
                <p>{transaction.userName} ({transaction.userEmail})</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Crypto</h3>
                <p>{transaction.cryptoType}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Amount</h3>
                <p>{transaction.cryptoAmount} {transaction.cryptoType}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">USD Value</h3>
                <p>${transaction.usdAmount.toFixed(2)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Wallet Address</h3>
                <p className="font-mono break-all">{transaction.walletAddress}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Date</h3>
                <p>{new Date(transaction.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {transaction.proofFile && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Proof</h3>
              <div className="border rounded-md p-4">
                <img
                  src={`/uploads/${transaction.proofFile}`}
                  alt="Transaction proof"
                  className="max-h-64 object-contain"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={() => router.back()}>
          Back to Transactions
        </Button>
      </div>
    </div>
  );
};