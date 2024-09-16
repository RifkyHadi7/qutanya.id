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
  link_form: string;
}

interface ContentProps {
  survei: Survei;
  created_at: string;
}

interface ContentComponentProps {
  data: ContentProps[];
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

export const Content = ({ data }: ContentComponentProps) => {
  return (
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
                    <h3 className="text-sm font-semibold">
                      {item.survei.judul}
                    </h3>
                    <h3 className="text-sm font-semibold ml-auto shadow-sm bg-background2 rounded-full ">
                      {formatDate(item.created_at)}
                    </h3>
                  </div>
                  <p className="text-sm text-secondary">
                    Status :{" "}
                    {item.survei.status === "close" ? (
                      <Chip color="danger"> {item.survei.status}</Chip>
                    ) : (
                      <Chip color="success"> {item.survei.status}</Chip>
                    )}
                  </p>
                  <h3>
                    Komis:{" "}
                    <span className="text-md font-semibold text-success">
                      Rp. {Math.floor(item.survei.hadiah)}
                    </span>
                  </h3>
                </div>
              </div>

              <Link
                href="/klaim"
                className="p-2 mt-2 text-white bg-warning text-center rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                Klaim 💵
              </Link>
            </CardBody>
          </Card>
        ))
      ) : (
        <p className="text-center text-sm text-secondary">No data</p>
      )}
    </div>
  );
};
