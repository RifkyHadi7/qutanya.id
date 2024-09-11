import React from "react";
import {  Card, CardBody } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
export const Content = () => (
  <div>
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 w-full lg:w-1/2 mx-auto"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="col-span-1">
            <Image
              alt="Album cover"
              className="object-cover"
              height={90}
              shadow="md"
              src="https://nextui.org/images/album-cover.png"
              width="100%"
            />
          </div>
          <div className="col-span-2">
            {/* Konten lain di sebelah kanan gambar */}
            <h3 className="text-md font-semibold">Judul Artikel</h3>
            <p className="text-sm text-secondary">Deskripsi singkat tentang artikel ini.</p>
            <Button className="mt-2">Baca Artikel</Button>
          </div>
        </div>
      </CardBody>
    </Card>
  </div>
    
);