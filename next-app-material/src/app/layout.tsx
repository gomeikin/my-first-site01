import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "./ThemeRegistry";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Modern Material App",
  description: "Next.js app with Material Design and Dark Mode",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={outfit.className}>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
