"use client";

import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import React, { Suspense, useState } from "react";
import DefaultLayout from "@/layouts/default";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

const KonfirmasiNamaTanggalLahirComponent = () => {
  const [nama, setNama] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState({
    dd: "",
    mm: "",
    yyyy: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email: any = searchParams.get("email");

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");
    try {
      const tanggal_lahir = `${tanggalLahir.yyyy}-${tanggalLahir.mm}-${tanggalLahir.dd}`;
      const payload = {
        nama,
        email,
        tanggal_lahir: tanggal_lahir.toString(),
      };
      console.log("Sending request to /user/otp with payload:", payload);
      const response = await axios.post(
        "https://qutanya-be.vercel.app/user/otp",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log("Response received:", response);
      if (response.data.status === "success") {
        setMessage(
          "Data berhasil diverifikasi. Mengarahkan ke halaman berikutnya..."
        );
        router.push(`/passwordchange?email=${encodeURIComponent(email)}`);
      } else {
        setMessage(
          "Nama atau tanggal lahir tidak ditemukan. Silakan coba lagi."
        );
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setMessage("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center mt-32 gap-2 max-w-xs mx-auto">
        <div className="inline-block max-w-md text-center justify-center">
          <h1 className="text-3xl lg:text-4xl font-bold">
            Konfirmasi Nama dan Tanggal Lahir
          </h1>
        </div>

        <span className="text-secondary text-center">
          Masukkan nama dan tanggal lahir Anda untuk melanjutkan
        </span>

        <div className="flex flex-col gap-2 mt-4 w-full">
          <Input
            placeholder="Nama Lengkap"
            className="w-full text-center text-lg font-bold"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
          <div className="flex flex-grow gap-2 w-full">
            <Input
              type="number"
              placeholder="DD"
              maxLength={2}
              className="w-12 h-12 text-center text-lg font-bold w-full"
              value={tanggalLahir.dd}
              onChange={(e) =>
                setTanggalLahir({ ...tanggalLahir, dd: e.target.value })
              }
            />
            <Input
              type="number"
              placeholder="MM"
              maxLength={2}
              className="w-12 h-12 text-center text-lg font-bold w-full"
              value={tanggalLahir.mm}
              onChange={(e) =>
                setTanggalLahir({ ...tanggalLahir, mm: e.target.value })
              }
            />
            <Input
              type="number"
              placeholder="YYYY"
              maxLength={4}
              className="w-20 h-12 text-center text-lg font-bold w-full"
              value={tanggalLahir.yyyy}
              onChange={(e) =>
                setTanggalLahir({ ...tanggalLahir, yyyy: e.target.value })
              }
            />
          </div>
        </div>

        <Button
          variant="solid"
          size="md"
          fullWidth
          className={[
            "max-w-xs",
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
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </Button>

        {message && (
          <div className="mt-4 text-center text-secondary">{message}</div>
        )}
      </section>
    </DefaultLayout>
  );
};

const KonfirmasiNamaTanggalLahirPage = () => {
  return <Suspense>
    <KonfirmasiNamaTanggalLahirComponent></KonfirmasiNamaTanggalLahirComponent>
  </Suspense>;
};

export default KonfirmasiNamaTanggalLahirPage;
