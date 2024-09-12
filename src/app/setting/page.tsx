"use client";

import React, { useState, useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import DefaultLayout from "@/layouts/default1";
import { Divider } from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { EyeFilledIcon } from "@/components/icons";
import { EyeSlashFilledIcon } from "@/components/icons";
import { HeaderAvatar } from "@/layouts/headerAvatar";
import { useRouter } from "next/navigation"; // Import useRouter

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isVisible, setIsVisible] = React.useState(false);
  const [countdown, setCountdown] = useState(60);
  const [userData, setUserData] = useState(null);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      setUserData(JSON.parse(userData).data);
    }
  }, []);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.clear();

    // Clear session cookie
    document.cookie = "session=; path=/; max-age=0";

    // Redirect to login page
    router.push("/loginpage");
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col h-screen bg-background2 mx-auto">
        <HeaderAvatar />

        <section className="flex flex-col items-center justify-center gap-2">
          <div className="inline-block max-w-xs text-center">
            <h2 className="text-xl lg:text-2xl mt-8 text-secondary">
              General Settings
            </h2>
          </div>

          <Divider className="my-4 mx-4" />

          {userData && (
            <div className="flex flex-col items-center w-full max-w-xs bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-secondary">Biodata</h3>
              <p className="text-sm text-black/90 dark:text-white/90">
                Nama: {userData.nama}
              </p>
              <p className="text-sm text-black/90 dark:text-white/90">
                Pekerjaan: {userData.biodata[0].pekerjaan}
              </p>
              <p className="text-sm text-black/90 dark:text-white/90">
                Tanggal Lahir: {userData.biodata[0].tanggal_lahir}
              </p>
              <p className="text-sm text-black/90 dark:text-white/90">
                Provinsi: {userData.biodata[0].provinsi}
              </p>
              <p className="text-sm text-black/90 dark:text-white/90">
                Kota: {userData.biodata[0].kota}
              </p>
            </div>
          )}

          <Accordion variant="splitted" className="w-full max-w-xs mt-4">
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
            onClick={handleLogout} // Add onClick handler
          >
            Log Out
          </Button>
        </section>
      </section>
    </DefaultLayout>
  );
}