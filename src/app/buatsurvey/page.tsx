"use client";
import { Input } from "@nextui-org/react";
import React from "react";
import { SearchIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default1";
import { MenuButton } from "@/layouts/menu";
import { HeaderAvatar } from "@/layouts/headerAvatar";
import { NavbarTop } from "@/layouts/navbar";
import { Button } from "@nextui-org/react";

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

        <NavbarTop />

        <h2 className="text-2xl font-bold text-center text-secondary mt-20">
            Buat Survey
          </h2>

        <section className="flex flex-col gap-4 w-full px-4">
          
          <div className="flex flex-col gap-4 w-full mx-auto">
            <Input
              label="Link Form untuk responden"
              placeholder="Masukkan link form"
              className="mx-auto lg:w-1/2"
            />
            <Input
              label="Link Form untuk acces edit"
              placeholder="Masukkan link form"
              className="mx-auto lg:w-1/2"
            />
            <Input
              label="Jumlah Pertanyaan"
              placeholder="Masukkan jumlah pertanyaan"
              type="number"
              className="mx-auto lg:w-1/2"
            />
            <Input
              label="Jumlah Responden"
              placeholder="Masukkan jumlah responden"
              type="number"
              className="mx-auto lg:w-1/2"
            />
            <Button
              variant="solid"
              size="lg"
              fullWidth
              className={[
                "mx-auto",
                "lg:w-1/2",
                "w-full",
                "bg-default-200/50", // Background color
                "dark:bg-default/60", // Background color for dark mode
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                "shadow-xl",
                "bg-transparent",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                "dark:hover:bg-default/70",
                "group-data-[focus=true]:bg-default-200/50",
                "dark:group-data-[focus=true]:bg-default/60",
                "!cursor-pointer",
              ].join(" ")}
            >
              Buat Survey
            </Button>
          </div>
        </section>

        <MenuButton />
      </section>
    </DefaultLayout>
  );
}
