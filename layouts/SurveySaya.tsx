import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import Image from 'next/image';
import IsiSurvei from '../assets/respon_survei.svg'
export const ContentSaya = () => (
  <div>
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 w-full mx-auto"
      shadow="sm"
    >
      <CardBody>
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <Image
              alt="Album cover"
              className="object-cover"
              height={90}
              src={IsiSurvei}
              width="90" // Lebar ditentukan sesuai kebutuhan
            />
          </div>
          <div className="flex-grow">
            {/* Konten lain di sebelah kanan gambar */}
            <h3 className="text-md font-semibold">Survey Saya</h3>
            <p className="text-sm text-secondary">
              Deskripsi singkat tentang survey ini.
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  </div>
);