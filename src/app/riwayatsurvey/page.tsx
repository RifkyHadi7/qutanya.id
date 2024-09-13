"use client";

import React from "react";
import { Card, ScrollShadow, Tabs, Tab } from "@nextui-org/react";
import DefaultLayout from "@/layouts/default1";
import { HeaderAvatar } from "@/layouts/headerAvatar";
import { MenuButton } from "@/layouts/menu";
import { Content } from "@/layouts/ContentRiwayat";
import { ContentSaya } from "@/layouts/SurveySaya";

export default function RiwayatSurveyPage() {

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-between min-h-screen bg-background2 relative z-10">
        <HeaderAvatar />
      
          <MenuButton currentPath={"/riwayatsurvey"} />

      </section>

      <section className="flex flex-col items-center absolute top-24 w-full mx-auto z-20">
        <div className="flex flex-col items-center w-full px-4 mx-auto">
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
                <ScrollShadow className="max-h-64 overflow-y-auto">
                  <Content />
                </ScrollShadow>
              </Tab>
              <Tab className="w-full" title="Survey Saya">
                <ScrollShadow className="max-h-64 overflow-y-auto">
                  <ContentSaya />
                </ScrollShadow>
              </Tab>
            </Tabs>
          </Card>
        </div>
      </section>
    </DefaultLayout>
  );
}
