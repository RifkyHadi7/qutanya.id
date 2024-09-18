"use client";

import React, { useEffect, useState } from "react";
import { Card, ScrollShadow, Spinner } from "@nextui-org/react";
import DefaultLayout from "@/layouts/default1";
import { HeaderAvatar } from "@/layouts/headerAvatar";
import { MenuButton } from "@/layouts/menu";
import axios from "axios";
// import { ContentSaya } from "@/layouts/SurveySaya";

interface ClaimUser {
  nama: string;
  email: string;
  tanggal_lahir: string;
  gender: boolean;
  pekerjaan: string;
  provinsi: string;
  kota: string;
}

export default function HasilSurveyPage({
  params,
}: {
  params: { idForm: string };
}) {
  const [loading, setLoading] = useState(true);
  const [dataHasil, setDataHasil] = useState<ClaimUser[]>([]);
  const { idForm } = params;
  useEffect(() => {
    axios
      .post("https://qutanya-be.vercel.app/survei/get-hasil-survei", {
        id_form: idForm,
      })
      .then((response) => {
        if (response.data.status === "success") {
          setDataHasil(response.data.data);
        } else {
          throw new Error("Data tidak dalam format yang diharapkan");
        }
      })
      .catch((error) => console.error(error.message))
      .finally(() => setLoading(false));
  }, [idForm]);
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-between min-h-screen bg-background2 relative z-10">
        <HeaderAvatar />

        <MenuButton />
      </section>

      <section className="flex flex-col items-center absolute top-24 w-full mx-auto z-20">
        <div className="flex flex-col items-center w-full px-4 mx-auto">
          <span className="text-md text-secondary leading-none font-bold">
            Hasil survey
          </span>
          {loading ? (
            <Spinner color="success"></Spinner>
          ) : (
            <div>
              <Card className="w-full h-full mt-2 p-4 bg-white shadow-md flex-grow">
                <ScrollShadow className="max-h-96 overflow-y-auto">
                  {/* <ContentSaya/> */}
                  <div className="mb-4 p-4 border-b border-divider">
                    <h3 className="text-md text-center mb-4 font-semibold">
                      Detail survey
                    </h3>

                    <p className="text-sm text-secondary">
                      Jumlah Total responden : {dataHasil.length}
                    </p>

                    {dataHasil && dataHasil.length > 0 ? (
                      dataHasil.map((item, index) => (
                        <div key={index}>
                          <p className="text-md font-semibold">
                            {" "}
                            Responden {index + 1}
                          </p>
                          <p className="text-sm">Nama : {item.nama}</p>
                          <p className="text-sm">Email : {item.email}</p>
                          <p className="text-sm">
                            Tanggal lahir : {item.tanggal_lahir}
                          </p>
                          <p className="text-sm">
                            Jenis Kelamin :{" "}
                            {item.gender == true ? "Pria" : "Wanita"}
                          </p>
                          <p className="text-sm">
                            Pekerjaan : {item.pekerjaan}
                          </p>
                          <p className="text-sm">
                            Tempat : {item.provinsi}
                            {"-" + item.kota}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-sm text-secondary">
                        No data
                      </p>
                    )}
                  </div>
                </ScrollShadow>
              </Card>
            </div>
          )}
        </div>
      </section>
    </DefaultLayout>
  );
}
