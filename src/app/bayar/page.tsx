"use client";

import React from "react";
import { Card, Button } from "@nextui-org/react";
import DefaultLayout from "@/layouts/default1";
import { HeaderAvatar } from "@/layouts/headerAvatar";
import { NavbarTop } from "@/layouts/navbar";
import { MenuButton } from "@/layouts/menu";
import { Router } from "react-router-dom";

export default function BayarPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-between min-h-screen bg-background2">
        <HeaderAvatar />

        <NavbarTop />

        <div className="flex flex-col items-center w-full px-4 mt-16">
          <Card className="bg-white shadow-lg rounded-lg p-6 mt-2 w-full max-w-md mx-auto">
            <h2 className="text-xl font-bold text-secondary mb-4">
              Total yang harus dibayar
            </h2>
            <p className="text-2xl font-semibold text-secondary mb-4">
              Rp 1.000.000
            </p>
            <Button className="w-full" color="primary">
              Bayar
            </Button>
          </Card>
        </div>

        <Router location={"/bayar"} navigator={undefined}>
          <div className="absolute bottom-10">
           
          </div>
        </Router>
      </section>
    </DefaultLayout>
  );
}