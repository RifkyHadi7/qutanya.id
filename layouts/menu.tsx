"use client";
import HomeIconFilled from "../assets/home-filled.svg";
import HomeIcon from "../assets/home.svg";
import BalanceIcon from "../assets/saldo.svg";
import BalanceIconFilled from "../assets/saldo-filled.svg";
import SurveyIcon from "../assets/survei.svg";
import SurveyIconFilled from "../assets/survei-filled.svg";
import ProfileIcon from "../assets/profil.svg";
import ProfileIconFilled from "../assets/profil-filled.svg";
import Image from "next/image";
import { Link, useLocation } from 'react-router-dom';


export const MenuButton = () => {
  const location = useLocation(); // Get the current location

  return (
    <div className="flex p-4 bg-primary bottom-0 shadow-xl backdrop-blur-xl backdrop-saturate-200" style={{ gap: "4rem" }}>
      <Link to="/beranda">
        <Image
          src={location.pathname === '/beranda' ? HomeIconFilled : HomeIcon}
          alt="Home Icon"
          width={40}
        />
      </Link>
      <Link to="/balance">
        <Image
          src={location.pathname === '/balance' ? BalanceIconFilled : BalanceIcon}
          alt="Balance Icon"
          width={40}
        />
      </Link>
      <Link to="/riwayatsurvey">
        <Image
          src={location.pathname === '/riwayatsurvey' ? SurveyIconFilled : SurveyIcon}
          alt="Survey Icon"
          width={40}
        />
      </Link>
      <Link to="/setting">
        <Image
          src={location.pathname === '/setting' ? ProfileIconFilled : ProfileIcon}
          alt="Profile Icon"
          width={40}
        />
      </Link>
    </div>
  );
};