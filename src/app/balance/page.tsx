"use client";

import DefaultLayout from "@/layouts/default1";
import { MenuButton } from "@/layouts/menu";
import { HeaderAvatar } from "@/layouts/headerAvatar";
import { Saldo } from "@/layouts/saldo";
import { Router } from "react-router-dom";

export default function BerandaPage() {
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
        </section>
        
      <Router location={"/balance"} navigator={undefined}>
        <MenuButton />
      </Router>
      </section>
    </DefaultLayout>
  );
}