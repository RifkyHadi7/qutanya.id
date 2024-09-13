"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  Input,
  Spacer,
  Button,
  Autocomplete,
  AutocompleteItem,
  DatePicker,
  DateInput,
} from "@nextui-org/react";
import {
  QutanyaLogo,
  EyeFilledIcon,
  EyeSlashFilledIcon,
} from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

export default function RegisterPage() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [provinces, setProvinces] = useState([]);
  const [kota, setKota] = useState([]);
  const [provinsi, setProvinsi] = useState(null);
  const [selectedKota, setSelectedKota] = useState(null);
  const [provinsiName, setProvinsiName] = useState("");
  const [selectedKotaName, setSelectedKotaName] = useState("");
  const [gender, setGender] = useState(null);
  const [nama, setNamaLengkap] = useState("");
  const [tanggal_lahir, setTanggalLahir] = useState(new Date());
  const [pekerjaan, setPekerjaan] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const validateEmail = (value) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

  const isInvalidEmail = useMemo(() => {
    if (email === "") return false;
    return !validateEmail(email);
  }, [email]);

  const validateInputs = () => {
    let isValid = true;
    if (!nama) {
      setErrorMessage("Nama Lengkap is required");
      isValid = false;
    }

    if (!email) {
      setErrorMessage("Email is required");
      isValid = false;
    } else if (isInvalidEmail) {
      setErrorMessage("Please enter a valid email.");
      isValid = false;
    }

    if (!tanggal_lahir) {
      setErrorMessage("Tanggal Lahir is required");
      isValid = false;
    }

    if (!gender) {
      setErrorMessage("Gender is required");
      isValid = false;
    }

    if (!provinsi) {
      setErrorMessage("Province is required");
      isValid = false;
    }

    if (!selectedKota) {
      setErrorMessage("Kota is required");
      isValid = false;
    }

    if (!pekerjaan) {
      setErrorMessage("Pekerjaan is required");
      isValid = false;
    }

    if (!password) {
      setErrorMessage("Password is required");
      isValid = false;
    }

    return isValid;
  };

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
    if (provinsi) {
      fetch(
        `https://api.binderbyte.com/wilayah/kabupaten?api_key=511cbb29a18586b69353ad4e0c12869132eea163e31bc0f6b28817a4b1bd964b&id_provinsi=${provinsi}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched kota:", data);
          const transformedData = data.value.map((city) => ({
            label: city.name,
            value: city.id,
          }));
          setKota(transformedData);
        })
        .catch((error) => console.error("Error fetching kota:", error));
    }
  }, [provinsi]);

  const genderOptions = [
    { label: "Pria", value: "Pria" },
    { label: "Wanita", value: "Wanita" },
  ];

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Reset error message

    if (!validateInputs()) {
      setLoading(false);
      return;
    }

    console.log('Tanggal Lahir Sebelum Dikirim:', tanggal_lahir.toString());

    try {
      const response = await axios.post("https://qutanya-be.vercel.app/user", {
        nama,
        tanggal_lahir: tanggal_lahir.toString(),
        gender,
        provinsi: provinsiName,
        kota: selectedKotaName,
        pekerjaan,
        email,
        password,
      });

      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        // Handle successful registration
        alert("Registration successful!");
        router.push("/loginpage");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || "Registration failed."
        );
        const errorDetails = JSON.stringify(error.response?.data, null, 2);
        alert(`Error: ${errorMessage}\nDetails: ${errorDetails}`);
      } else if (error instanceof Error) {
        setErrorMessage(error.message || "An unexpected error occurred.");
        alert(error.message);
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <Head>
        <title>Register - Qutanya.id</title> {/* Set the document title */}
      </Head>
      <section className="flex flex-col items-center justify-center gap-4 mt-5 lg:mt-10 max-w-xs mx-auto">
        <QutanyaLogo size={200} />
        <div className="inline-block max-w-md text-center">
          <h1 className="text-3xl lg:text-4xl font-semibold">Qutanya.id</h1>
        </div>
        {errorMessage && (
          <div className="text-red-500 text-center font-bold">
            {errorMessage}
          </div>
        )}
        <form className="w-full mx-auto max-w-xs" onSubmit={handleRegister}>
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
            onValueChange={(e) => setNamaLengkap(e)}
          />
          <Spacer y={2}></Spacer>

          <DateInput
            id="tanggal-lahir-input"
            label="Tanggal Lahir"
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
                "!hover:bg-white",
                "!dark:hover:bg-default/60",
              ],
            }}
          
            onChange={(e) => {
              setTanggalLahir(e);
              console.log("Tanggal Lahir Dipilih:", e.toString); // Log nilai tanggal
            }}
          />

          <Spacer y={2}></Spacer>

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
          <Spacer y={2}></Spacer>

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
            onSelectionChange={(selected) => {
              setProvinsi(selected);
              const selectedProvince = provinces.find(
                (province) => province.value === selected
              );
              setProvinsiName(selectedProvince?.label || "");
            }}
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
          <Spacer y={2}></Spacer>

          <Autocomplete
            id="city-autocomplete"
            defaultItems={kota}
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
            onSelectionChange={(selected) => {
              setSelectedKota(selected);
              const selectedCity = kota.find((city) => city.value === selected);
              setSelectedKotaName(selectedCity?.label || "");
            }}
          >
            {kota.map((city) => (
              <AutocompleteItem key={city.value} value={city.value}>
                {city.label}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <label
            id="city-label"
            htmlFor="city-autocomplete"
            className="sr-only"
          >
            Kota
          </label>
          <Spacer y={2}></Spacer>

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
            onValueChange={(e) => setPekerjaan(e)}
          />
          <Spacer y={2}></Spacer>

          <Input
            value={email}
            isRequired
            isClearable
            label="Email"
            type="email"
            variant="bordered"
            placeholder="Enter your email"
            className="w-full max-w-md mx-auto"
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
              clearButton: "text-black",
            }}
            color={isInvalidEmail ? "danger" : "success"}
            errorMessage={
              isInvalidEmail ? "Please enter a valid email" : errorMessage
            }
            isInvalid={isInvalidEmail}
            onValueChange={(e) => {
              setEmail(e); // Update email state
              setErrorMessage(""); // Reset error message when user starts typing again
            }}
          />
          <Spacer y={2}></Spacer>
          {/* Password Input */}

          <Input
            value={password}
            isRequired
            label="Password"
            variant="bordered"
            placeholder="Enter your password"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
                aria-label="toggle password visibility"
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="w-full max-w-md mx-auto"
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
            color="success"
            isInvalid={errorMessage ? true : false}
            onValueChange={(e) => setPassword(e)}
          />

          <Spacer y={2}></Spacer>

          <Button
            variant="solid"
            size="md"
            fullWidth
            type="submit"
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
            disabled={loading}
          >
            {loading ? "Registering..." : "Sign Up"}
          </Button>
        </form>
      </section>
    </DefaultLayout>
  );
}
