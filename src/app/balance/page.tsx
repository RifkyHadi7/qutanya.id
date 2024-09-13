"use client";

import DefaultLayout from "@/layouts/default1";
import { MenuButton } from "@/layouts/menu";
import { HeaderAvatar } from "@/layouts/headerAvatar";
import { Saldo } from "@/layouts/saldo";
import { Router } from "react-router-dom";
import { ScrollShadow } from "@nextui-org/react";
import { createBrowserHistory } from "history";

const transactionHistory = [
  { id: 1, title: "Pembelian Pulsa", amount: "-Rp 50.000", date: "2023-01-01" },
  { id: 2, title: "Top Up", amount: "+Rp 100.000", date: "2023-01-02" },
  { id: 3, title: "Pembayaran Listrik", amount: "-Rp 200.000", date: "2023-01-03" },
  // Tambahkan riwayat transaksi lainnya di sini
];

export default function BerandaPage() {
  const history = createBrowserHistory();
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-between min-h-screen bg-background2">
        <HeaderAvatar />

        <section className="flex flex-col gap-4 mt-2 w-full px-4 mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-6 mt-2 w-full max-w-md mx-auto">
            <h2 className="text-xl font-bold text-secondary mb-4">
              Saldo Anda
            </h2>
            <Saldo />
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 mt-4 w-full max-w-md mx-auto">
            <h2 className="text-xl font-bold text-secondary mb-4">
              Riwayat Transaksi
            </h2>
            <ScrollShadow className="max-h-64 overflow-y-auto">
              {transactionHistory.map((transaction) => (
                <div key={transaction.id} className="mb-4 p-4 border-b border-gray-200">
                  <h4 className="text-primary text-lg font-semibold">{transaction.title}</h4>
                  <p className="text-default text-base">{transaction.amount}</p>
                  <p className="text-gray-500 text-sm">{transaction.date}</p>
                </div>
              ))}
            </ScrollShadow>
          </div>
        </section>
        
        <Router location={"/balance"} navigator={history}>
          <MenuButton />
        </Router>
      </section>
    </DefaultLayout>
  );
}