// app/admin/traders/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2, Edit, Plus } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';

interface Trader {
  _id: string;
  name: string;
  role: string;
  followers: number;
  profitShare: number;
  returnRate: number;
  image_link: string;
  createdAt: string;
}

export default function AdminTradersPage() {
  const [traders, setTraders] = useState<Trader[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  const fetchTraders = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/traders');
      const data = await response.json();
      if (data.success) {
        setTraders(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch traders:', error);
      toast.success( 'Failed to fetch traders')
    } finally {
      setLoading(false);
    }
  };


  const deleteTrader = async (id: string) => {
    try {
      setDeletingId(id);
      const response = await fetch(`/api/admin/traders/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to delete trader');
      }

      toast.success('Trader deleted successfully')
      fetchTraders(); // Refresh the list
    } catch (error) {
      console.error('Failed to delete trader:', error);
      toast.success('Failed to delete trader');
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchTraders();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Traders</h1>
        <Button onClick={() => router.push('/admin/traders/create')}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Trader
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {traders.map((trader) => (
            <Card key={trader._id} className="hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full">
                <Image
                  src={trader.image_link}
                  alt={trader.name}
                  fill
                  className="object-cover rounded-t-lg"
                  width={100}
                  height={100}
               />
              </div>
              <CardHeader>
                <CardTitle>{trader.name}</CardTitle>
                <CardDescription>{trader.role}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Followers:</span>
                  <span>{trader.followers.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Profit Share:</span>
                  <span>{trader.profitShare}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Return Rate:</span>
                  <span className={trader.returnRate >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {trader.returnRate}%
                  </span>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteTrader(trader._id)}
                    disabled={deletingId === trader._id}
                  >
                    {deletingId === trader._id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}