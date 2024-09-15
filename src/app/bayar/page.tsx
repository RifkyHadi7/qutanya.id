"use client";

import React from "react";
import { Card, Button } from "@nextui-org/react";
import DefaultLayout from "@/layouts/default1";
import { HeaderAvatar } from "@/layouts/headerAvatar";
import { MenuButton } from "@/layouts/menu";
import { useRouter } from "next/router";

type CheckoutPayment = {
  hadiah: number;
  harga: number;
  linkPayment: string;
};

export default function BayarPage() {
  const router = useRouter();
  const { query } = router;
  const data: CheckoutPayment = query.data
    ? JSON.parse(query.data as string)
    : { hadiah: 0, harga: 0, linkPayment: "" };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-between min-h-screen bg-background2">
        <HeaderAvatar />
        <MenuButton currentPath={"/bayar"} />
      </section>

      <section className="flex flex-col gap-4 mt-2 w-full px-4 mx-auto absolute top-20 z-20">
        <div className="flex flex-col items-center w-full px-4 mt-16">
          <Card className="bg-white shadow-lg rounded-lg p-6 mt-2 w-full max-w-md mx-auto">
            <h2 className="text-xl font-bold text-secondary mb-4">
              Total yang harus dibayar
            </h2>
            <p className="text-xl font-semibold text-secondary mb-4">
              Rp {data.harga}
            </p>
            <h2 className="text-xl font-bold text-secondary mb-4">
              Hadiah Per-Responden
            </h2>
            <p className="text-xl font-semibold text-secondary mb-4">
              Rp {Math.floor(data.hadiah)}
            </p>
            <Button
              className="w-full"
              onClick={() => (window.location.href = data.linkPayment)}
            >
              Bayar
            </Button>
          </Card>
        </div>
      </section>
    </DefaultLayout>
  );
}
