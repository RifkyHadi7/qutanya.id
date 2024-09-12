import React from 'react';
import Link from 'next/link';
import {Badge, Avatar} from "@nextui-org/react";

export const NavbarTop = () => {
  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col items-center">
        <Link href="/listsurvey">
          <button
            className="w-16 h-16 flex items-center justify-center bg-white shadow-xl rounded-full transition transform duration-300 active:scale-95 active:bg-gray-200"
          >
            {/* Tempat untuk logo */}
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
          </button>
        </Link>
        </Badge>
        <span className="text-sm mt-2 text-secondary">Notifikasi</span>
      </div>
    </div>
  );
};