import React from 'react';

export const NavbarTop = () => {
  return (
    <div className="flex flex-row gap-4 -mt-6 absolute top-32">
      <div className="flex flex-col items-center">
        <button
          className="w-16 h-16 flex items-center justify-center bg-white shadow-xl rounded-full transition transform duration-300 active:scale-95"
        >
          {/* Tempat untuk logo */}
        </button>
        <span className="text-xs mt-2 text-secondary">List Survey</span>
      </div>
      <div className="flex flex-col items-center">
        <button
          className="w-16 h-16 flex items-center justify-center bg-white shadow-xl rounded-full transition transform duration-300 active:scale-95"
        >
          {/* Tempat untuk logo */}
        </button>
        <span className="text-xs mt-2 text-secondary">Buat Survey</span>
      </div>
      <div className="flex flex-col items-center">
        <button
          className="w-16 h-16 flex items-center justify-center bg-white shadow-xl rounded-full transition transform duration-300 active:scale-95"
        >
          {/* Tempat untuk logo */}
        </button>
        <span className="text-xs mt-2 text-secondary">List Artikel</span>
      </div>
      <div className="flex flex-col items-center">
        <button
          className="w-16 h-16 flex items-center justify-center bg-white shadow-xl rounded-full transition transform duration-300 active:scale-95"
        >
          {/* Tempat untuk logo */}
        </button>
        <span className="text-xs mt-2 text-secondary">Notifikasi</span>
      </div>
    </div>
  );
};