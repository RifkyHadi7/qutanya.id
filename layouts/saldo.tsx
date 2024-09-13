import React, { useEffect, useState } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

export const Saldo = () => {
  const [saldo, setSaldo] = useState(0);

  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setSaldo(parsedData.data.saldo);
    }
  }, []);

  return (
    <div>
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 w-full mx-auto"
        shadow="sm"
      >
        <CardBody>
          <div className="grid gap-4 items-center mx-auto w-full">
            <div className="col-span-2">
              {/* Konten lain di sebelah kanan gambar */}
              <h3 className="text-lg font-bold text-balance">
                Rp {saldo.toLocaleString("id-ID")}
              </h3>
              <p className="text-xs font-extralight text-secondary">
                Penarikan hanya bisa dilakukan dengan minimal saldo pada aplikasi Rp. 15.000,00
              </p>
              <Button className="mt-2">Tarik Saldo</Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};