import React, { useState, useEffect } from "react";
import { Popover, PopoverTrigger, PopoverContent, Button, Input } from "@nextui-org/react";

interface Transaction {
  id: number;
  nominal: number;
  pemasukan: boolean;
  keterangan: string;
  created_at: string;
}

export const TarikSaldoPopover: React.FC = () => {
  const [jumlah, setJumlah] = useState("");
  const [saldo, setSaldo] = useState<number | null>(null);

  const fetchSaldo = async () => {
    try {
      const userData = sessionStorage.getItem("userData");
      if (!userData) {
        throw new Error("User data not found in sessionStorage");
      }

      const parsedData = JSON.parse(userData);
      const id_user = parsedData.data.biodata.id_user;

      const response = await fetch("https://qutanya-be.vercel.app/saldo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_user }),
      });

      const result = await response.json();

      console.log("API response:", result); // Log the entire response

      if (result.status === "success" && result.data && result.data.length > 0) {
        setSaldo(result.data[0].saldo); // Access the first element of the array to get saldo
        console.log("Fetched saldo:", result.data[0].saldo);
      } else {
        console.log("Failed to fetch saldo");
      }
    } catch (error) {
      console.error("Error fetching saldo:", error);
    }
  };

  useEffect(() => {
    fetchSaldo();
  }, []);

  const handleSubmit = async () => {
    try {
      const nominal = Number(jumlah);
      if (nominal < 15000) {
        alert("Jumlah penarikan minimal adalah 15.000.");
        return;
      }

      if (saldo !== null && nominal > saldo) {
        alert("Jumlah penarikan melebihi saldo yang tersedia.");
        return;
      }

      const userData = sessionStorage.getItem("userData");
      if (!userData) {
        throw new Error("User data not found in sessionStorage");
      }

      const parsedData = JSON.parse(userData);
      const id_user = parsedData.data.biodata.id_user;

      const newTransaction = {
        id_user,
        nominal: nominal,
        pemasukan: false,
        keterangan: "Penarikan Saldo",
      };

      console.log("Sending transaction data:", newTransaction);

      const response = await fetch("https://qutanya-be.vercel.app/saldo/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTransaction),
      });

      const result = await response.json();

      console.log("API response:", result);

      if (response.ok && result.status === "success" && result.data) {
        alert("Transaksi berhasil ditambahkan.");
        fetchSaldo(); // Fetch saldo again after successful transaction
      } else {
        alert("Gagal menambahkan transaksi.");
      }
    } catch (error) {
      console.error("Error submitting transaction:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  return (
    <Popover placement="bottom" showArrow offset={10}>
      <PopoverTrigger>
        <Button color="primary">Tarik Saldo</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[360px]">
        {(titleProps) => (
          <div className="px-1 py-2 w-full">
            <p className="text-small font-bold text-secondary" {...titleProps}>
              Penarikan Saldo
            </p>
            <div className="mt-2 flex flex-col gap-2 w-full">
              <Input
                placeholder="Jumlah Penarikan"
                label="Jumlah"
                size="sm"
                variant="bordered"
                value={jumlah}
                onChange={(e) => setJumlah(e.target.value)}
                style={{ color: "black" }} // Set text color to black
              />
              <a href="https://example.com/form-pengajuan-penarikan" target="_blank" rel="noopener noreferrer" className="text-secondary">
                Form Pengajuan Penarikan
              </a>
              <Button color="secondary" className="mt-2" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};