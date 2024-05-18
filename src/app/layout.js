"use client";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { metadata } from "@/app/metadata"; // Adjust the path as necessary

import LoaderAnimation from "@/components/loader/loader";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import useLoading from "@/components/loader/useLoading"; 
import Navigation from "@/components/navigation/navigation";

const Nunito_Sans_init = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "700", "800"],
});

export default function RootLayout({ children }) {
  const isLoading = useLoading();

  return (
    <html lang="en" className={Nunito_Sans_init.className}>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href={metadata.icons.icon} />
      </head>
      <body
        className={`text-[#242423] bg-[#E9E9E9] selection:bg-[#242423] selection:text-white `}
      >
        {isLoading ? (
          <LoaderAnimation />
        ) : (
          <>
            <Header />
            <Navigation />
            <div className="px-36 py-4 mx-auto max-w-screen-xl container">
              {children}
            </div>
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}
