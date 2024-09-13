"use client";

import React from "react";
import { Card, ScrollShadow } from "@nextui-org/react";
import DefaultLayout from "@/layouts/default1";
import { HeaderAvatar } from "@/layouts/headerAvatar";
import { MenuButton } from "@/layouts/menu";
// import { Router } from "react-router-dom";
// import { createBrowserHistory } from "history";

const surveyHistory = [
  {
    id: 1,
    title: "Survey 1",
    description: "Deskripsi survey 1",
    date: "2023-01-01",
  },
  {
    id: 2,
    title: "Survey 2",
    description: "Deskripsi survey 2",
    date: "2023-02-01",
  },
  {
    id: 3,
    title: "Survey 3",
    description: "Deskripsi survey 3",
    date: "2023-03-01",
  },
  // Tambahkan riwayat survey lainnya di sini
];

export default function RiwayatSurveyPage() {
  // const history = createBrowserHistory()
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-between min-h-screen bg-background2 relative z-10">
        <HeaderAvatar />
        {/* <Router location={"/riwayatSurvey"} navigator={history}> */}
          <MenuButton />
        {/* </Router> */}
      </section>

      <section className="flex flex-col items-center absolute top-24 w-full mx-auto z-20">
        <div className="flex flex-col items-center w-full px-4 max-w-md mx-auto">
          <h2 className="text-secondary text-2xl font-bold">Riwayat Survey</h2>
          <Card className="w-full h-full mt-2 p-4 bg-white shadow-md flex-grow">
            <ScrollShadow className="max-h-64 overflow-y-auto">
              {surveyHistory.map((survey) => (
                <Card
                  key={survey.id}
                  className="mb-4 p-4 border-b border-gray-200"
                >
                  <h4 className="text-secondary text-sm font-semibold">
                    {survey.title}
                  </h4>
                  <p className="text-default text-sm">{survey.description}</p>
                  <p className="text-gray-500 text-sm">{survey.date}</p>
                </Card>
              ))}
            </ScrollShadow>
          </Card>
        </div>
      </section>
    </DefaultLayout>
  );
}
