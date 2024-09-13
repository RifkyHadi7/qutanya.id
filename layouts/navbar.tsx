import React from 'react';
import Link from 'next/link';
import {Badge, Avatar} from "@nextui-org/react";
import Image from 'next/image';
import BuatSurvei from '../assets/buat_survei.svg'
import IsiSurvei from '../assets/isi_survey.svg'
import MenuHome from '../assets/menus_home.svg'
import ArtikelQu from '../assets/artikel_qu.svg'

export const NavbarTop = () => {
  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col items-center">
        <Link href="/listsurvey">
          <button
            className="w-16 h-16 flex items-center justify-center bg-white shadow-xl rounded-full transition transform duration-300 active:scale-95 active:bg-gray-200"
          >
            {/* Tempat untuk logo */}
            <Image alt='isi-survey' src={IsiSurvei} width={60} height={30}></Image>
          </button>
        </Link>
        <span className="text-sm mt-2 text-secondary">List Survey</span>
      </div>
      <div className="flex flex-col items-center">
        <Link href="/buatsurvey">
          <button
            className="w-16 h-16 flex items-center justify-center bg-white shadow-xl rounded-full transition transform duration-300 active:scale-95 active:bg-gray-200"
          >
            {/* Tempat untuk logo */}
            <Image alt='isi-survey' src={BuatSurvei} width={60} height={30}></Image>
          </button>
        </Link>
        <span className="text-sm mt-2 text-secondary">Buat Survey</span>
      </div>
      <div className="flex flex-col items-center">
        <Link href="/listArtikel">
          <button
            className="w-16 h-16 flex items-center justify-center bg-white shadow-xl rounded-full transition transform duration-300 active:scale-95 active:bg-gray-200"
          >
            {/* Tempat untuk logo */}
            <Image alt='isi-survey' src={ArtikelQu} width={60} height={30}></Image>
          </button>
        </Link>
        <span className="text-sm mt-2 text-secondary">List Artikel</span>
      </div>
      <div className="flex flex-col items-center">
      <Badge content="5" color="secondary">
        <Link href="/notifikasi">
          <button
            className="w-16 h-16 flex items-center justify-center bg-white shadow-xl rounded-full transition transform duration-300 active:scale-95 active:bg-gray-200"
          >
            {/* Tempat untuk logo */}
            <Image alt='isi-survey' src={MenuHome} width={60} height={30}></Image>
          </button>
        </Link>
        </Badge>
        <span className="text-sm mt-2 text-secondary">Notifikasi</span>
      </div>
    </div>
  );
};