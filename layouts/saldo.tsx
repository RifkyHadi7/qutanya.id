import React, { useEffect, useState } from "react";
import { Card, CardBody, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation"; // Import useRouter

export const Saldo = () => {
  const [saldo, setSaldo] = useState(0);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setSaldo(parsedData.data.saldo);
    }
  }, []);

  const handleTarikSaldo = () => {
    router.push("/klaim"); // Redirect to klaim page
  };

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
              <h3 className="text-xl font-light text-balance-900">
                Rp {saldo.toLocaleString("id-ID")}
              </h3>
              <p className="text-sm font-extralight text-secondary">
                *Penarikan dengan minimal saldo Rp. 15.000
              </p>
              <Button className="mt-2" onClick={handleTarikSaldo}>
                Tarik Saldo
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};