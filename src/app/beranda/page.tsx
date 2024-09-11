"use client";

import { Input } from "@nextui-org/react";
import React from "react";
import { SearchIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default1";
import { MenuButton } from "@/layouts/menu";
import { HeaderAvatar } from "@/layouts/headerAvatar";
import { Content } from "../../../layouts/Content";
import { Router } from "react-router-dom";
import { NavbarTop } from "@/layouts/navbar";

export default function BerandaPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-between min-h-screen bg-background2">
        <HeaderAvatar />

        <div className="absolute top-28 -mt-6 px-4 w-3/4">
          <Input
            startContent={<SearchIcon className="text-secondary" />}
            isClearable
            placeholder="Cari survei sesuai fashion anda"
            className="w-full"
            classNames={{
              input: [
                "bg-white",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: "bg-white",
              inputWrapper: [
                "shadow-xl",
                "bg-white",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "!cursor-text",
                "!hover:bg-white",
                "!dark:hover:bg-default/60",
              ],
            }}
          />
        </div>

        <NavbarTop/>

        <div className="flex flex-row gap-4 mt-16 min-w-80 absolute top-48 items-end justify-between">
          <span className="text-md text-secondary leading-none font-bold">Survey Tersedia</span>
          <span className="text-sm text-secondary leading-none">Filter</span>
        </div>

        <section className="flex flex-col absolute top-64 mt-8 gap-2 w-full px-4">
            <Content />
            <Content />     
        </section>

        <Router location={"/beranda"} navigator={undefined}>
        <MenuButton />
        </Router>
      </section>
    </DefaultLayout>
  );
}