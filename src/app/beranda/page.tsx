"use client";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/react";
import React from "react";
import { QutanyaLogo, SearchIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default1";
import { MenuButton } from "@/layouts/menu";
import { HeaderAvatar } from "@/layouts/headerAvatar";
import { Card, CardBody, Image, Button, Slider } from "@nextui-org/react";
import { ScrollShadow } from "@nextui-org/react";
import { Content } from "../Content";

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

        <div className="flex flex-row gap-4 mt-10 absolute top-32">
          <div className="flex flex-col items-center">
            <button
              className="w-16 h-16 flex items-center justify-center bg-white shadow-xl rounded-full transition transform duration-300 active:scale-95"
            >
              {/* Tempat untuk logo */}
            </button>
            <span className="text-xs mt-2 text-secondary">Isi Survey</span>
          </div>
          <div className="flex flex-col items-center">
            <button
              className="w-16 h-16 flex items-center justify-center bg-white shadow-xl rounded-full transition transform duration-300 active:scale-95"
            >
              {/* Tempat untuk logo */}
            </button>
            <span className="text-xs mt-2 text-secondary">Buat Survey</span>
          </div>
          <div className="flex flex-col items-center">
            <button
              className="w-16 h-16 flex items-center justify-center bg-white shadow-xl rounded-full transition transform duration-300 active:scale-95"
            >
              {/* Tempat untuk logo */}
            </button>
            <span className="text-xs mt-2 text-secondary">ArtikelQu</span>
          </div>
          <div className="flex flex-col items-center">
            <button
              className="w-16 h-16 flex items-center justify-center bg-white shadow-xl rounded-full transition transform duration-300 active:scale-95"
            >
              {/* Tempat untuk logo */}
            </button>
            <span className="text-xs mt-2 text-secondary">Menu</span>
          </div>
        </div>

        <div className="flex flex-row gap-4 mt-24 min-w-80 absolute top-48 items-end justify-between">
          <span className="text-md text-secondary leading-none font-bold">Survey Tersedia</span>
          <span className="text-sm text-secondary leading-none">Filter</span>
        </div>

        <section className="flex flex-col gap-4 mt-16 w-full px-4">
            <Content />     
        </section>

        <MenuButton />
      </section>
    </DefaultLayout>
  );
}