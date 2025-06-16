import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Transaction {
  _id: string;
  cryptoType: string;
  cryptoAmount: number;
  usdAmount: number;
  status: "completed" | "pending" | "failed";
  createdAt: string;
}

interface ApiResponse {
  success: boolean;
  data: Transaction[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/transactions'); // Adjust API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }
        const data: ApiResponse = await response.json();
        setTransactions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <div>Loading transactions...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!transactions) {
    return <div>No transactions found</div>;
  }

  // Transform the API data to match our display format
  const formattedTransactions = transactions.data.map((tx) => ({
    id: tx._id,
    type: tx.status === "completed" ? "buy" : tx.status, // Adjust as needed
    asset: tx.cryptoType,
    amount: tx.cryptoAmount,
    price: tx.usdAmount / tx.cryptoAmount, // Calculate price per unit
    total: tx.usdAmount,
    date: tx.createdAt,
    status: tx.status,
  }));

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {formattedTransactions.slice(0, 3).map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between"
                onClick={() => router.push(`/dashboard/transactions/${transaction.id}`)}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      transaction.status === "completed"
                        ? "bg-green-500/20 text-green-500"
                        : transaction.status === "failed"
                        ? "bg-red-500/20 text-red-500"
                        : "bg-yellow-500/20 text-yellow-500"
                    }`}
                  >
                    {transaction.status === "completed"
                      ? "✓"
                      : transaction.status === "failed"
                      ? "✗"
                      : "..."}
                  </div>
                  <div>
                    <p className="text-sm font-medium capitalize">
                      {transaction.type} {transaction.asset}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {transaction.amount.toFixed(8)} {transaction.asset}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ${transaction.total.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Transaction Summary</CardTitle>
          <CardDescription>Overview of your activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border bg-card p-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Total Transactions</p>
                <div className="rounded bg-blue-500/20 px-2 py-1 text-xs text-blue-500">
                  {transactions.pagination.total}
                </div>
              </div>
              <p className="mt-2 text-xs">
                <span className="text-muted-foreground">Completed: </span>
                <span className="font-medium text-green-500">
                  {transactions.data.filter(tx => tx.status === "completed").length}
                </span>
              </p>
            </div>
            <div className="rounded-lg border bg-card p-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Recent Activity</p>
                <div className="rounded bg-purple-500/20 px-2 py-1 text-xs text-purple-500">
                  {new Date(transactions.data[0]?.createdAt).toLocaleDateString()}
                </div>
              </div>
              <p className="mt-2 text-xs">
                <span className="text-muted-foreground">Latest: </span>
                <span className="font-medium">
                  {transactions.data[0]?.cryptoType} {transactions.data[0]?.status}
                </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentTransactions;