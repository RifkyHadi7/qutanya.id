"use client";
import React from "react";
import DefaultLayout from "@/layouts/default1";
import { MenuButton } from "@/layouts/menu";
import { ScrollShadow } from "@nextui-org/react";
import { Content } from "@/layouts/articleContent";

export default function BerandaPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-between min-h-screen bg-background2">
        <section className="flex flex-col gap-4 mt-2 w-full px-4 mx-auto">
          <h2 className="text-xl font-bold self-start mt-4 text-secondary mx-auto">
            Judul Artikel
          </h2>

          <ScrollShadow size={100} className="w-[300px] h-[600px] -mt-2 mx-auto">
            <Content />
          </ScrollShadow>
        </section>

        <MenuButton />
      </section>
    </DefaultLayout>
  );
}
