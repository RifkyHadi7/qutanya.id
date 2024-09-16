import React from "react";
import DefaultLayout from "@/layouts/default1";
import { MenuButton } from "@/layouts/menu";
import { HeaderAvatar } from "@/layouts/headerAvatar";
import { Content } from "@/layouts/Content";

export default function ListArtikel() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-between min-h-screen bg-background2 relative z-10">
        <HeaderAvatar />
        <div className="absolute bottom-20">
        </div>
        <MenuButton />
      </section>

      <section className="flex flex-col items-center gap-4 top-20 absolute w-full z-20">
        <div className="flex flex-row gap-4 mt-6 min-w-80  items-end justify-between">
          <span className="text-md text-secondary leading-none font-bold">
            Survey Tersedia
          </span>
        </div>

        <section className="flex flex-col  gap-2 w-full px-4">
          <Content data={[]} />
        </section>

        
      </section>
    </DefaultLayout>
  );
}
