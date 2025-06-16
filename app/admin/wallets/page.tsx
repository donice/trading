// 'use client';

// import { useState, useEffect } from 'react';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Label } from '@/components/ui/label';
// import { useToast } from '@/hooks/use-toast';
// import { PlatformWallet } from '@/lib/models/user';
// import { RefreshCw } from 'lucide-react';

// export default function AdminWalletsPage() {
//   const { toast } = useToast();
//   const [wallets, setWallets] = useState<PlatformWallet[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [bitcoinAddress, setBitcoinAddress] = useState<string>('');
//   const [ethereumAddress, setEthereumAddress] = useState<string>('');
//   const [usdtAddress, setUsdtAddress] = useState<string>('');
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

//   const mockWallets: PlatformWallet[] = [
//     {
//       _id: { toString: () => '1' } as any,
//       asset: 'BTC',
//       address: '3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5',
//       updatedAt: new Date('2025-05-15'),
//       updatedBy: { toString: () => '5' } as any,
//     },
//     {
//       _id: { toString: () => '2' } as any,
//       asset: 'ETH',
//       address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
//       updatedAt: new Date('2025-05-15'),
//       updatedBy: { toString: () => '5' } as any,
//     },
//     {
//       _id: { toString: () => '3' } as any,
//       asset: 'USDT',
//       address: 'TNPeeaaFB7K9cmo4uQpcU32zGK8G1NYqeL',
//       updatedAt: new Date('2025-05-15'),
//       updatedBy: { toString: () => '5' } as any,
//     },
//   ];

//   useEffect(() => {
//     setTimeout(() => {
//       setWallets(mockWallets);
//       setBitcoinAddress(mockWallets.find(w => w.asset === 'BTC')?.address || '');
//       setEthereumAddress(mockWallets.find(w => w.asset === 'ETH')?.address || '');
//       setUsdtAddress(mockWallets.find(w => w.asset === 'USDT')?.address || '');
//       setIsLoading(false);
//     }, 1000);
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate Bitcoin address
//     if (!bitcoinAddress) {
//       toast({
//         title: "Validation Error",
//         description: "Bitcoin address is required",
//         variant: "destructive",
//       });
//       return;
//     }

//     // Validate Ethereum address
//     if (!ethereumAddress) {
//       toast({
//         title: "Validation Error",
//         description: "Ethereum address is required",
//         variant: "destructive",
//       });
//       return;
//     }

//     try {
//       setIsSubmitting(true);

//       // In a real app, you would send the wallet updates to the server here
//       // For the prototype, we'll simulate a successful update

//       setTimeout(() => {
//         const updatedWallets = [...wallets];
//         const btcWallet = updatedWallets.find(w => w.asset === 'BTC');
//         const ethWallet = updatedWallets.find(w => w.asset === 'ETH');
//         const usdtWallet = updatedWallets.find(w => w.asset === 'USDT');

//         if (btcWallet) {
//           btcWallet.address = bitcoinAddress;
//           btcWallet.updatedAt = new Date();
//         }

//         if (ethWallet) {
//           ethWallet.address = ethereumAddress;
//           ethWallet.updatedAt = new Date();
//         }

//         if (usdtWallet) {
//           usdtWallet.address = usdtAddress;
//           usdtWallet.updatedAt = new Date();
//         }

//         setWallets(updatedWallets);

//         toast({
//           title: "Wallets Updated",
//           description: "Platform wallet addresses have been updated successfully",
//         });

//         setIsSubmitting(false);
//       }, 1500);

//     } catch (error) {
//       console.error('Error updating wallets:', error);
//       toast({
//         title: "Update failed",
//         description: "There was an error updating the wallet addresses. Please try again.",
//         variant: "destructive",
//       });
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-6">
//       <h1 className="text-2xl font-bold">Platform Wallets</h1>

//       <Card>
//         <CardHeader>
//           <CardTitle>Wallet Addresses</CardTitle>
//           <CardDescription>
//             Update the platform&#39;s cryptocurrency wallet addresses for user deposits
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           {isLoading ? (
//             <div className="flex justify-center py-8">
//               <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="space-y-2">
//                 <Label htmlFor="bitcoinAddress">Bitcoin (BTC) Address</Label>
//                 <Input
//                   id="bitcoinAddress"
//                   placeholder="Enter Bitcoin address"
//                   value={bitcoinAddress}
//                   onChange={(e) => setBitcoinAddress(e.target.value)}
//                   className="font-mono"
//                 />
//                 <p className="text-xs text-muted-foreground">
//                   Last updated: {wallets.find(w => w.asset === 'BTC')?.updatedAt.toLocaleString()}
//                 </p>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="ethereumAddress">Ethereum (ETH) Address</Label>
//                 <Input
//                   id="ethereumAddress"
//                   placeholder="Enter Ethereum address"
//                   value={ethereumAddress}
//                   onChange={(e) => setEthereumAddress(e.target.value)}
//                   className="font-mono"
//                 />
//                 <p className="text-xs text-muted-foreground">
//                   Last updated: {wallets.find(w => w.asset === 'ETH')?.updatedAt.toLocaleString()}
//                 </p>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="usdtAddress">Tether (USDT) Address</Label>
//                 <Input
//                   id="usdtAddress"
//                   placeholder="Enter USDT address (optional)"
//                   value={usdtAddress}
//                   onChange={(e) => setUsdtAddress(e.target.value)}
//                   className="font-mono"
//                 />
//                 <p className="text-xs text-muted-foreground">
//                   Last updated: {wallets.find(w => w.asset === 'USDT')?.updatedAt.toLocaleString()}
//                 </p>
//               </div>

//               <div className="rounded-lg bg-muted p-4 text-sm">
//                 <h4 className="font-semibold mb-2">Important Security Notes:</h4>
//                 <ul className="list-disc pl-4 space-y-1">
//                   <li>Always double-check wallet addresses before updating</li>
//                   <li>Use cold storage or hardware wallets when possible</li>
//                   <li>Enable all security features on exchange accounts</li>
//                   <li>All wallet updates are logged for security purposes</li>
//                 </ul>
//               </div>

//               <Button type="submit" className="w-full" disabled={isSubmitting}>
//                 {isSubmitting ? (
//                   <>
//                     <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
//                     Updating Wallets...
//                   </>
//                 ) : (
//                   'Update Wallet Addresses'
//                 )}
//               </Button>--
//             </form>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page