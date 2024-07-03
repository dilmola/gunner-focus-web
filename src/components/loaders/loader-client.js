"use client";

import LoaderAnimation from "@/components/loaders/loader-animation";
import useLoading from "@/components/loaders/useLoading";
import Header from "@/components/header/header";
import NavigationTop from "@/components/navigations/navigation-top";
import Footer from "@/components/footer/footer";

export default function LoaderClient({ children }) {
  const isLoading = useLoading();

  return (
    <>
      {isLoading ? (
        <LoaderAnimation />
      ) : (
        <>
          <Header />
          <NavigationTop />
          <div className="px-4 sm:px-20 py-4 mx-auto max-w-screen-xl container">
            {children}
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
