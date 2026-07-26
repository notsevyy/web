import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CampusProvider } from "@/context/CampusContext";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "AWSSBG TIP Club",
  description: "Amazon Web Services Student Builder Group - TIP Chapter",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body>
        <CampusProvider>{children}</CampusProvider>
      </body>
    </html>
  );
}
