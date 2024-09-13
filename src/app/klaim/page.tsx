"use client";

import React, { useState } from "react";
import { Card, Button, Input } from "@nextui-org/react";
import DefaultLayout from "@/layouts/default1";
import { HeaderAvatar } from "@/layouts/headerAvatar";
import { MenuButton } from "@/layouts/menu";

export default function KlaimKeuntunganPage() {
  const saldoDidapat = "Rp 50.000"; // Contoh saldo yang didapat dari mengisi survey
  const [linkBukti, setLinkBukti] = useState("");

  const handleKlaim = () => {
    if (linkBukti) {
      alert("Klaim anda telah dikirimkan! Saldo akan masuk dalam beberapa saat");
      // Arahkan pengguna ke halaman riwayat survey setelah klaim berhasil
      router.push("/riwayatsurvey");
    } else {
      alert("Harap masukkan link bukti pengisian survey.");
    }
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-between min-h-screen bg-background2 relative z-10">
        <HeaderAvatar />
        <MenuButton />
      </section>

      <section className="flex flex-col items-center gap-4 top-20 absolute w-full z-20">
        <div className="flex flex-col items-center w-full px-4 mt-4">
          <h2 className="text-secondary text-md font-bold">
            Klaim Reward
          </h2>
          <Card className="bg-primary shadow-lg rounded-lg p-6 mt-2 w-full max-w-md mx-auto">
            <h2 className="text-sm font-bold text-secondary mb-2">
              Saldo yang Didapat dari Isi Survey
            </h2>
            <p className="text-xl font-semibold text-secondary mb-">
              {saldoDidapat}
            </p>
            <Input
              value={linkBukti}
              isRequired
              isClearable
              label="Link Bukti Pengisian Survey"
              type="url"
              variant="bordered"
              placeholder="Masukkan link bukti pengisian"
              className="w-full max-w-md mx-auto mb-4"
              classNames={{
                label: "text-black/50 dark:text-white/90",
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
                  "group-data-[focus=true]:bg-default-200/50",
                  "dark:group-data-[focus=true]:bg-default/60",
                  "!cursor-text",
                  "!hover:bg-white",
                  "!dark:hover:bg-default/60",
                ],
                clearButton: "text-black",
              }}
              onChange={(e) => setLinkBukti(e.target.value)}
              onClear={() => setLinkBukti("")} // Handler for clearing the text
            />
            <Button className="w-full bg-background" onClick={handleKlaim}>
              Klaim Keuntungan
            </Button>
          </Card>
        </div>
      </section>
    </DefaultLayout>
  );
}
