"use client";

import React, { Suspense, useState } from "react";
import { Card, Button, Input } from "@nextui-org/react";
import DefaultLayout from "@/layouts/default1";
import { HeaderAvatar } from "@/layouts/headerAvatar";
import { MenuButton } from "@/layouts/menu";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";

const KlaimKeuntunganComponent = () => {
  const param = useSearchParams();
  const saldoDidapat = param.get("saldo");
  const [linkBukti, setLinkBukti] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleKlaim = async () => {
    try {
      setLoading(true);
      setErrorMessage("");
      const userData = sessionStorage.getItem("userData");
      let user;
      if (userData) {
        user = JSON.parse(userData);
      } else {
        setErrorMessage("Please refresh page and login again");
        return;
      }
      const response = await axios.post(
        // "https://qutanya-be.vercel.app/survei/claim-reward",
        "https://qutanya-be.vercel.app/survei/claim-reward",
        {
          link_form: linkBukti,
          id_user_create: user.data.uuid,
        }
      );

      if (response.status === 200) {
        setLoading(true);
        router.push("/balance");
        setLoading(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || "Gagal melakukan Claim!."
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
        <MenuButton />
      </section>

      <section className="flex flex-col items-center gap-4 top-20 absolute w-full z-20">
        <div className="flex flex-col items-center w-full px-4 mt-4">
          {" "}
          {/* Menambahkan margin bawah */}
          <h2 className="text-secondary text-md font-bold">Klaim Reward</h2>
          {errorMessage && (
            <div className="text-red-500 text-center font-bold">
              {errorMessage}
            </div>
          )}
          <Card className="bg-primary shadow-lg rounded-lg p-6 mt-2 w-full max-w-md mx-auto">
            <h2 className="text-sm font-bold text-secondary mb-2">
              Saldo yang Didapat dari Isi Survey
            </h2>
            <p className="text-xl font-semibold text-success mb-2">
              Rp. {saldoDidapat}
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
                  "!hover:bg-white", // Disable hover effect
                  "!dark:hover:bg-default/60", // Disable dark mode hover effect
                ],
                clearButton: "text-black",
              }}
              onChange={(e) => setLinkBukti(e.target.value)}
              onClear={() => setLinkBukti("")} // Handler for clearing the text
            />
            <Button
              className="w-full bg-background text-white font-semibold"
              isLoading={loading}
              onClick={handleKlaim}
            >
              Klaim Keuntungan 💵
            </Button>
          </Card>
        </div>
      </section>
    </DefaultLayout>
  );
};

const KlaimKeuntunganPage = () => {
  return (
    <Suspense>
      <KlaimKeuntunganComponent />
    </Suspense>
  );
};

export default KlaimKeuntunganPage;
