"use client";
import { Link } from "@nextui-org/link";
import { Input, Tab, Tabs } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import React from "react";
import { QutanyaLogo, SearchIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default1";


import { MenuButton } from "@/layouts/menu";
import { HeaderAvatar } from "@/layouts/headerAvatar";


export default function BerandaPage() {

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-between min-h-screen bg-background2">
        <HeaderAvatar></HeaderAvatar>

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

        <MenuButton/>
      </section>
    </DefaultLayout>
  );
}
