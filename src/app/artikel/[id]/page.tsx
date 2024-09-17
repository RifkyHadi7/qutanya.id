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
  cover: string;
}

export default function ArtikelPage({ params }: { params: { id: string } }){
  const { id } = params;
  const [article, setArticle] = useState<Article | null>(null);

  const fetchArticle = async (id: string) => {
    try {
      const response = await fetch(`https://qutanya-be.vercel.app/artikel/${id}`);
      const result = await response.json();
      console.log("API Data fetch", result.data)
  
      if (result.status === "success" && result.data.length > 0) {
        const articleData = result.data[0]
        const article = {
          id: articleData.id, // Convert id to string for consistency
          judul: articleData.judul,
          deskripsi: articleData.deskripsi,
          isi: articleData.isi,
          cover: articleData.cover || undefined, // Use undefined if cover is null
        };
        console.log("Mapped articles data:", article);
        setArticle(article);
      } else {
        console.log("No article found with the provided id.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching article:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchArticle(id);
  }, [id]);

  if (!article) {
    return <div>No article found</div>;
  }
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-between min-h-screen bg-background2 relative z-10">
        <HeaderAvatar />
        <MenuButton  />
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
              width={100}
              height={100}
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