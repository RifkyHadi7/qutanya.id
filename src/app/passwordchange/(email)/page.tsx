"use client";

import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import React, { Suspense, useState } from "react";
import DefaultLayout from "@/layouts/default";
import { EyeFilledIcon } from "@/components/icons";
import { EyeSlashFilledIcon } from "@/components/icons";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

const LupaComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");
    try {
      const payload = {
        email,
        password
      };
      console.log("Sending request to /user/reset-password with payload:", payload);
      const response = await axios.post("https://qutanya-be.vercel.app/user/lupapassword", payload, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      console.log("Response received:", response);
      if (response.data.status === "success") {
        setMessage("Password berhasil direset. Mengarahkan ke halaman login...");
        router.push("/loginpage"); // Ganti dengan halaman tujuan berikutnya
      } else {
        setMessage("Terjadi kesalahan. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setMessage("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center mt-32 gap-2 max-w-xs mx-auto">
        <div className="inline-block max-w-md text-center justify-center">
          <h1 className="text-2xl lg:text-3xl font-bold">Reset your password</h1>
        </div>

        <span className="text-secondary">Please enter your new password</span>

        <Input
          isRequired
          label="Password"
          variant="bordered"
          placeholder="Enter your new password"
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
          className="max-w-xs"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

        <Button
          variant="solid"
          size="md"
          fullWidth
          className={[
            "max-w-xs",
            "bg-default-200/50", // Background color
            "dark:bg-default/60", // Background color for dark mode
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            "shadow-xl",
            "bg-transparent",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focus=true]:bg-default-200/50",
            "dark:group-data-[focus=true]:bg-default/60",
            "!cursor-pointer",
          ].join(" ")}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Loading..." : "Done"}
        </Button>

        {message && (
          <div className="mt-4 text-center text-secondary">
            {message}
          </div>
        )}
      </section>
    </DefaultLayout>
  );
}

export default function LupaPage() {
  <Suspense>
    <LupaComponent></LupaComponent>
  </Suspense>
};