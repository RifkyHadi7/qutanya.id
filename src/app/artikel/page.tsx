"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import DefaultLayout from "@/layouts/default1";
import { MenuButton } from "@/layouts/menu";
import { HeaderAvatar } from "@/layouts/headerAvatar";

interface Article {
  id: string;
  judul: string;
  deskripsi: string;
  isi: string;
  cover?: string;
}

export default function BerandaPage() {
  const [article, setArticle] = useState<Article | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("id");
    const judul = searchParams.get("judul");
    const deskripsi = searchParams.get("deskripsi");
    const isi = searchParams.get("isi");
    const cover = searchParams.get("cover");

    console.log("Article ID from URL:", id); // Log ID artikel dari URL
    console.log("Judul from URL:", judul); // Log judul dari URL
    console.log("Deskripsi from URL:", deskripsi); // Log deskripsi dari URL
    console.log("Isi from URL:", isi); // Log isi dari URL
    console.log("Cover from URL:", cover); // Log cover dari URL

    if (id && judul && deskripsi && isi) {
      setArticle({ id, judul, deskripsi, isi, cover: cover || undefined });
    }
  }, [searchParams]);

  if (!article) {
    return <div>No article found</div>;
  }

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-between min-h-screen bg-background2 relative z-10">
        <HeaderAvatar />
        <MenuButton />
      </section>

      <section className="flex flex-col items-center gap-4 top-20 absolute w-full z-20">
        <h2 className="text-xl font-bold self-start mt-4 text-secondary mx-auto">
          {article.judul}
        </h2>

        <div className="w-[300px] h-[600px] -mt-2 mx-auto overflow-auto">
          <div className="p-4">
            <img src={article.cover || "https://nextui.org/images/album-cover.png"} alt={article.judul} className="w-full h-auto mb-4" />
            <p className="text-md text-secondary">{article.deskripsi}</p>
            <div className="mt-4 text-sm text-secondary">{article.isi}</div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}