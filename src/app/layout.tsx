import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "../components/Providers";
import "../styles/scaffolding.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Магазин",
  description: "Каталог товаров и корзина",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
