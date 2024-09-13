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
import  Link from 'next/link';
interface MenuButtonProps {
  currentPath: string;
}

export const MenuButton:React.FC<MenuButtonProps>  = ({currentPath}) => {

  return (
    <div className="flex p-4 bg-primary bottom-0 shadow-xl backdrop-blur-xl backdrop-saturate-200" style={{ gap: "4rem" }}>
      <Link href="/beranda">
        <Image
          src={currentPath === '/beranda' ? HomeIconFilled : HomeIcon}
          alt="Home Icon"
          width={40}
        />
      </Link>
      <Link href="/balance">
        <Image
          src={currentPath === '/balance' ? BalanceIconFilled : BalanceIcon}
          alt="Balance Icon"
          width={40}
        />
      </Link>
      <Link href="/riwayatsurvey">
        <Image
          src={currentPath === '/riwayatsurvey' ? SurveyIconFilled : SurveyIcon}
          alt="Survey Icon"
          width={40}
        />
      </Link>
      <Link href="/setting">
        <Image
          src={currentPath === '/setting' ? ProfileIconFilled : ProfileIcon}
          alt="Profile Icon"
          width={40}
        />
      </Link>
    </div>
  );
};