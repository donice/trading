"use client"

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';

import BtcCode from "./assets/btc.jpeg";
import DodgeCode from "./assets/dodge.jpeg";
import EthCode from "./assets/eth.jpeg";
import UsdtCode from "./assets/xrp.jpeg";
import Image, { StaticImageData } from 'next/image';
import { LuCopy } from "react-icons/lu";
import toast from 'react-hot-toast';

type CryptoInfo = {
  address: string;
  qrCode: StaticImageData;
  name: string;
};

type CryptoData = {
  [key: string]: CryptoInfo;
};

type FormData = {
  crypto: string;
  amount: string;
  proof: FileList | null;
};

const CryptoDepositPage = () => {
  const cryptoData: CryptoData = {
    BTC: {
      address: 'bc1q7xj8c5v3udt879t2f8sf0q2qt0d2pf09dd4843',
      qrCode: BtcCode,
      name: 'Bitcoin'
    },
    DOGE: {
      address: 'D9jZHn21Z8Duou4edgpFXqjuoqvR8esX6n',
      qrCode: DodgeCode,
      name: 'Dogecoin'
    },
    ETH: {
      address: '0x4CAfc735C5f59f58690F186eC77E2823F426B869',
      qrCode: EthCode,
      name: 'Ethereum'
    },
    XRP: {
      address: 'rBB9shywybedfioxkCtydDVF97TUaGSS2u',
      qrCode: UsdtCode,
      name: 'Ripple'
    }
  };

  const form = useForm<FormData>({
    defaultValues: {
      crypto: 'BTC',
      amount: '',
      proof: null
    }
  });

  const [activeTab, setActiveTab] = useState('address');
  const [cryptoAmount, setCryptoAmount] = useState('');
  const [conversionRate, setConversionRate] = useState(0);

  const handleCryptoChange = (value: string) => {
    form.setValue('crypto', value);
    const rates = {
      BTC: 50000,
      DOGE: 0.15,
      ETH: 3000,
      XRP: 0.5
    };
    setConversionRate(rates[value as keyof typeof rates]);
    updateCryptoAmount(form.getValues('amount'), rates[value as keyof typeof rates]);
  };

  const updateCryptoAmount = (usdAmount: string, rate: number) => {
    if (usdAmount && rate) {
      const cryptoValue = parseFloat(usdAmount) / rate;
      setCryptoAmount(cryptoValue.toFixed(8));
    } else {
      setCryptoAmount('');
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      const submissionData = {
        crypto: data.crypto,
        cryptoAddress: cryptoData[data.crypto].address,
        usdAmount: data.amount,
        cryptoAmount,
        proofFile: data.proof?.[0]?.name
      };

      console.log('Deposit Submission:', submissionData);

      const response = await fetch('/api/transactions/deposit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'Deposit submission failed');
      }

      console.log('Deposit submission successful:', responseData);
      toast.success(responseData?.message || 'Deposit submission successful')
      return responseData;

    } catch (error) {
      console.error('Deposit submission error:', error);
      throw error;
    }
  };
  const selectedCrypto = form.watch('crypto');

  return (
    <div className="mx-auto space-y-6">

        <h1 className="text-2xl font-bold">Deposit Crypto</h1>

        <Card className='pt-4'>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Crypto Selection Dropdown */}
              <FormField
                control={form.control}
                name="crypto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cryptocurrency</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleCryptoChange(value);
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a cryptocurrency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(cryptoData).map(([key, crypto]) => (
                          <SelectItem key={key} value={key}>
                            {crypto.name} ({key})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address/QR Code Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="address">Address</TabsTrigger>
                  <TabsTrigger value="qr">QR Code</TabsTrigger>
                </TabsList>
                <TabsContent value="address" className="mt-4">
                  <div className="rounded-md border p-4">
                    <p className="text-sm text-muted-foreground">
                      Send only {cryptoData[selectedCrypto].name} ({selectedCrypto}) to this address
                    </p>
                    <p className="my-2 break-all font-mono text-sm">
                      {cryptoData[selectedCrypto].address}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {navigator.clipboard.writeText(cryptoData[selectedCrypto].address); toast.success('Address copied to clipboard')}}
                      type="button"
                    >
                   <LuCopy className='mr-2'/>   Copy Address
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="qr" className="mt-4">
                  <div className="flex justify-center rounded-md border p-4">
                    <Image
                      src={cryptoData[selectedCrypto].qrCode}
                      alt={`${selectedCrypto} QR Code`}
                      className="h-48 w-48"
                    />
                  </div>
                </TabsContent>
              </Tabs>

              {/* Amount Input */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount in USD</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Enter amount"
                        onChange={(e) => {
                          field.onChange(e);
                          updateCryptoAmount(e.target.value, conversionRate);
                        }}
                      />
                    </FormControl>
                    {cryptoAmount && (
                      <p className="text-sm text-muted-foreground">
                        ≈ {cryptoAmount} {selectedCrypto}
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Proof of Deposit */}
              <FormField
                control={form.control}
                name="proof"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proof of Deposit</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                    </FormControl>
                    {field.value?.[0]?.name && (
                      <p className="text-sm text-muted-foreground">
                        Selected file: {field.value[0].name}
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={!form.watch('amount') || !form.watch('proof')}
              >
                Submit Deposit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoDepositPage;