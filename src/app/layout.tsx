import type { Metadata } from "next";
import "../../styles/globals.css";

export const metadata: Metadata = {
  title: "Byte Bank",
  description: "Seu banco digital",
  keywords: "banco, digital, byte bank",
  creator: "Letícia Rosa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full w-full">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <main className="w-full">{children}</main>
      </body>
    </html>
  );
}
