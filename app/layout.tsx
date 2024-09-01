import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "karakteryuzu.com - Kopyala ve yapıştır",
  description:
    "Herhangi bir sunucuda kullandığınız karakter yüzlerini diğer bir sunucuya çevirmenizi sağlar.",
  icons: [
    {
      rel: "icon",
      href: "/favicon.ico",
      url: "/favicon.ico",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
