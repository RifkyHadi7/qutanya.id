"use client";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { QutanyaLogo } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LupaPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");
    try {
      console.log("Sending request to /email with email:", email);
      const response = await axios.post("https://qutanya-be.vercel.app/user/email", { email }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      console.log("Response received:", response);
      console.log("Response data:", response.data);
      if (response.data.status === "success") {
        setMessage("Email found.");
        console.log("Redirecting to /konfirmasi");
        router.push(`/konfirmasi?email=${encodeURIComponent(email)}`); // Redirect to confirmation page with email as query parameter
      } else {
        setMessage("Email not found. Please try again.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center mt-32 gap-2 mx-auto">
        <QutanyaLogo size={200} />
        <div className="inline-block max-w-md text-center justify-center">
          <h1 className="text-3xl lg:text-4xl font-semibold">Qutanya.id</h1>
        </div>

        <div className="text-2xl text-primary text-lg font-semibold">
          Password Recovery
        </div>
        <span className="text-secondary">Enter your email to recover your password</span>

        <Input
          isRequired
          isClearable
          label="Email"
          type="email"
          variant="bordered"
          placeholder="Enter your email"
          className="max-w-xs"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          {loading ? "Loading..." : "Submit"}
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