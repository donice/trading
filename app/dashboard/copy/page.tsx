"use client"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import axiosInstance from '@/lib/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { RiFundsLine } from "react-icons/ri";
import { PiUserSwitch } from "react-icons/pi";
import { TbChartCandle, TbShoppingBag } from "react-icons/tb";

export default function DashboardPage() {
  const session = useSession();
  console.log(session);
  const userName = session?.data?.user?.name || 'User';

const [balance, setBalance] = useState({
  total: 0,
  btc: 0,
  eth: 0,
  usdt: 0,
})

  const {data} = useQuery({
    queryKey: ['balance'],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/account/balance');
      setBalance(res.data.data);
      return res;
    },
  })

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Trade Dashboard</h1>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
        <Card className='bg-red-900 border-2 border-red-500'>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fund Account</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold"><RiFundsLine className='text-3xl' /></div>
          </CardContent>
        </Card>
        <Card className='bg-blue-900 border-2 border-blue-500'>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Copy Traders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold"><PiUserSwitch className='text-3xl' /></div>
          </CardContent>
        </Card>
        <Card className='bg-green-900 border-2 border-green-500'>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Asset Markets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold"><TbShoppingBag className='text-3xl' /></div>

          </CardContent>
        </Card>
        <Card className='bg-purple-900 border-2 border-purple-500'>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trading room</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold"><TbChartCandle className='text-3xl' /></div>
          </CardContent>
        </Card>
      </div>


    </div>
  );
}