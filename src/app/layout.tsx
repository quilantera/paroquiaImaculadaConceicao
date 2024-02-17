import type { Metadata } from "next";
import { Inter, Signika } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets:["latin"],
  weight: ["300","400","500","600",'700'],
  style: "normal",
  variable: "--font-inter",
});
const signika = Signika({ 
    subsets:["latin"],
    weight: ["300","400","500","600",'700'],
    style: "normal",
    variable: "--font-signika",
})
export const metadata: Metadata = {
  title: "Paróquia Imaculada Conceição -Jd Dracena",
  description: "Encontre horários de missas, Eventos e Pastorais .",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${signika.variable} ${inter.variable} font-sans`}>{children}</body>
    </html>
  );
}
