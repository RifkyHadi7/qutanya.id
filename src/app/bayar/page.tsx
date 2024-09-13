"use client";

import React from "react";
import { Card, Button } from "@nextui-org/react";
import DefaultLayout from "@/layouts/default1";
import { HeaderAvatar } from "@/layouts/headerAvatar";
import { NavbarTop } from "@/layouts/navbar";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { MenuButton } from "@/layouts/menu";

export default function BayarPage() {
  const history = createBrowserHistory();
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-between min-h-screen bg-background2">
        <HeaderAvatar />
        <MenuButton />
      </section>

      <section className="flex flex-col gap-4 mt-2 w-full px-4 mx-auto absolute top-20 z-20">
        <div className="flex flex-col items-center w-full px-4 mt-16">
          <Card className="bg-white shadow-lg rounded-lg p-6 mt-2 w-full max-w-md mx-auto">
            <h2 className="text-xl font-bold text-secondary mb-4">
              Total yang harus dibayar
            </h2>
            <p className="text-xl font-semibold text-secondary mb-4">
              Rp 1.000.000
            </p>
            <Button
              className="w-full"
            >
              Bayar
            </Button>
          </Card>
        </div>

        <Router location={"/bayar"} navigator={history}></Router>
      </section>
    </DefaultLayout>
  );
}