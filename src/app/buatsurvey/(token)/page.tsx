"use client";
import { Input, Select, SelectItem, Spinner, Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/layouts/default1";
import { MenuButton } from "@/layouts/menu";
import { HeaderAvatar } from "@/layouts/headerAvatar";
import axios from "axios";
import {  useRouter, useSearchParams } from "next/navigation";


interface Kategori {
  id: number;
  kategori: string;
}

interface KategoriOption {
  value: number;
  label: string;
}

export default function BuatSurveyPage() {
  const [judulSurvey, setJudulSurvey] = useState("");
  const [linkFormResponden, setLinkFormResponden] = useState("");
  const [linkFormEdit, setLinkFormEdit] = useState("");
  const [hargaSurvey, setHargaSurvey] = useState<string | "">("");
  const [kategori, setKategori] = useState<KategoriOption[]>([]);
  const [selectedKategori, setSelectedKategori] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [googleToken, setGoogleToken] = useState<string | null>(null);

  const router = useRouter();
  const param = useSearchParams();
  const query = param.get('token');
  
  useEffect(() => {
    console.log(query);
    // Mengecek token Google di session storage hanya di sisi klien
    if (query){
      sessionStorage.setItem("googleToken", JSON.stringify(query));
      // Set timeout untuk menghapus data setelah 3600 detik (1 jam)
      document.cookie = `session=${query}; path=/; max-age=3600`; // 1 jam
      // Handle successful login
      setTimeout(() => {
        sessionStorage.removeItem("googleToken");
      }, 3600000);
    }

    const token = sessionStorage.getItem("googleToken");
    setGoogleToken(token);

    // Fetch data kategori
    axios
      .get("https://be-qutanya.vercel.app/kategori")
      .then((response) => {
        if (
          response.data.status === "success" &&
          Array.isArray(response.data.data)
        ) {
          const transformedData = response.data.data.map((item: Kategori) => ({
            label: item.kategori,
            value: item.id,
          }));
          setKategori(transformedData);
        } else {
          throw new Error("Data tidak dalam format yang diharapkan");
        }
      })
      .catch((error) => setErrorMessage(error.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const data = event.target.value.split(",").map(Number);
    setSelectedKategori(data);
  };

  const handleSubmit = async () => {
    setErrorMessage("");
    const userData = sessionStorage.getItem("userData");
    let user;
    if (userData) {
      user = JSON.parse(userData);
      console.log(user);
    } else {
      console.log("User data not found in session storage");
      return;
    }
    const surveyData = {
      id_user_create: user.data.uuid,
      title: judulSurvey,
      form_res: linkFormResponden,
      form_meta_req: linkFormEdit,
      kategori: selectedKategori,
      harga: parseFloat(hargaSurvey as string),
    };

    try {
      setLoading(true);
      const response = await axios.post(
        "https://be-qutanya.vercel.app/survei/create",
        surveyData,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        router.push(`/bayar?data=${encodeURIComponent(JSON.stringify(data))}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || "Survei gagal dibuat."
        );
      } else if (error instanceof Error) {
        setErrorMessage(
          error.message || "Terjadi kesalahan yang tidak terduga."
        );
      } else {
        setErrorMessage("Terjadi kesalahan yang tidak diketahui.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-between min-h-screen bg-background2 relative z-10">
        <HeaderAvatar />
        <MenuButton currentPath={"/buatsurvey"} />
      </section>

      <section className="flex flex-col items-center gap-4 top-20 absolute w-full z-20">
        <h2 className="text-md font-bold text-center text-secondary mt-6">
          Buat Survey
        </h2>
        {errorMessage && (
          <div className="text-red-500 text-center font-bold">
            {errorMessage}
          </div>
        )}

        {loading && <Spinner color="success"></Spinner>}

        {/* Jika tidak ada token Google, tampilkan tombol login */}
        {!googleToken ? (
          <Button
            className="w-full mt-4"
            onClick={() =>
              (window.location.href =
                "https://be-qutanya.vercel.app/auth/auth/google")
            }
          >
            Login with Google
          </Button>
        ) : (
          <section className="flex flex-col gap-4 w-full px-4">
            <div className="flex flex-col gap-4 w-full mx-auto">
              <Input
                label="Judul survey"
                placeholder="Masukkan judul survey"
                className="mx-auto lg:w-1/2"
                value={judulSurvey}
                onChange={(e) => setJudulSurvey(e.target.value)}
              />
              <Input
                label="Link Form untuk responden"
                placeholder="Masukkan link form"
                className="mx-auto lg:w-1/2"
                value={linkFormResponden}
                onChange={(e) => setLinkFormResponden(e.target.value)}
              />
              <Input
                label="Link Form untuk akses edit"
                placeholder="Masukkan link form"
                className="mx-auto lg:w-1/2"
                value={linkFormEdit}
                onChange={(e) => setLinkFormEdit(e.target.value)}
              />
              <Select
                label="Kategori"
                placeholder="Pilih kategori"
                selectionMode="multiple"
                className="mx-auto lg:w-1/2"
                onChange={handleSelectChange}
              >
                {kategori.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </Select>

              <Input
                label="Harga survey"
                placeholder="Masukkan harga survey"
                type="number"
                className="mx-auto lg:w-1/2"
                value={hargaSurvey}
                onChange={(e) => setHargaSurvey(e.target.value)}
              />
              <Button
                variant="solid"
                size="lg"
                fullWidth
                className={[
                  "mx-auto",
                  "lg:w-1/2",
                  "w-full",
                  "bg-default-200/50",
                  "dark:bg-default/60",
                  "text-black/90 dark:text-white/90",
                  "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                  "shadow-xl",
                  "bg-transparent",
                  "backdrop-blur-xl",
                  "backdrop-saturate-200",
                  "hover:bg-default-200/70",
                  "dark:hover:bg-default/70",
                  "group-data-[focus=true]:bg-default-200/50",
                  "dark:group-data-[focus=true]:bg-default/60",
                  "!cursor-pointer",
                ].join(" ")}
                onClick={handleSubmit}
              >
                Buat Survey
              </Button>
            </div>
          </section>
        )}
      </section>
    </DefaultLayout>
  );
}