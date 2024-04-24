import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";

import Match from "@/components/match/match";
import Ranked from "@/components/table/ranked/rankedTable";
import Team from "@/components/table/team/teamTable";

const Nunito_Sans_init = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "700", "800"],
});

export const metadata = {
  title: "Gunner Focus",
  description: "Gunner Focus",
  icons: {
    icon: "/ico.ico",
  },
};

export default function RootLayout() {
  return (
    <html lang="en">
      <body
        className={`${Nunito_Sans_init.className} py-4 pl-40 pr-40 mx-auto max-w-screen-xl container text-[#242423] bg-[#E9E9E9] selection:bg-[#242423] selection:text-white `}
      >
        <Header />
        <Match />
        <Ranked />
        <Team />
      </body>
    </html>
  );
}
