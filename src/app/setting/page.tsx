"use client";

import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import DefaultLayout from "@/layouts/default1";
import { Divider } from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { EyeFilledIcon } from "@/components/icons";
import { EyeSlashFilledIcon } from "@/components/icons";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isVisible, setIsVisible] = React.useState(false);
  const [countdown, setCountdown] = useState(60);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <DefaultLayout>
      <section className="flex flex-col h-screen bg-background2 mx-auto">
        <header className="relative bg-[#25E5DA] shadow-lg rounded-b-extra p-4 pb-12 flex items-center justify-between w-full">
          <div className="flex items-center">
            <img
              src="/path/to/profile.jpg"
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
            <div className="ml-4">
              <span className="text-lg font-semibold text-secondary">Hi,</span>
              <span className="text-lg font-semibold text-secondary">
                {" "}
                John Doe
              </span>
            </div>
          </div>
        </header>

        <section className="flex flex-col items-center justify-center gap-2">
          <div className="inline-block max-w-xs text-center">
            <h2 className="text-xl lg:text-2xl mt-8 text-secondary">
              General Settings
            </h2>
          </div>

          <Divider className="my-4 mx-4" />

          <Accordion variant="splitted" className="w-full max-w-xs">
            <AccordionItem
              key="1"
              aria-label="Accordion 1"
              title="Update Biodata"
            >
              <div className="flex flex-col gap-4">
                <Input
                  label="Nama"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  label="Pekerjaan"
                  placeholder="Enter your job"
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                />
                <Button
                  variant="solid"
                  size="md"
                  fullWidth
                  className={[
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
                  Save
                </Button>
              </div>
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label="Accordion 2"
              title="Ganti Password"
            >
              <div className="flex flex-col gap-4">
                <Input
                  isRequired
                  label="Old Password"
                  variant="bordered"
                  placeholder="Enter your old password"
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
                <Input
                  isRequired
                  label="New Password"
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
                  Ganti
                </Button>
              </div>
            </AccordionItem>
          </Accordion>

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
              "mt-8",
            ].join(" ")}
          >
            Log Out
          </Button>
        </section>
      </section>
    </DefaultLayout>
  );
}
