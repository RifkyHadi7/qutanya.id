"use client";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import React from "react";
import { QutanyaLogo } from "@/components/icons";
import DefaultLayout from "@/layouts/default1";

export default function BerandaPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-between min-h-screen bg-background2">
        <header className="relative bg-[#25E5DA] shadow-lg rounded-b-extra p-4 pb-12 flex items-center justify-between w-full">
          <div className="flex items-center">
            <img
              src="/path/to/profile.jpg"
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
            <div className="ml-4">
              <span className="text-lg font-semibold text-secondary">Hi,</span>
              <span className="text-lg font-semibold text-secondary"> John Doe</span>
            </div>
          </div>
        </header>

        <div className="absolute top-28 -mt-6 px-4 w-3/4">
          <Input
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

        <footer className="bg-white shadow-lg p-4 text-center w-full bg-primary">
          <QutanyaLogo size={50} />
          <p className="text-sm text-gray-500">© 2023 Qutanya. All rights reserved.</p>
        </footer>
      </section>
    </DefaultLayout>
  );
}