// src/components/ClientLoader.js
"use client";

import LoaderAnimation from "@/components/loader/loader";
import useLoading from "@/components/loader/useLoading";
import Header from "@/components/header/header";
import Navigation from "@/components/navigation/navigation";
import Footer from "@/components/footer/footer";

export default function ClientLoader({ children }) {
  const isLoading = useLoading();

  return (
    <>
      {isLoading ? (
        <LoaderAnimation />
      ) : (
        <>
          <Header />
          <Navigation />
          <div className="px-20 py-4 mx-auto max-w-screen-xl container">
            {children}
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
