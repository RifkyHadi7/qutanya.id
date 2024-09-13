import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Image } from "@nextui-org/react";

interface Article {
  id: string;
  judul: string;
  deskripsi: string;
  isi: string;
  cover?: string;
}

interface ContentProps {
  articles: Article[];
}

export const Content: React.FC<ContentProps> = ({ articles}) => {
  console.log("Articles in Content component:", articles); // Log data yang diterima

  if (articles.length === 0) {
    return <div>No articles available</div>;
  }

  return (
    <div>
      {articles.map((artikel) => (
        <Card
          key={artikel.id}
          isBlurred
          className="border-none bg-background/60 dark:bg-default-100/50 w-full lg:w-1/2 mx-auto mb-4"
          shadow="sm"
        >
          <CardBody>
            <div className="grid grid-cols-3 gap-4 items-center">
              <div className="col-span-1">
                <Image
                  alt={artikel.judul}
                  className="object-cover"
                  height={90}
                  shadow="md"
                  src={artikel.cover || "https://nextui.org/images/album-cover.png"}
                  width="100%"
                />
              </div>
              <div className="col-span-2">
                <h3 className="text-md font-semibold">{artikel.judul}</h3>
                <p className="text-sm text-secondary">{artikel.deskripsi}</p>
                <Button className="mt-2" onClick={() => {}}>
                  Baca Artikel
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};