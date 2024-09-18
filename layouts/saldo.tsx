import React, { useEffect, useState } from "react";
import { Card, CardBody, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation"; // Import useRouter
import { TarikSaldoPopover } from "./popover";

export const Saldo = () => {
  const [saldo, setSaldo] = useState(0);
  const router = useRouter(); // Initialize useRouter
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchSaldo = async () => {
      try {
        setLoading(true);
        const userData = sessionStorage.getItem("userData");
        if (userData) {
          const parsedData = JSON.parse(userData);
          const id_user = parsedData.data.biodata.id_user; // Assuming you have the email in session storage
          console.log(parsedData);
          console.log(id_user);
          // Fetch saldo using POST with email
          const response = await fetch("https://qutanya-be.vercel.app/saldo/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id_user: id_user }), // Send email in the request body
          });

          const result = await response.json();
          console.log(result);
          if (result.status === "success" && result.data) {
            setSaldo(result.data[0].saldo); // Set the fetched saldo
          } else {
            console.log("Failed to fetch saldo or no saldo available.");
          }
        }
      } catch (error) {
        console.error("Error fetching saldo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSaldo(); // Call the function to fetch saldo on component mount
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
            {loading ? (
              <p>loading...</p>
            ) : (
              <div className="col-span-2">
                {/* Konten lain di sebelah kanan gambar */}
                <div className="col-span-2">
                  {/* Konten lain di sebelah kanan gambar */}
                  <h3 className="text-xl font-light text-balance-900">
                    Rp.{saldo.toLocaleString("id-ID")}
                  </h3>
                  <p className="text-sm font-extralight text-secondary">
                    *Penarikan dengan minimal saldo Rp. 15.000
                  </p>
                  <p className="text-sm font-extralight text-secondary">
                    *Saldo Mengendap minimal Rp. 1.000
                  </p>
                  <TarikSaldoPopover />
                </div>
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
