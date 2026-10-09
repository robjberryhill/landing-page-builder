import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-sans",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: "Authentic Coffee | Roasted on Tuesdays, shipped the same day",
  description:
    "Small-batch coffee from six farms we can name, roasted the week it ships. Single bags or a subscription you can cancel without a phone call.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bricolage.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
