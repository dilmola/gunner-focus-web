"use client";
import LogoBeta from "../../../public/logos/logo_beta.png";

import Github from "../../../public/icons/github_icon.png";
import Light from "../../../public/icons/light_icon.png";
import BMAC from "../../../public/icons/bmac.png";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <div className="border-b-2 border-slate-950/20">
      <div className="py-4 px-36 mx-auto max-w-screen-xl container">
        <div className="flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={handleClick}>
            <img src={LogoBeta.src} alt="Logo" className="h-6 mr-2" />
          </div>
          <div className="flex justify-between">
            <a
              className="mr-4"
              href="https://buymeacoffee.com/aidilmaula"
              target="_blank"
            >
              <img src={BMAC.src} alt="BMAC" className="h-11" />
            </a>
            <a
              className="bg-[#E63946] hover:bg-[#ee6055] text-white font-bold py-2 px-4 rounded mr-4 flex items-center"
              href="https://github.com/dilmola/arsenal-website"
              target="_blank"
            >
              <img src={Github.src} alt="Github" className="h-5" />
            </a>
            <a className="bg-[#17263b] hover:bg-[#213551] text-white font-bold py-2 px-4 rounded flex items-center cursor-pointer">
              <img src={Light.src} alt="Github" className="h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
