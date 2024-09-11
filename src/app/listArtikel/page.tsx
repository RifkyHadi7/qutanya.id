"use client";

import { Input } from "@nextui-org/react";
import React from "react";
import { SearchIcon, ChevronIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default1";
import { MenuButton } from "@/layouts/menu";
import { HeaderAvatar } from "@/layouts/headerAvatar";
import { Content } from "@/layouts/ContentArtikel";
import { Router } from "react-router-dom";
import { NavbarTop } from "@/layouts/navbar";
import { Pagination, PaginationItemType, PaginationItemRenderProps } from "@nextui-org/react";

export default function ListArtikel() {
  const renderItem = ({
    ref,
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    className,
  }: PaginationItemRenderProps<HTMLButtonElement>) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <button key={key} className={`${className} bg-background min-w-8 w-8 h-8`} onClick={onNext}>
          <ChevronIcon className="rotate-180 text-white" />
        </button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button key={key} className={`${className} bg-background min-w-8 w-8 h-8`} onClick={onPrevious}>
          <ChevronIcon className="text-white" />
        </button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return <button key={key} className={`${className} text-background`}>...</button>;
    }

    // cursor is the default item
    return (
      <button
        ref={ref}
        key={key}
        className={`${className} ${isActive ? "text-background bg-secondary font-bold" : "text-background"}`}
        onClick={() => setPage(value)}
      >
        {value}
      </button>
    );
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-between min-h-screen bg-background2">
        <HeaderAvatar />

        <div className="absolute top-28 -mt-6 px-4 w-3/4">
          <Input
            startContent={<SearchIcon className="text-secondary" />}
            isClearable
            placeholder="Cari artikel sesuai minat anda"
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


        <div className="flex flex-row gap-4 mt-16 min-w-80 absolute top-48 items-end justify-between">
          <span className="text-md text-secondary leading-none font-bold">Artikel Tersedia</span>
          <span className="text-sm text-secondary leading-none">Filter</span>
        </div>

        <section className="flex flex-col absolute top-64 mt-8 gap-2 w-full px-4">
          <Content />
        </section>

        <div className="absolute bottom-20">
          <Pagination
            disableCursorAnimation
            showControls
            total={10}
            initialPage={1}
            className="gap-2"
            radius="full"
            renderItem={renderItem}
            variant="light"
          />
        </div>

        <Router location={"/listArtikel"} navigator={undefined}>
          <div className="absolute bottom-10">
            {/* <MenuButton /> */}
          </div>
        </Router>
      </section>
    </DefaultLayout>
  );
}