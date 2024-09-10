"use client";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import React from "react";
import { QutanyaLogo } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import { EyeFilledIcon } from "@/components/icons";
import { EyeSlashFilledIcon } from "@/components/icons";

export default function LoginPage() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 mt-32 gap-4 max-w-xs mx-auto">
        <QutanyaLogo size={200} />
        <div className="inline-block max-w-md text-center justify-center">
          <h1 className="text-3xl lg:text-4xl font-semibold">Qutanya.id</h1>
        </div>

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

        <Input
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
          Login
        </Button>

        <div className="flex flex-nowrap gap-4">
          <Link href="/lupapassword" size="sm" className="text-secondary">
            Forget password
          </Link>
        </div>

        <div className="flex flex-nowrap ">
          <span className="text-secondary" style={{ fontSize: "0.875rem" }}>
            Don't have an account?
          </span>{" "}
          {/* Add two spaces for spacing */}
          <Link href="/register" size="sm" className="text-secondary">
            Create an Account
          </Link>
        </div>
      </section>
    </DefaultLayout>
  );
}
