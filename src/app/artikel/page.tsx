"use client";

import React, { useState, useEffect } from "react";
import DefaultLayout from "@/layouts/default1";
import { MenuButton } from "@/layouts/menu";
import { HeaderAvatar } from "@/layouts/headerAvatar";
import Image from "next/image";

interface Article {
  id: string;
  judul: string;
  deskripsi: string;
  isi: string;
  cover?: string;
}

const ArtikelPage: React.FC = () => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");
    const judul = searchParams.get("judul");
    const deskripsi = searchParams.get("deskripsi");
    const isi = searchParams.get("isi");
    const cover = searchParams.get("cover");

    if (id && judul && deskripsi && isi) {
      setArticle({ id, judul, deskripsi, isi, cover: cover || undefined });
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!article) {
    return <div>No article found</div>;
  }

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-between min-h-screen bg-background2 relative z-10">
        <HeaderAvatar />
        <MenuButton currentPath={"/artikel"} />
      </section>

      <section className="flex flex-col items-center gap-4 top-20 absolute w-full z-20">
        <h2 className="text-xl font-bold self-start mt-4 text-secondary mx-auto">
          {article.judul}
        </h2>

        <div className="w-[300px] h-[600px] -mt-2 mx-auto overflow-auto">
          <div className="p-4">
            <Image
              src={article.cover || "https://nextui.org/images/album-cover.png"}
              alt={article.judul}
              className="w-full h-auto mb-4"
            />
            <p className="text-md text-secondary">{article.deskripsi}</p>
            <div className="mt-4 text-sm text-secondary">{article.isi}</div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default ArtikelPage;
