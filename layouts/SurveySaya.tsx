import React from "react";
import { Card, CardBody, Chip } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import IsiSurvei from "../assets/respon_survei.svg";
import Link from "next/link";

interface Survei {
  judul: string;
  hadiah: number;
  status: string;
  status_payment: string;
  link_form: string;
  created_at: string;
  id_form: string;
  payment_url: string;
}
interface ContentSurvei {
  data: Survei[];
}

function formatDate(dateString: string | number | Date) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    // "en-GB" format for DD/MM/YYYY
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export const ContentSaya = ({ data }: ContentSurvei) => (
  <div>
    {data && data.length > 0 ? (
      data.map((item, index) => (
        <Card
          isBlurred
          className="border-none bg-background/60 dark:bg-default-100/50 w-full mx-auto "
          shadow="sm"
          key={index} // Make sure to add a unique key prop
        >
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <Image
                  alt="Album cover"
                  className="object-cover"
                  height={90}
                  src={IsiSurvei}
                  width="90" // Adjust the width as needed
                />
              </div>
              <div className="flex-grow">
                {/* Content on the right side of the image */}
                <div className="flex flex-row gap-1 mb-2">
                  <h3 className="text-sm font-semibold">{item.judul}</h3>
                  <h3 className="text-sm font-semibold ml-auto shadow-sm bg-background2 rounded-full ">
                    {formatDate(item.created_at)}
                  </h3>
                </div>
                <p className="text-sm ">
                  Status :{" "}
                  {item.status === "close" ? (
                    <Chip className="text-white font-semibold" color="danger"> {item.status}</Chip>
                  ) : (
                    <Chip className="text-white font-semibold" color="success"> {item.status}</Chip>
                  )}
                </p>
                <p className="text-sm text-secondary">
                  Status Payment:{" "}
                  {item.status_payment === "DENIED" ? (
                    <Chip className="text-white font-semibold" color="danger"> {item.status_payment}</Chip>
                  ) : item.status_payment === "CANCELED" ? (
                    <Chip className="text-white font-semibold" color="danger"> {item.status_payment}</Chip>
                  ) : item.status_payment === "PENDING" ? (
                    <Chip className="text-white font-semibold" color="warning"> {item.status_payment}</Chip>
                  ) : item.status_payment === "PENDING!" ? (
                    <Chip className="text-white font-semibold" color="warning"> {item.status_payment}</Chip>
                  ) : (
                    <Chip className="text-white font-semibold" color="success"> {item.status_payment}</Chip>
                  )}
                </p>
              </div>
            </div>
            <Button
              href={item.payment_url}
              className="mt-4 text-white font-semibold"
              color="success"
            >
              Link Pembayaran
            </Button>

            <Link href={`/hasilsurvey/${item.id_form}`} className="p-2 mt-2 text-white bg-warning text-center rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              Hasil
            </Link>
          </CardBody>
        </Card>
      ))
    ) : (
      <p className="text-center text-sm text-secondary">No data</p>
    )}
  </div>
);
