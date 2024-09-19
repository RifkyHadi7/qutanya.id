"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Card, Button } from "@nextui-org/react";
import DefaultLayout from "@/layouts/default1";
import { HeaderAvatar } from "@/layouts/headerAvatar";
import { MenuButton } from "@/layouts/menu";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import IsiSurvei from "@/assets/isi_survey.svg";

interface CheckoutPayment {
  data: {
    harga: string;
    hadiah: number;
    midtrans_link: string;
    total_question: number;
  };
}

const BayarPageComponet = () => {
  const searchParams = useSearchParams(); // Hook untuk mengambil query parameters
  const [paymentData, setPaymentData] = useState<CheckoutPayment | null>(null);

  useEffect(() => {
    // Mengambil dan mendekode parameter data dari URL
    const encodedData = searchParams.get("data");

    if (encodedData) {
      try {
        // Parse kembali JSON yang telah di-encode
        const parsedData: CheckoutPayment = JSON.parse(encodedData);

        // Set data pembayaran ke state
        setPaymentData(parsedData);
      } catch (error) {
        console.error("Failed to parse payment data:", error);
      }
    }
    // console.log(paymentData);
  }, [searchParams]);

  if (!paymentData) {
    return <div>Loading...</div>;
  }

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-between min-h-screen bg-background2">
        <HeaderAvatar />
        <MenuButton />
      </section>

      <section className="flex flex-col gap-4 mt-2 w-full px-4 mx-auto absolute top-20 z-20">
        <div className="flex flex-col items-center w-full px-4 mt-16">
          <div>{paymentData.data.hadiah}</div>
          <Card className="bg-white shadow-lg rounded-lg p-6 mt-2 w-full max-w-md mx-auto">
            <Image
              alt="Survey image"
              className="object-cover mx-auto"
              height={150}
              src={IsiSurvei}
              width={150}
            />
            <h2 className="text-xl font-bold text-secondary mb-4">
              Total Pertanyaan Formulir
            </h2>
            <p className="text-xl font-semibold text-success mb-4">
              {paymentData.data.total_question}
            </p>
            <h2 className="text-xl font-bold text-secondary mb-4">
              Total yang harus dibayar
            </h2>
            <p className="text-xl font-semibold text-success mb-4">
              Rp {paymentData.data.harga.toLocaleString("id-ID")}
            </p>
            <h2 className="text-xl font-bold text-secondary mb-4">
              Hadiah Per-Responden
            </h2>
            <p className="text-xl font-semibold text-success mb-4">
               {Math.floor(paymentData.data.hadiah).toLocaleString("id-ID")}
            </p>
            <Button
              className="w-full bg-success text-white font-semibold"
              onClick={() =>
                (window.location.href = paymentData.data.midtrans_link)
              }
            >
              Bayar {"->"}
            </Button>
          </Card>
        </div>
      </section>
    </DefaultLayout>
  );
};

const BayarPage = () => {
  return (
    <Suspense>
      <BayarPageComponet />
    </Suspense>
  );
};

export default BayarPage;
