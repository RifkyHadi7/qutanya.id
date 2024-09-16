"use client";

import React, { useEffect, useState } from "react";
import { Input, Select, SelectItem, Spinner } from "@nextui-org/react";
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
  kategori_survei: any[];
  user: {
    nama: string;
  };
  hadiah: number;
}

export default function BerandaPage() {
  const [dataSurvei, setDataSurvei] = useState<Survei[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [kategori, setKategori] = useState<Category[]>([]);
  const [dataTemp, setDateTemp] = useState<Survei[]>([]);

  // Use useCallback to memoize the fetchData function
  const fetchData = async () => {
    setLoading(true);

    // const filterState = filterKategori.join(",");
    const response = await axios.post("https://qutanya-be.vercel.app/survei/get-all");

    if (response.data.status === "success") {
      console.log(response.data.data);
      // const mappedData: Survei[] = response.data.data?.map((item: any) => ({
      //   judul: item.judul,
      //   kategori_survei: item.kategori_survei,
      //   user: item.user,
      //   hadiah: item.hadiah,
      // }));

      setDateTemp(response.data.data);
      setDataSurvei(response.data.data);
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
          "https://qutanya-be.vercel.app/kategori"
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
    fetchData();
  }, []);

  // const handleSelectChange = (
  //   selectedValues: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   // Store selected values without fetching data immediately
  //   const selected = selectedValues.target.value.split(",").map(String);
  //   console.log(selected);
  //   setFilterKategori(selected);
  // };

  const handleSelectChange2 = (selectedValues: Set<string>) => {
    const selected = Array.from(selectedValues).map(String);
    // [1,2]
    
    if (selected.length == 0) {
      setDataSurvei(dataTemp);
    } else {
      // ['1','2','3']
      const dataFilter = dataTemp.filter((e) => {
        // Check if any of the kategori_survei objects have id_filter equal to 1
        return e.kategori_survei.some((kat) => {
          return selected.includes(String(kat.id_filter));
        });
        // Filter based on status and id_filter condition

        // return hasKategoriFilter && e.status === "close";
      });
      setDataSurvei(dataFilter);
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, [filterKategori]);

  return (
    <section className="min-h-screen bg-primary relative">
      
      <HeaderAvatar />
      
      <section className="flex flex-col items-center gap-6 top-20 w-full">
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

      <section className="flex flex-col items-center justify-between bg-background2 relative">
        <section className="flex flex-col top-64 gap-2 sm:w-full lg: w-full lg:w-[50%] px-4">
          <div className="flex flex-row min-w-80 items-center justify-between mx-auto mt-2">
            <span className="text-md text-secondary leading-none font-bold">
              Survey Tersedia
            </span>
            <span className="text-sm text-secondary leading-none">
              <Select
                placeholder="Pilih kategori"
                selectionMode="multiple"
                className="w-[150px]"
                onSelectionChange={handleSelectChange2 as any}
                // onClose={ handleSelectClose}
              >
                {kategori.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </Select>
            </span>
          </div>

          {error && (
          <div className="text-red-500 text-center font-bold">
            {error}
          </div>
        )}
                
          {loading ? (
            <Spinner color="success"></Spinner>
          ) : (
            <div className="h-[30rem] overflow-auto">
              <Content data={dataSurvei} />
            </div>
          )}
        </section>
      </section>
      <section className="fixed bottom-0">
        <MenuButton  />
      </section>
    </section>
  );
}
