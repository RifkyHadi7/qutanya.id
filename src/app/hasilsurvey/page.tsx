"use client";

import React from "react";
import { Card, ScrollShadow } from "@nextui-org/react";
import DefaultLayout from "@/layouts/default1";
import { HeaderAvatar } from "@/layouts/headerAvatar";
import { MenuButton } from "@/layouts/menu";
// import { ContentSaya } from "@/layouts/SurveySaya";

export default function HasilSurveyPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-between min-h-screen bg-background2 relative z-10">
        <HeaderAvatar />
        
          <MenuButton  />
        
      </section>

      <section className="flex flex-col items-center absolute top-24 w-full mx-auto z-20">
        <div className="flex flex-col items-center w-full px-4 mx-auto">
        <span className="text-md text-secondary leading-none font-bold">
            Hasil survey
          </span>
          <Card className="w-full h-full mt-2 p-4 bg-white shadow-md flex-grow">
            <ScrollShadow className="max-h-64 overflow-y-auto">
              
                {/* <ContentSaya/> */}
                <div className="mb-4 p-4 border-b border-divider">
                  <h3 className="text-sm font-semibold text-secondary">Detail survey</h3>
                  <p className="text-sm text-secondary">Jumlah responden</p>
                  <p className="text-sm text-secondary">Hadiah</p>
                </div>
              
            </ScrollShadow>
          </Card>
        </div>
      </section>
    </DefaultLayout>
  );
}