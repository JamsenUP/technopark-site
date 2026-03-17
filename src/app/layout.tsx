import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import { DatoContentLink } from "@/components/dato-content-link";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: 'ООО "ТЕХНОПАРК" — Профессиональный вывоз мусора в Вашем городе',
  description:
    'ООО "ТЕХНОПАРК" — оперативный вывоз и утилизация строительного, бытового и крупногабаритного мусора. Работаем с отходами I–IV классов, с физическими и юридическими лицами.',
};



export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const isDraft = cookieStore.get("datocms-draft")?.value === "true";

  return (
    <html lang="ru">
      <body
        className={`${inter.variable} bg-background text-foreground antialiased`}
      >
        {isDraft && <DatoContentLink />}
        {children}
      </body>
    </html>
  );
}

