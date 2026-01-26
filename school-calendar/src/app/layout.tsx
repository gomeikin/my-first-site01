import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "./ThemeRegistry";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Academic Tracker | 学校行事カレンダー",
  description: "学校のスケジュールを管理・表示するプレミアムなアプリ",
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
