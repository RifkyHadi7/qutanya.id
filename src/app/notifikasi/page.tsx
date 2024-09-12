"use client";

import React from "react";
import { Card } from "@nextui-org/react";
import DefaultLayout from "@/layouts/default1";
import { HeaderAvatar } from "@/layouts/headerAvatar";
import { NavbarTop } from "@/layouts/navbar";
import { MenuButton } from "@/layouts/menu";
import { Router } from "react-router-dom";

const notifications = [
  { id: 1, title: "Notifikasi 1", description: "Deskripsi notifikasi 1" },
  { id: 2, title: "Notifikasi 2", description: "Deskripsi notifikasi 2" },
  { id: 3, title: "Notifikasi 3", description: "Deskripsi notifikasi 3" },
];

export default function NotifikasiPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-between min-h-screen bg-background2 relative z-10">
        <HeaderAvatar />

        <Router location={"/beranda"} navigator={undefined}>
          <MenuButton />
        </Router>
      </section>

      <section className="flex flex-col items-center justify-center w-screen mx-auto gap-2 absolute top-24 z-20">
      <div className="flex flex-col items-center w-full px-4 mt-2">
        <h2 className="text-secondary text-2xl font-bold">Notifikasi</h2>
        <Card className="w-full mt-4 p-4 bg-white shadow-xl">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="mb-4 p-4 border-b border-gray-200"
            >
              <h4 className="text-secondary text-md font-semibold">
                {notification.title}
              </h4>
              <p className="text-secondary text-sm">
                {notification.description}
              </p>
            </div>
          ))}
        </Card>
      </div>
      </section>
    </DefaultLayout>
  );
}
