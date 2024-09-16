"use client";

import React, { useEffect, useState } from "react";
import { Card, ScrollShadow, Tabs, Tab } from "@nextui-org/react";
import DefaultLayout from "@/layouts/default1";
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
    <DefaultLayout>
      <section className="flex flex-col items-center justify-between min-h-screen bg-background2 relative z-10">
        <HeaderAvatar />

        <MenuButton />
      </section>
      
      <section className="flex flex-col items-center absolute top-24 w-full mx-auto z-20 ">
        <div className="flex flex-col items-center w-full px-4 mx-auto">
        {error && (
          <div className="text-red-500 text-center font-bold">
            {error}
          </div>
        )}

          <Card className="w-full h-full mt-2 p-4 bg-white shadow-md flex-grow">
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
                <ScrollShadow className="max-h-96 overflow-y-auto">
                  <Content data={dataSurvey} />
                </ScrollShadow>
              </Tab>
              <Tab className="w-full" title="Survey Saya">
                <ScrollShadow className="max-h-96 overflow-y-auto">
                  <ContentSaya data={myData} />
                </ScrollShadow>
              </Tab>
            </Tabs>
          </Card>
        </div>
      </section>
    </DefaultLayout>
  );
}
