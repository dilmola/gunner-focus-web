"use client";
import LogoKatkodeBlack from "../../../public/logos/logo_adidas_black.png";
import LogoAdidasBlack from "../../../public/logos/logo_katkode_black.png";
import LogoPNBlack from "../../../public/logos/logo_pn_black.png";

const Footer = () => {
  return (
    <div className="border-t-2 border-slate-950/20 mt-6">
      <div className="py-6 px-36 mx-auto max-w-screen-xl container">
        <div className="flex justify-center items-center w-ful">
          <span className="px-12 font-semibold">Sponsored by:</span>
          <div className="flex items-center">
            <img src={LogoKatkodeBlack.src} alt="Logo" className="h-8 px-4" />
            <img src={LogoAdidasBlack.src} alt="Logo" className="h-8 px-4" />
            <img src={LogoPNBlack.src} alt="Logo" className="h-8 px-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
