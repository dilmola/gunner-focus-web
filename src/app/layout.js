import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import LoaderClient from "@/components/loaders/loader-client";
import { CombinedDataProvider } from "../context/mainContext";

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
    <CombinedDataProvider>
      <html lang="en" className={Nunito_Sans_init.className}>
        <body className="text-mirageColor bg-romanceColor selection:bg-mirageColor selection:text-romanceColor dark:bg-mirageColor dark:text-romanceColor dark:selection:bg-romanceColor dark:selection:text-mirageColor">
          <LoaderClient>{children}</LoaderClient>
        </body>
      </html>
    </CombinedDataProvider>
  );
}
