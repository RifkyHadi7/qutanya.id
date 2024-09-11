
"use client";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import React from "react";
import { QutanyaLogo } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import { EyeFilledIcon } from "@/components/icons";
import { EyeSlashFilledIcon } from "@/components/icons";

export default function LupaPage() {
const [isVisible, setIsVisible] = React.useState(false);

const toggleVisibility = () => setIsVisible(!isVisible);

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
      >
        Send Code
      </Button>
    </section>
  </DefaultLayout>
);}