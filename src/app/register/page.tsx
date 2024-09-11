"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { QutanyaLogo } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import { DateInput } from "@nextui-org/date-input";
import { CalendarDate } from "@internationalized/date";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

export default function RegisterPage() {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [gender, setGender] = useState(null);

  useEffect(() => {
    fetch(
      "https://api.binderbyte.com/wilayah/provinsi?api_key=511cbb29a18586b69353ad4e0c12869132eea163e31bc0f6b28817a4b1bd964b"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched provinces:", data);
        const transformedData = data.value.map((province) => ({
          label: province.name,
          value: province.id,
        }));
        setProvinces(transformedData);
      })
      .catch((error) => console.error("Error fetching provinces:", error));
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      fetch(
        `https://api.binderbyte.com/wilayah/kabupaten?api_key=511cbb29a18586b69353ad4e0c12869132eea163e31bc0f6b28817a4b1bd964b&id_provinsi=${selectedProvince}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched cities:", data);
          const transformedData = data.value.map((city) => ({
            label: city.name,
            value: city.id,
          }));
          setCities(transformedData);
        })
        .catch((error) => console.error("Error fetching cities:", error));
    }
  }, [selectedProvince]);

  const genderOptions = [
    { label: "Pria", value: "pria" },
    { label: "Wanita", value: "wanita" },
  ];

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 mt-12 lg:mt-24 max-w-xs mx-auto">
        <QutanyaLogo size={200} />
        <div className="inline-block max-w-md text-center">
          <h1 className="text-3xl lg:text-4xl font-semibold">Qutanya.id</h1>
        </div>

        <Input
          id="nama-lengkap-input"
          isRequired
          isClearable
          label="Nama Lengkap"
          placeholder="Nama lengkap"
          className="max-w-xs"
          classNames={{
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-white",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            innerWrapper: "bg-white",
            inputWrapper: [
              "shadow-xl",
              "bg-white",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "group-data-[focus=true]:bg-default-200/50",
              "dark:group-data-[focus=true]:bg-default/60",
              "!cursor-text",
              "!hover:bg-white", // Disable hover effect
              "!dark:hover:bg-default/60", // Disable dark mode hover effect
            ],
          }}
        />

        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <DateInput
            id="tanggal-lahir-input"
            label="Tanggal Lahir"
            placeholderValue={new CalendarDate(1995, 10, 6)}
            className="max-w-sm"
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: [
                "bg-white",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: "bg-white",
              inputWrapper: [
                "shadow-xl",
                "bg-white",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "!hover:bg-white", // Disable hover effect
                "!dark:hover:bg-default/60", // Disable dark mode hover effect
              ],
            }}
          />
        </div>

        <Autocomplete
          id="gender-autocomplete"
          defaultItems={genderOptions}
          label="Jenis Kelamin"
          placeholder="Pilih jenis kelamin"
          className="max-w-xs"
          aria-labelledby="gender-label"
          classNames={{
            base: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            listboxWrapper: "bg-transparent",
            popoverContent: [
              "shadow-xl",
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
            ],
            selectorButton: [
              "shadow-xl",
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
            ],
            item: ["text-secondary"],
          }}
          onSelectionChange={(selected) => setGender(selected)}
        >
          {genderOptions.map((option) => (
            <AutocompleteItem key={option.value} value={option.value}>
              {option.label}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <label
          id="gender-label"
          htmlFor="gender-autocomplete"
          className="sr-only"
        >
          Jenis Kelamin
        </label>

        <Autocomplete
          id="province-autocomplete"
          defaultItems={provinces}
          label="Pilih Provinsi"
          placeholder="Cari provinsi"
          className="max-w-xs"
          aria-labelledby="province-label"
          classNames={{
            base: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            listboxWrapper: "bg-transparent",
            popoverContent: [
              "shadow-xl",
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
            ],
            selectorButton: [
              "shadow-xl",
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
            ],
            item: ["text-secondary"],
          }}
          onSelectionChange={(selected) => setSelectedProvince(selected)}
        >
          {provinces.map((province) => (
            <AutocompleteItem key={province.value} value={province.value}>
              {province.label}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <label
          id="province-label"
          htmlFor="province-autocomplete"
          className="sr-only"
        >
          Provinsi
        </label>

        <Autocomplete
          id="city-autocomplete"
          defaultItems={cities}
          label="Pilih Kota"
          placeholder="Cari kota"
          className="max-w-xs"
          aria-labelledby="city-label"
          classNames={{
            base: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            listboxWrapper: "bg-transparent",
            popoverContent: [
              "shadow-xl",
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
            ],
            selectorButton: [
              "shadow-xl",
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
            ],
            item: ["text-secondary"],
          }}
        >
          {cities.map((city) => (
            <AutocompleteItem key={city.value} value={city.value}>
              {city.label}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <label id="city-label" htmlFor="city-autocomplete" className="sr-only">
          Kota
        </label>

        <Input
          id="pekerjaan-input"
          isRequired
          isClearable
          label="Pekerjaan"
          placeholder="Pekerjaan"
          className="max-w-xs"
          classNames={{
            input: [
              "bg-white",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            innerWrapper: "bg-white",
            inputWrapper: [
              "shadow-xl",
              "bg-white",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "!hover:bg-white", // Disable hover effect
              "!dark:hover:bg-default/60", // Disable dark mode hover effect
            ],
          }}
        />

        <Button
          variant="solid"
          size="md"
          fullWidth
          className={[
            "max-w-xs",
            "bg-default-200/50",
            "dark:bg-default/60",
            "text-black/90 dark:text-white/90",
            "shadow-xl",
            "bg-transparent",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
          ].join(" ")}
        >
          Sign Up
        </Button>
      </section>
    </DefaultLayout>
  );
}