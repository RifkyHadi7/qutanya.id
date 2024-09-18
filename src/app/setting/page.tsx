"use client";

import React, { useState, useEffect } from "react";
import { Button, Input, Card, CardBody } from "@nextui-org/react";
import DefaultLayout from "@/layouts/default1";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { EyeFilledIcon } from "@/components/icons";
import { EyeSlashFilledIcon } from "@/components/icons";
import { HeaderAvatar } from "@/layouts/headerAvatar";
import { useRouter } from "next/navigation";
import { MenuButton } from "@/layouts/menu";
import Image from "next/image";

// Define types for user data
interface UserData {
  id_user: string;
  nama: string;
  foto_profil: string;
}

export default function SettingsPage() {
  const [name, setName] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  useEffect(() => {
    // Fetch user data from sessionStorage
    const fetchUserData = () => {
      const userData = sessionStorage.getItem("userData");
      if (userData) {
        const parsedData = JSON.parse(userData);
        setUserData(parsedData.data);
        setUserName(parsedData.data.nama);
        setProfileImage(parsedData.data.foto_profil);
      }
    };
    fetchUserData();
  }, []);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogout = () => {
    sessionStorage.clear();
    document.cookie = "session=; path=/; max-age=0";
    router.push("/loginpage");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) { // 5 MB
        alert("File size must be less than 5 MB");
        return;
      }
      setSelectedFile(file);
    }
  };

  const updateBiodata = async () => {
    try {
      const userDataString = sessionStorage.getItem("userData");
      if (!userDataString) {
        throw new Error("User data not found in sessionStorage");
      }

      const userData = JSON.parse(userDataString);
      const id_user = userData?.data?.biodata?.id_user;

      if (!id_user) {
        throw new Error("User ID not found in userData");
      }

      const formData = new FormData();
      formData.append("id_user", id_user);
      formData.append("nama", name);
      if (selectedFile) {
        formData.append("foto_profil", selectedFile);
      }

      const response = await fetch("https://qutanya-be.vercel.app/user/update", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.status === "success") {
        setUserName(userName)
        userData.data.nama = result.data[0].nama;
        userData.data.foto_profil = result.data[0].foto_profil;

        sessionStorage.setItem("userData", JSON.stringify(userData));
        
        alert("Profile updated successfully.");
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const updatePassword = async () => {
    try {
      const userDataString = sessionStorage.getItem("userData");
      if (!userDataString) {
        throw new Error("User data not found in sessionStorage");
      }
  
      const userData = JSON.parse(userDataString);
      const id_user = userData?.data?.biodata?.id_user;
  
      if (!id_user) {
        throw new Error("User ID not found in userData");
      }
  
      const payload = {
        id_user,
        oldPassword,
        newPassword,
      };
  
      console.log("Password payload to be sent:", payload); // Log data yang akan dikirim
  
      const response = await fetch("https://qutanya-be.vercel.app/user/newpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"id_user": payload.id_user, "oldpassword": payload.oldPassword, "newpassword": payload.newPassword}),
      });
  
      const responseText = await response.text(); // Get response as text
      console.log("Response text:", responseText); // Log the raw response text
  
      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }
  
      let result;
      try {
        result = JSON.parse(responseText); // Try to parse JSON
      } catch (parseError) {
        console.error("Failed to parse JSON response:", parseError);
        throw new Error("Failed to parse JSON response");
      }
  
      if (result.status === "success") {
        // Update berhasil, lakukan sesuatu seperti menampilkan notifikasi
        console.log("Password updated successfully:", result);
        alert("Password updated successfully.");
      } else {
        // Tangani kesalahan
        console.error("Failed to update password:", result);
        alert("Failed to update password: " + result.message);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col h-screen bg-background2 items-center justify-between mx-auto relative z-10">
        <HeaderAvatar />
        <MenuButton />
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
                  }
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
              <AccordionItem key="1" aria-label="Accordion 1" title="Update Biodata">
                <div className="flex flex-col gap-2">
                  <Input
                    label="Nama"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-2"
                  />
                  <Button onClick={updateBiodata}>
                    Save
                  </Button>
                </div>
              </AccordionItem>
              <AccordionItem key="2" aria-label="Accordion 2" title="Ganti Password">
                <div className="flex flex-col gap-2">
                  <Input
                    isRequired
                    label="Old Password"
                    placeholder="Enter your old password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    endContent={
                      <button type="button" onClick={toggleVisibility}>
                        {isVisible ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                  />
                  <Input
                    isRequired
                    label="New Password"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    endContent={
                      <button type="button" onClick={toggleVisibility}>
                        {isVisible ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                  />
                  <Button onClick={updatePassword}>
                    Ganti
                  </Button>
                </div>
              </AccordionItem>
            </Accordion>

            <Button onClick={handleLogout}>
              Log Out
            </Button>
          </CardBody>
        </Card>
      </section>
    </DefaultLayout>
  );
}