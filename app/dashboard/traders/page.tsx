// app/traders/page.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Copy } from "lucide-react";
import Image from "next/image";
import { toast } from "react-hot-toast";

interface Trader {
  _id: string;
  name: string;
  role: string;
  followers: number;
  profitShare: number;
  returnRate: number;
  image_link: string; // Added image link
  createdAt: string;
}

export default function TradersPage() {
  const [traders, setTraders] = useState<Trader[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTraders = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/traders");
      const data = await response.json();
      if (data.success) {
        setTraders(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch traders:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Trader details copied!");
  };

  useEffect(() => {
    fetchTraders();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">Our Expert Traders</h1>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {traders.map((trader) => (
            <Card
              key={trader._id}
              className="hover:shadow-lg transition-shadow flex flex-col md:flex-row"
            >
              {" "}
              <div className="relative h-24 w-24 m-4 flex-shrink-0">
                {" "}
                <Image
                  src={trader.image_link}
                  alt={trader.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <div className="flex-1 p-4">
                {" "}
                <CardHeader className="p-0">
                  {" "}
                  <CardTitle className="flex justify-between items-start">
                    <span>{trader.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-green-600/30 "
                      onClick={() =>
                        copyToClipboard(
                          `Name: ${trader.name}\nRole: ${trader.role}\nFollowers: ${trader.followers}\nProfit Share: ${trader.profitShare}%\nReturn Rate: ${trader.returnRate}%`
                        )
                      }
                    >
                      <Copy className="h-4 w-4 mr-2" /> Copy
                    </Button>
                  </CardTitle>
                  <CardDescription>{trader.role}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 p-0 pt-2">
                  {" "}
                  {/* Adjusted padding */}
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
                    <span
                      className={
                        trader.returnRate >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {trader.returnRate}%
                    </span>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
