"use client"

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface Transaction {
  _id: string;
  cryptoType: string;
  cryptoAmount: number;
  usdAmount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

interface ApiResponse {
  data: Transaction[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const fetchTransactions = async (page: number = 1, limit: number = 10): Promise<ApiResponse> => {
  const response = await fetch(`/api/transactions?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }
  return response.json();
};

export default function TransactionsPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = React.useState(1);
  const limit = 10;

  const { data, isLoading, isError, error } = useQuery<ApiResponse, Error>({
    queryKey: ['transactions', currentPage],
    queryFn: () => fetchTransactions(currentPage, limit),
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDepositClick = () => {
    router.push('/dashboard/deposit');
  };

  if (isError) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-500">Error: {error.message}</div>
        </CardContent>
      </Card>
    );
  }

  const totalPages = data?.pagination?.totalPages || 0;
  const showPagination = !isLoading && totalPages > 1;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Deposit History</h1>
        <Button onClick={handleDepositClick}>Make Deposit</Button>
      </div>

      <Card >
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cryptocurrency</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>USD Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: limit }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  </TableRow>
                ))
              ) : (
                data?.data?.map((transaction) => (
                  <TableRow key={transaction._id}>
                    <TableCell className="font-medium">{transaction.cryptoType}</TableCell>
                    <TableCell>{transaction.cryptoAmount}</TableCell>
                    <TableCell>${transaction.usdAmount.toFixed(2)}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                        transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(transaction.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </TableCell>
                  </TableRow>
                )) || []
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {showPagination && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                variant="ghost"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
            </PaginationItem>

            {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
              let pageNum: any;
              if (totalPages <= 5) {
                pageNum = index + 1;
              } else if (currentPage <= 3) {
                pageNum = index + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + index;
              } else {
                pageNum = currentPage - 2 + index;
              }

              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    isActive={pageNum === currentPage}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <Button
                variant="ghost"
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}