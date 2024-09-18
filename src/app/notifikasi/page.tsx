"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@nextui-org/react";
import DefaultLayout from "@/layouts/default1";
import { HeaderAvatar } from "@/layouts/headerAvatar";
import { MenuButton } from "@/layouts/menu";

// Define the interface for Notification
interface User {
  nama: string;
}

interface KategoriSurvei {
  kategori_filter: {
    kategori: string;
  };
}

interface Notification {
  judul: string;
  hadiah: number;
  user: User;
  kategori_survei: KategoriSurvei[];
}

export default function NotifikasiPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Fetch notifications from sessionStorage
    const storedNotifications = sessionStorage.getItem('notifications');
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications) as Notification[]);
    }
  }, []);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-between min-h-screen bg-background2 relative z-10">
        <HeaderAvatar />
        <MenuButton />
      </section>

      <section className="flex flex-col items-center justify-center w-screen mx-auto gap-2 absolute top-24 z-20">
        <div className="flex flex-col items-center w-full px-4 mt-2">
          <h2 className="text-secondary text-2xl font-bold">Notifikasi</h2>
          <Card className="w-full mt-4 p-4 bg-white shadow-xl">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 border-b border-gray-200"
                >
                  <h4 className="text-red-600 text-md font-bold">
                    Survey Baru!!
                  </h4>
                  <h4 className="text-secondary text-md">
                    dengan judul : <br/>
                    <span className="font-bold">{notification.judul}</span>
                  </h4>
                  <p className="text-secondary text-sm">
                    oleh {notification.user.nama}
                  </p>
                  <p className="text-secondary text-sm">
                    Hadiah Rp.{notification.hadiah.toLocaleString("id-ID")}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-secondary text-sm">Tidak ada notifikasi.</p>
            )}
          </Card>
        </div>
      </section>
    </DefaultLayout>
  );
}
