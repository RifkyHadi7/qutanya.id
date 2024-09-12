"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default1";
import { MenuButton } from "@/layouts/menu";
import { HeaderAvatar } from "@/layouts/headerAvatar";
import { Content } from "@/layouts/ContentArtikel";
import {
  Pagination,
  PaginationItemType,
  PaginationItemRenderProps,
} from "@nextui-org/react";

interface Article {
  id: string;
  judul: string;
  deskripsi: string;
  isi: string;
  cover?: string;
}

export default function ListArtikel() {
  const [articles, setArticles] = useState<Article[]>([]); // Inisialisasi dengan array kosong
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage]);

  const fetchArticles = async (page: number) => {
    try {
      const limit = 2; // Ubah limit menjadi 2
      const endpoint = `https://qutanya-be.vercel.app/artikel?page=${page}&limit=${limit}`;
      console.log("Fetching articles from:", endpoint); // Log endpoint yang digunakan
      const response = await fetch(endpoint);
      const data = await response.json();
      console.log("Full response from backend:", data); // Log seluruh respons yang diterima
      if (data && data.status === "success" && data.data.length > 0) {
        console.log("Articles data:", data.data); // Log data artikel
        setArticles(data.data); // Pastikan data ada sebelum mengatur state
        setTotalPages(Math.ceil(data.totalCount / limit)); // Hitung total halaman berdasarkan total artikel
      } else {
        console.log("No articles found in response."); // Log jika data tidak ada
        setArticles([]); // Set articles ke array kosong jika data tidak ada
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      setArticles([]); // Set articles ke array kosong jika terjadi kesalahan
    }
  };

  const handleReadArticle = (article: Article) => {
    console.log("Navigating to article:", article); // Log data artikel yang akan dinavigasikan
    const query = new URLSearchParams({
      id: article.id,
      judul: article.judul,
      deskripsi: article.deskripsi,
      isi: article.isi,
      cover: article.cover || ""
    }).toString();

    router.push(`/artikel?${query}`);
  };

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
            total={totalPages}
            initialPage={currentPage}
            className="gap-2"
            radius="full"
            renderItem={renderItem}
            variant="light"
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
        <MenuButton />
      </section>

      <section className="flex flex-col items-center gap-4 top-20 absolute w-full z-20">
        <div className="flex flex-row gap-4 mt-6 min-w-80  items-end justify-between">
          <span className="text-md text-secondary leading-none font-bold">
            Artikel Tersedia
          </span>
          <span className="text-sm text-secondary leading-none">Filter</span>
        </div>

        <section className="flex flex-col gap-2 w-full px-4">
          <Content articles={articles} onReadArticle={handleReadArticle} />
        </section>
      </section>
    </DefaultLayout>
  );
}