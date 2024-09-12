"use client";

import { Input } from "@nextui-org/react";
import React from "react";
import { SearchIcon, ChevronIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default1";
import { MenuButton } from "@/layouts/menu";
import { HeaderAvatar } from "@/layouts/headerAvatar";
import { Content } from "@/layouts/Content";
import { Router } from "react-router-dom";
import { NavbarTop } from "@/layouts/navbar";
import {
  Pagination,
  PaginationItemType,
  PaginationItemRenderProps,
} from "@nextui-org/react";

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
        <button
          key={key}
          className={`${className} bg-background min-w-8 w-8 h-8`}
          onClick={onNext}
        >
          <ChevronIcon className="rotate-180 text-white" />
        </button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button
          key={key}
          className={`${className} bg-background min-w-8 w-8 h-8`}
          onClick={onPrevious}
        >
          <ChevronIcon className="text-white" />
        </button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <button key={key} className={`${className} text-background`}>
          ...
        </button>
      );
    }

    // cursor is the default item
    return (
      <button
        ref={ref}
        key={key}
        className={`${className} ${
          isActive
            ? "text-background bg-secondary font-bold"
            : "text-background"
        }`}
        onClick={() => setPage(value)}
      >
        {value}
      </button>
    );
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-between min-h-screen bg-background2 relative z-10">
        <HeaderAvatar />
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
        <MenuButton />
      </section>

      <section className="flex flex-col items-center gap-4 top-20 absolute w-full z-20">
        <div className="flex flex-row gap-4 mt-6 min-w-80  items-end justify-between">
          <span className="text-md text-secondary leading-none font-bold">
            Survey Tersedia
          </span>
          <span className="text-sm text-secondary leading-none">Filter</span>
        </div>

        <section className="flex flex-col  gap-2 w-full px-4">
          <Content />
        </section>

        
      </section>
    </DefaultLayout>
  );
}
