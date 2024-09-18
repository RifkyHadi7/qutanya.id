"use client";

import React, { useEffect, useState } from "react";
import { Card, Tabs, Tab } from "@nextui-org/react";
// import DefaultLayout from "@/layouts/default1";
import { HeaderAvatar } from "@/layouts/headerAvatar";
import { MenuButton } from "@/layouts/menu";
import { Content } from "@/layouts/ContentRiwayat";
import { ContentSaya } from "@/layouts/SurveySaya";
import axios from "axios";

export default function RiwayatSurveyPage() {
  const [error, setError] = useState<string | null>(null);
  const [dataSurvey, setDataSurvey] = useState([]);
  const [myData, setMyData] = useState<[]>([]);
  useEffect(() => {
    const parseData = sessionStorage.getItem("userData");
    const user = JSON.parse(parseData as any);
    const fetchSurvey = async () => {
      try {
        const response = await axios.post(
          "https://qutanya-be.vercel.app/survei/get-riwayat",
          {
            id_user: user.data.biodata.id_user,
          }
        );
        if (response.data.status === "success") {
          setDataSurvey(response.data.data);
        } else {
          throw new Error("Data tidak dalam format yang diharapkan");
        }
      } catch (error: any) {
        setError(error.message);
      }
    };

    const fetchMySurvey = async () => {
      try {
        const response = await axios.post(
          "https://qutanya-be.vercel.app/survei/get-riwayat-my",
          {
            id_user: user.data.biodata.id_user,
          }
        );
        if (response.data.status === "success") {
          setMyData(response.data.data);
        } else {
          throw new Error("Data tidak dalam format yang diharapkan");
        }
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchSurvey();
    fetchMySurvey();
  }, []);

  return (
    // <DefaultLayout>

    <section className="min-h-screen bg-primary relative">
      <HeaderAvatar />
      <section className="flex flex-col items-center justify-between bg-background2 relative">
        
        <section className="flex flex-col top-64 gap-2 lg:w-[50%] px-4 mt-5">
          <div className="flex flex-col items-center px-4 mx-auto min-w-80 w-full">
            {error && (
              <div className="text-red-500 text-center font-bold">{error}</div>
            )}

            <Card className="flex flex-col gap-2 w-full px-4">
              <Tabs
                aria-label="Options"
                variant="underlined"
                classNames={{
                  tabList:
                    "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                  cursor: "w-full bg-[#22d3ee]",
                  tab: "w-full px-0 h-12",
                  tabContent: "group-data-[selected=true]:text-[#06b6d4]",
                }}
              >
                <Tab className="w-full" title="Riwayat Survey">
                  <div className=" h-[35rem] overflow-auto">
                    <Content data={dataSurvey} />
                  </div>
                </Tab>
                <Tab className="w-full" title="Survey Saya">
                  <div className=" h-[35rem] overflow-auto">
                    <ContentSaya data={myData} />
                  </div>
                </Tab>
              </Tabs>
            </Card>
          </div>
        </section>

        <section className="w-full fixed bottom-0">
          <MenuButton />
        </section>
      </section>
    </section>

    // </DefaultLayout>
  );
}
