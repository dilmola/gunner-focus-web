"use client";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

import LoaderAnimation from "@/components/loader/loader";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import useLoading from "@/components/loader/useLoading"; // Adjust the import path based on your project structure
import { metadata } from "@/app/metadata"; // Adjust the path as necessary

const Nunito_Sans_init = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "700", "800"],
});

export default function RootLayout({ children }) {
  const isLoading = useLoading();

  return (
    <html lang="en">
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
