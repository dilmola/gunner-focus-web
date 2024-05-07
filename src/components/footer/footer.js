"use client";
import LogoKatkode from "../../../public/logos/logo_katkode.png";

const Footer = () => {
  return (
    <div className="flex justify-center items-center mt-10 w-ful">
      <div className="flex items-center">
        <img src={LogoKatkode.src} alt="Logo" className="h-8 mr-2" />
      </div>
    </div>
  );
};

export default Footer;
