"use client"
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import { RiFundsLine } from "react-icons/ri";
import { PiUserSwitch } from "react-icons/pi";
import { TbChartCandle, TbShoppingBag } from "react-icons/tb";

export default function CTA() {

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Trade Dashboard</h1>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
        <Card className='text-white bg-red-900 border-2 border-red-500'>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Fund Account</p>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold"><RiFundsLine className='text-3xl' /></div>
          </CardContent>
        </Card>
        <Card className='text-white bg-blue-900 border-2 border-blue-500'>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Copy Traders</p>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold"><PiUserSwitch className='text-3xl' /></div>
          </CardContent>
        </Card>
        <Card className='text-white bg-green-900 border-2 border-green-500'>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Asset Markets</p>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold"><TbShoppingBag className='text-3xl' /></div>

          </CardContent>
        </Card>
        <Card className='text-white bg-purple-900 border-2 border-purple-500'>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Trading room</p>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold"><TbChartCandle className='text-3xl' /></div>
          </CardContent>
        </Card>
      </div>


    </div>
  );
}