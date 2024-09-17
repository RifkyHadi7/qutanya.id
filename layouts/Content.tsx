import React from "react";
import { Card, CardBody, Button } from "@nextui-org/react";
import Image from "next/image";
import IsiSurvei from "../assets/respon_survei.svg";
import moneyReward from "../assets/money.svg";

// Define the TypeScript interface for props

interface Survei {
  judul: string;
  kategori_survei: any[];
  user: {
    nama: string;
  };
  hadiah: number;
}
interface ContentProps {
  data: Survei[];
}

export const Content: React.FC<ContentProps> = ({ data }) => {
  return (
    <div>
      {data.map((item, index) => (
        <Card
          key={index}
          isBlurred
          className="border-none bg-background/60 dark:bg-default-100/50 w-full mx-auto mb-4 mt-1"
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
                <div className="flex gap-2 justify-between">
                  <h3 className="text-md text-secondary text-justify">
                    {item.judul}
                  </h3>
                  <p className="text-sm text-secondary bg-background2 p-1 rounded-full shadow-sm">
                    oleh:{" "}
                    <span className="text-background"> {item.user.nama}</span>
                  </p>
                </div>

                <p className="text-sm text-secondary">Kategori : </p>
                <div className="flex flex-row gap-2 flex-wrap items-center ">
                  {item.kategori_survei?.map((e, i) => (
                    <p
                      key={i}
                      className="text-background border-medium text-sm px-2 py-0 rounded-md border-background"
                    >
                      {e.kategori_filter.kategori}
                    </p>
                  ))}
                </div>
                
                <div className=" flex flex-row-reverse w-full mt-2">
                  {/* Other content */}

                  <div className="border-medium p-1 text-success border-success rounded-md flex flex-col items-center  ml-auto">
                    <Image
                      alt="Survey image"
                      className="object-cover"
                      height={30}
                      src={moneyReward}
                      width={30}
                    />
                    <p className="text-sm text-success">
                      Rp.{item.hadiah.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};
