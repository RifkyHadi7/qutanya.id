"use client";

import React, { useEffect, useState } from "react";
import DefaultLayout from "@/layouts/default1";
import { MenuButton } from "@/layouts/menu";
import { HeaderAvatar } from "@/layouts/headerAvatar";
import { Saldo } from "@/layouts/saldo";
import { ScrollShadow } from "@nextui-org/react";

interface Transaction {
  id: number;
  nominal: number;
  pemasukan: boolean;
  keterangan: string;
  created_at: string;
}

export default function BalancePage() {
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch transaction history from API
  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const userData = sessionStorage.getItem("userData");
        if (userData) {
          const parsedData = JSON.parse(userData);
          const id_user = parsedData.data.biodata.id_user;

          const response = await fetch("https://qutanya-be.vercel.app/saldo/transaksi", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ "id_user": id_user }),
          });

          const result = await response.json();

          if (result.status === "success" && result.data) {
            setTransactionHistory(result.data); // Update transaction history state with API data
          } else {
            console.log("Failed to fetch transaction history");
          }
        }
      } catch (error) {
        console.error("Error fetching transaction history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionHistory(); // Fetch transaction history on component mount
  }, []);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-between min-h-screen bg-background2 relative z-10">
        <HeaderAvatar />

       
        <MenuButton currentPath={"/balance"} />
       
      </section>

      <section className="flex flex-col gap-4 mt-2 w-full px-4 mx-auto absolute top-20 z-20">
        <div className="bg-transparent rounded-lg mt-2 w-full max-w-md mx-auto">
          <h2 className="text-md font-bold text-secondary mb-2">
            Saldo Anda
          </h2>
          <Saldo />
        </div>

        <div className="bg-background2 shadow-lg rounded-lg p-6 w-full max-w-md mx-auto">
          <div className="flex flex-row gap-4 min-w-80 items-center justify-between mx-auto">
            <span className="text-sm text-secondary leading-none font-bold">
              Riwayat transaksi
            </span>
          </div>

          {loading ? (
            <p>Loading transaction history...</p>
          ) : (
            <ScrollShadow className="max-h-64 overflow-y-auto">
              {transactionHistory.length > 0 ? (
                transactionHistory.map((transaction, index) => (
                  <div
                    key={index}
                    className="flex flex-row justify-between w-full mt-2 mb-2 p-2 border-b"
                  >
                    {/* Format nominal as + or - based on pemasukan */}
                    <p className={`text-sm font-bold ${
                        transaction.pemasukan ? "text-green-500" : "text-red-500"
                      }`}>
                      {transaction.pemasukan
                        ? `+Rp ${transaction.nominal.toLocaleString("id-ID")}`
                        : `-Rp ${transaction.nominal.toLocaleString("id-ID")}`}
                    </p>
                    <h4 className="text-secondary text-sm font-light">
                      {transaction.keterangan}
                    </h4>
                    <p className="text-secondary text-sm">
                      {new Date(transaction.created_at).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                ))
              ) : (
                <p>No transactions found.</p>
              )}
            </ScrollShadow>
          )}
        </div>
      </section>
    </DefaultLayout>
  );
}
