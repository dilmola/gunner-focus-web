import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";

import Footer from "@/components/footer/footer";

const Nunito_Sans_init = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "700", "800"],
});

export const metadata = {
  title: "Gunner Focus",
  description:
    "Gunner Focus is the premier online center for gunners fans around the globe. Whether you live and breathe the Gunners or are just getting started with your Arsenal journey, our website is your one-stop hub for everything Arsenal.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${Nunito_Sans_init.className}text-[#242423] bg-[#E9E9E9] selection:bg-[#242423] selection:text-white `}
      >
        <Header />
        <div className="px-36 py-4 mx-auto max-w-screen-xl container">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
