import HomeIconFilled from "../assets/Ellipse 8.svg";
import HomeIcon from "../assets/home.svg";
import BalanceIcon from "../assets/saldo.svg";
import BalanceIconFilled from "../assets/saldo-filled.svg";
import SurveyIcon from "../assets/survei.svg";
import SurveyIconFilled from "../assets/survei-filled.svg";
import ProfileIcon from "../assets/profil.svg";
import ProfileIconFilled from "../assets/profil-filled.svg";
import Image from "next/image";
import Link from "next/link";

export const MenuButton = () => {
  return (
    <div className="flex gap-16 mb-5 bg-primary p-4">
      <Link href="/loginpage">
        {/* <Image  src={location.pathname === '/loginpage' ? HomeIconFilled : HomeIcon}  alt="Home Icon" width={40} /> */}
        <Image src={HomeIconFilled} alt="Home Icon" width={40} />
      </Link>
      <Link href="/loginpage">
        <Image src={BalanceIcon} alt="Balance Icon" width={40} />
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
