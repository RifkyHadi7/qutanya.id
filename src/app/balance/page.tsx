"use client";

import DefaultLayout from "@/layouts/default1";
import { MenuButton } from "@/layouts/menu";
import { HeaderAvatar } from "@/layouts/headerAvatar";
import { Saldo } from "@/layouts/saldo";
// import { Router } from "react-router-dom";
import { ScrollShadow } from "@nextui-org/react";
// import { createBrowserHistory } from "history";

const transactionHistory = [
  { id: 1, title: "Tarik Saldo", amount: "-Rp 10.000", date: "2023-01-01" },
  { id: 2, title: "Imbalan Survey", amount: "+Rp 12.000", date: "2023-01-02" },
  { id: 3, title: "Tarik Saldo", amount: "-Rp 20.000", date: "2023-01-03" },
  // Tambahkan riwayat transaksi lainnya di sini
];

export default function BalancePage() {
  // const history = createBrowserHistory();
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-between min-h-screen bg-background2 relative z-10">
        <HeaderAvatar />

       
        <MenuButton />
       
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
            <ScrollShadow className="max-h-64 overflow-y-auto">
              {transactionHistory.map((transaction) => (
                <div key={transaction.id} className="flex flex-row justify-between w-full mt-2 mb-2 p-2 border-b">
                  <p className="text-secondary text-sm">{transaction.amount}</p>
                  <h4 className="text-secondary text-sm font-light">{transaction.title}</h4>
                </div>
              ))}
            </ScrollShadow>
          </div>
        </section>
    </DefaultLayout>
  );
}