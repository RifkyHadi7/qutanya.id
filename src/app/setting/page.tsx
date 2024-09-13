"use client";

import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import { Button, Input, Card, CardBody } from "@nextui-org/react";
import DefaultLayout from "@/layouts/default1";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { EyeFilledIcon } from "@/components/icons";
import { EyeSlashFilledIcon } from "@/components/icons";
import { HeaderAvatar } from "@/layouts/headerAvatar";
import { useRouter } from "next/navigation"; // Import useRouter
import { MenuButton } from "@/layouts/menu";
import Image from "next/image"; // Import Image component

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [isVisible, setIsVisible] = React.useState(false);
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter(); // Initialize useRouter
  const [profileImage, setProfileImage] = useState("");
  
    useEffect(() => {
      // Fungsi untuk mengambil data pengguna dari sessionStorage
      const fetchUserData = () => {
        const userData = sessionStorage.getItem("userData");
        console.log("User data from sessionStorage:", userData); // Log ini untuk melihat apakah datanya tersedia
        if (userData) {
          const parsedData = JSON.parse(userData);
          console.log("Parsed user data:", parsedData); // Log data yang diambil dari sessionStorage
          setName(parsedData.data.nama);
          setProfileImage(parsedData.data.foto_profil);
        } else {
          console.error("User data not found in sessionStorage");
        }
      };
  
      fetchUserData();
    }, []);

  useEffect(() => {
    const userData: any = sessionStorage.getItem("userData");
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

  const updateBiodata = async () => {
    try {
      const response = await axios.post(
        "https://qutanya-be.vercel.app/user/update",
        {
          nama: name,
          pekerjaan: job,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      if (data.status === "success") {
        // Update berhasil, lakukan sesuatu seperti menampilkan notifikasi
        console.log("Biodata updated successfully:", data);
        // Perbarui userData di sessionStorage
        const updatedUserData = {
          ...userData,
          nama: name,
          biodata: [{ ...userData.biodata[0], pekerjaan: job }],
        };
        sessionStorage.setItem(
          "userData",
          JSON.stringify({ data: updatedUserData })
        );
        setUserData(updatedUserData);
      } else {
        // Tangani kesalahan
        console.error("Failed to update biodata:", data);
      }
    } catch (error) {
      console.error("Error updating biodata:", error);
    }
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col h-screen bg-background2 items-center justify-between mx-auto relative z-10">
        <HeaderAvatar />
        <MenuButton currentPath={"/setting"}></MenuButton>
      </section>

      <section className="flex flex-col items-center justify-center w-screen mx-auto gap-2 absolute top-24 z-20">
      <Card className="bg-primary shadow-lg rounded-lg p-6 mt-2 w-full max-w-md mx-auto">
          <CardBody>
            {userData && (
              <div className="flex items-center w-full mb-4">
                <Image
                  src={
                    profileImage ||
                    "https://oadqfnknwbaahnminxvl.supabase.co/storage/v1/object/public/foto_profile/default.png"
                  } // URL gambar default
                  width={40}
                  height={50}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-secondary">
                    {userData.nama}
                  </h3>
                </div>
              </div>
            )}

            <Accordion variant="splitted" className=" p-2">
              <AccordionItem
                key="1"
                aria-label="Accordion 1"
                title="Update Biodata"
              >
                <div className="flex flex-col gap-2">
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
                    onClick={updateBiodata}
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
                <div className="flex flex-col gap-2">
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
                "max-w-md",
                "bg-default-200/50",
                "dark:bg-default/60",
                "text-black/90 dark:text-white/90",
                "shadow-xl",
                "bg-background",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                "dark:hover:bg-default/70",
                "mt-4",
              ].join(" ")}
              onClick={handleLogout} // Add onClick handler
            >
              Log Out
            </Button>
          </CardBody>
        </Card>
      </section>
    </DefaultLayout>
  );
}
