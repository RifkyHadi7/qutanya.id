"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/layouts/default1";
import { MenuButton } from "@/layouts/menu";
import { HeaderAvatar } from "@/layouts/headerAvatar";
import { Content } from "@/layouts/Content";
import axios from "axios";
import { Spinner } from "@nextui-org/react";

interface Survei {
  id: number;
  judul: string;
  kategori_survei: any[];
  user: {
    nama: string;
  };
  hadiah: number;
  status: string;
  link_form: string;
}

export default function ListArtikel() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSurvei, setDataSurvei] = useState<Survei[]>([]);

  const fetchData = async () => {
    setLoading(true);

    const response = await axios.get(
      "https://qutanya-be.vercel.app/survei/list-survei"
    );

    if (response.data.status === "success") {
      setDataSurvei(response.data.data.data);
      setLoading(false);
    } else {
      setError(response.data.error);
      setLoading(false);
    }
  
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="min-h-screen bg-primary relative">
      <HeaderAvatar />
      <section className="flex flex-col items-center justify-between bg-background2 relative">
        <section className="flex flex-col top-64 gap-2 lg:w-[50%] px-4 mt-5">
          <div className="flex flex-col items-center px-4 mx-auto min-w-80 w-full">
          <span className="text-md text-secondary leading-none font-bold mb-3">
              Survey Tersedia
            </span>
            {error && (
              <div className="text-red-500 text-center font-bold">{error}</div>
            )}

            {loading ? (
              <Spinner color="success">Loading...</Spinner>
            ) : (
              <div className="h-[40rem] overflow-auto">
                <Content data={dataSurvei} />
              </div>
            )}
          </div>
        </section>
      </section>
      <section className="w-full fixed bottom-0">
        <MenuButton />
      </section>
    </section>
  );
}
