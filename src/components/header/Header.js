"use client";
import Logo from "../../../public/logos/logo.png";
import Github from "../../../public/icons/github-icon.png";
import Light from "../../../public/icons/light-icon.png";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <img src={Logo.src} alt="Logo" className="h-10 mr-2" />
      </div>
      <div className="flex justify-between">
        <a
          className="bg-[#E63946] hover:bg-[#ee6055] text-white font-bold py-2 px-4 rounded mr-4"
          href="https://github.com/dilmola/arsenal-website"
          target="_blank"
        >
          <img src={Github.src} alt="Github" className="h-6" />
        </a>
        <a className="bg-[#17263b] hover:bg-[#213551] text-white font-bold py-2 px-4 rounded">
          <img src={Light.src} alt="Github" className="h-5" />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
