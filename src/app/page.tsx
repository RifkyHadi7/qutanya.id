"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { QutanyaLogo } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import { Spinner } from "@nextui-org/react";

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/loginpage"); // Ganti "/loginpage" dengan path halaman login Anda
    }, 4000); // 4000 milidetik = 4 detik

    return () => clearTimeout(timer); // Bersihkan timer saat komponen unmount
  }, [router]);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 mt-32 ">
        <QutanyaLogo size={150} />
        <div className="inline-block max-w-xl text-center justify-center">
          <h1 className="text-3xl lg:text-4xl font-semibold">Qutanya.id</h1>
        </div>

        <div className="flex gap-3"></div>
        <Spinner />
        <div className="mt-8"></div>
      </section>
    </DefaultLayout>
  );
}