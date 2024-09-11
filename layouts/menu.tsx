import HomeIconFilled from "../assets/home-filled.svg";
import HomeIcon from "../assets/home.svg";
import BalanceIcon from "../assets/saldo.svg";
import BalanceIconFilled from "../assets/saldo-filled.svg";
import SurveyIcon from "../assets/survei.svg";
import SurveyIconFilled from "../assets/survei-filled.svg";
import ProfileIcon from "../assets/profil.svg";
import ProfileIconFilled from "../assets/profil-filled.svg";
import Image from "next/image";
import Link from "next/link";
import { Router, useLocation } from "react-router-dom";

export const MenuButton = () => {
  const location = useLocation();
  console.log(location.pathname)
  return (
    
      <div className="flex  p-4 bg-primary bottom-0 shadow-xl  backdrop-blur-xl backdrop-saturate-200" style={{gap:"4rem",}}>
      
        <Link href="/beranda">
          <Image   src={location.pathname === '/beranda' ? HomeIconFilled : HomeIcon}  alt="Home Icon" width={40} />
          {/* <Image src={HomeIconFilled} alt="Home Icon" width={40} /> */}
        </Link>
        <Link href="/mainpage">
          <Image src={location.pathname === '/mainpage' ? BalanceIconFilled : BalanceIcon} alt="Balance Icon" width={40} />
        </Link>
        <Link href="/loginpage">
          <Image src={SurveyIcon} alt="Survey Icon" width={40} />
        </Link>
        <Link href="/loginpage">
          <Image src={ProfileIcon} alt="Profile Icon" width={40} />
        </Link>
      
    </div>
  );  
};
