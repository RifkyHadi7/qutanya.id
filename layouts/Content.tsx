import React from "react";
import { Card, CardBody, Button } from "@nextui-org/react";
import Image from "next/image";
import IsiSurvei from "../assets/respon_survei.svg";

// Define the TypeScript interface for props
interface Pembuat {
  nama: string;
}

interface Survei {
  judul: string;
  kategori: string[]; // Assuming kategori is an array of strings
  pembuat: Pembuat;
  hadiah: number; // Assuming hadiah is a number
}

interface ContentProps {
  data: Survei[];
}

export const Content: React.FC<ContentProps> = ({ data }) => (
  <div>
    {data.map((item, index) => (
      <Card
        key={index}
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 w-full mx-auto mb-4"
        shadow="sm"
      >
        <CardBody>
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <Image
                alt="Survey image"
                className="object-cover"
                height={90}
                src={IsiSurvei}
                width={90}
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-md font-semibold">{item.judul}</h3>
              <p className="text-sm text-secondary">
                Kategori: {item.kategori?.length ? item.kategori.join(', ') : 'Tidak ada kategori'}
              </p>
              <p className="text-sm text-secondary">Pembuat: {item.pembuat.nama}</p>
              <p className="text-sm text-secondary">Hadiah: {item.hadiah}</p>
              <Button className="mt-2">Mulai Survey</Button>
            </div>
          </div>
        </CardBody>
      </Card>
    ))}
  </div>
);
