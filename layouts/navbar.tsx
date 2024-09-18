import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Badge, Avatar } from "@nextui-org/react";
import Image from 'next/image';
import axios from 'axios';
import BuatSurvei from '../assets/buat_survei.svg';
import IsiSurvei from '../assets/isi_survey.svg';
import MenuHome from '../assets/menus_home.svg';
import ArtikelQu from '../assets/artikel_qu.svg';

export const NavbarTop = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Check if notifications are in sessionStorage
    const storedNotifications = sessionStorage.getItem('notifications');

    if (storedNotifications) {
      // Use notifications from sessionStorage if available
      setNotifications(JSON.parse(storedNotifications));
    } else {
      // Fetch notifications from the API if not available in sessionStorage
      axios.get('http://localhost:3000/user/notif')
        .then(response => {
          if (response.data.status === 'success') {
            const fetchedNotifications = response.data.data;
            setNotifications(fetchedNotifications);

            // Store notifications in sessionStorage
            sessionStorage.setItem('notifications', JSON.stringify(fetchedNotifications));
          }
        })
        .catch(error => {
          console.error('Error fetching notifications:', error);
        });
    }
  }, []);

  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col items-center">
        <Link href="/listsurvey">
          <button
            className="w-16 h-16 flex items-center justify-center bg-white shadow-xl rounded-full transition transform duration-300 active:scale-95 active:bg-gray-200"
          >
            <Image alt='isi-survey' src={IsiSurvei} width={60} height={30} />
          </button>
        </Link>
        <span className="text-sm mt-2 text-secondary">List Survey</span>
      </div>
      <div className="flex flex-col items-center">
        <Link href="/buatsurvey">
          <button
            className="w-16 h-16 flex items-center justify-center bg-white shadow-xl rounded-full transition transform duration-300 active:scale-95 active:bg-gray-200"
          >
            <Image alt='buat-survey' src={BuatSurvei} width={60} height={30} />
          </button>
        </Link>
        <span className="text-sm mt-2 text-secondary">Buat Survey</span>
      </div>
      <div className="flex flex-col items-center">
        <Link href="/listArtikel">
          <button
            className="w-16 h-16 flex items-center justify-center bg-white shadow-xl rounded-full transition transform duration-300 active:scale-95 active:bg-gray-200"
          >
            <Image alt='artikel-qu' src={ArtikelQu} width={60} height={30} />
          </button>
        </Link>
        <span className="text-sm mt-2 text-secondary">List Artikel</span>
      </div>
      <div className="flex flex-col items-center">
        {/* Conditionally render Badge if notifications exist */}
        {notifications.length > 0 ? (
          <Badge content={notifications.length} color="secondary">
            <Link href="/notifikasi">
              <button
                className="w-16 h-16 flex items-center justify-center bg-white shadow-xl rounded-full transition transform duration-300 active:scale-95 active:bg-gray-200"
              >
                <Image alt='menu-home' src={MenuHome} width={60} height={30} />
              </button>
            </Link>
          </Badge>
        ) : (
          <Link href="/notifikasi">
            <button
              className="w-16 h-16 flex items-center justify-center bg-white shadow-xl rounded-full transition transform duration-300 active:scale-95 active:bg-gray-200"
            >
              <Image alt='menu-home' src={MenuHome} width={60} height={30} />
            </button>
          </Link>
        )}
        <span className="text-sm mt-2 text-secondary">Notifikasi</span>
      </div>
    </div>
  );
};
