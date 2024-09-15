"use client";

import React, { useEffect, useState } from "react";
import DefaultLayout from "@/layouts/default1";
import { Input, Select, SelectItem, Spinner, Button } from "@nextui-org/react";
import { SearchIcon } from "@/components/icons";
import { MenuButton } from "@/layouts/menu";
import { HeaderAvatar } from "@/layouts/headerAvatar";
import { Content } from "../../../layouts/Content";
import { NavbarTop } from "@/layouts/navbar";
import axios from "axios";

interface Category {
  value: string;
  label: string;
}

// Define the type for your survey data
interface Survei {
  judul: string;
  kategori: string[];
  pembuat: {
    nama: string;
  };
  hadiah: number;
}

export default function BerandaPage() {
  const [dataSurvei, setDataSurvei] = useState<Survei[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filterKategori, setFilterKategori] = useState<string[]>([]);
  const [kategori, setKategori] = useState<Category[]>([]);
  const [googleToken, setGoogleToken] = useState<string | null>(null);

  // Check for Google token in session storage
  useEffect(() => {
    const token = sessionStorage.getItem("googleToken");
    setGoogleToken(token);
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, [filterKategori]);

  const fetchData = async () => {
    setLoading(true);
    const filterState = filterKategori.join(",");
    const response = await axios.post(
      "https://be-qutanya.vercel.app/survei/get-all",
      { filter: filterState } // Sending the filter as JSON in the request body
    );

    if (response.data.status === "success" && Array.isArray(response.data.data)) {
      const mappedData: Survei[] = response.data.data.map((item: any) => ({
        judul: item.judul,
        kategori: item.kategori,
        pembuat: item.user,
        hadiah: item.hadiah,
      }));
      setDataSurvei(mappedData);
      setLoading(false);
    } else {
      setError(response.data.error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://be-qutanya.vercel.app/kategori"
        );
        if (
          response.data.status === "success" &&
          Array.isArray(response.data.data)
        ) {
          const transformedData = response.data.data.map((item: any) => ({
            label: item.kategori,
            value: item.id,
          }));
          setKategori(transformedData);
        } else {
          throw new Error("Data tidak dalam format yang diharapkan");
        }
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleSelectChange2 = (selectedValues: Set<string>) => {
    const selected = Array.from(selectedValues).map(String);
    setFilterKategori(selected);

    // Trigger fetch after selecting options
    fetchData();
  };

  // Function to handle Google login
  const handleGoogleLogin = () => {
    window.location.href =
     'https://be-qutanya.vercel.app/auth/google'
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-between min-h-screen bg-background2 relative z-10">
        <HeaderAvatar />
        <MenuButton currentPath={"/beranda"} />
      </section>
      <section className="flex flex-col items-center gap-6 top-20 absolute w-full z-20">
        <div className="px-4 w-3/4">
          <Input
            startContent={<SearchIcon className="text-secondary" />}
            isClearable
            placeholder="Cari survei sesuai fashion anda"
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

        <NavbarTop />
      </section>
      {error && (
        <div className="text-red-500 text-center font-bold">{error}</div>
      )}
      <section className="flex flex-col absolute top-64 gap-2 w-full px-4 z-30">
        <div className="flex flex-row min-w-80 items-center justify-between mx-auto">
          <span className="text-md text-secondary leading-none font-bold">
            Survey Tersedia
          </span>
          <span className="text-sm text-secondary leading-none">
            <Select
              placeholder="Pilih kategori"
              selectionMode="multiple"
              className="w-[150px]"
              onSelectionChange={handleSelectChange2 as any}
            >
              {kategori.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </Select>
          </span>
        </div>
        {loading ? (
          <Spinner color="success"></Spinner>
        ) : (
          <Content data={dataSurvei} />
        )}
      </section>
      {/* Display Google login button if no token is found */}
      {!googleToken && (
        <Button className="absolute top-10 right-10" onClick={handleGoogleLogin}>
          Login with Google
        </Button>
      )}
    </DefaultLayout>
  );
}
