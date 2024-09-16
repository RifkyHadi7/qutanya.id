"use client"

import Image from "next/image";
import { useEffect, useState } from "react";

export const HeaderAvatar = () => {
  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    // Fungsi untuk mengambil data pengguna dari sessionStorage
    const fetchUserData = () => {
      const userData = sessionStorage.getItem("userData");
      console.log("User data from sessionStorage:", userData); // Log ini untuk melihat apakah datanya tersedia
      if (userData) {
        const parsedData = JSON.parse(userData);
        console.log("Parsed user data:", parsedData); // Log data yang diambil dari sessionStorage
        setUserName(parsedData.data.nama);
        setProfileImage(parsedData.data.foto_profil);
      } else {
        console.error("User data not found in sessionStorage");
      }
    };

    fetchUserData();
  }, []);

  return (
    <header className=" bg-background shadow-lg rounded-b-extra p-4 pb-12 flex items-center justify-between w-full z-20">
      {userName || profileImage ? (
        <div className="flex items-center">
          <Image
            src={profileImage || "https://oadqfnknwbaahnminxvl.supabase.co/storage/v1/object/public/foto_profile/default.png"} // URL gambar default
            width={40}
            height={50}
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <div className="ml-4">
            <span className="text-lg font-semibold text-secondary">Hi,</span>
            <span className="text-lg font-semibold text-secondary">
              {" "}
              {userName || "User"}
            </span>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </header>
  );
};