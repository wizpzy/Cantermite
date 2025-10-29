import { Kanit } from "next/font/google";
import Header from "@/components/header/header";
import "./globals.css";

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin", "thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  fallback: ["sans-serif"],
});

export const metadata = {
  title: "Cantermite library",
  description: "A library management system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${kanit.variable}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
