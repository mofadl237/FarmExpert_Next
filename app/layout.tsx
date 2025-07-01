import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/Providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Farm Expert",
  description:
    "A smart livestock and farm management system to help you register, track, and sell animals easily with a secure, cloud-based dashboard.",
  keywords: [
    "Farm Management System",
    "Livestock Management",
    "Animal Tracking",
    "Cattle Sales",
    "Smart Farm Software",
    "Agricultural Technology",
    "Farm ERP",
    "Livestock Records",
    "Farm Expert",
  ],
  icons: {
    icon: "/logo.png", // Make sure this icon exists in the public folder
  },
  // openGraph: {
  //   title: "Farm Expert – Smart Livestock & Farm Management",
  //   description:
  //     "Manage your entire farm operation from one place. Add, track, and sell animals through a simple and secure platform.",
  //   url: "https://yourfarmdomain.com", // Replace with your actual domain
  //   siteName: "Farm Expert",
  //   images: [
  //     {
  //       url: "/logo-og.png", // Recommended size: 1200x630 px, must be in public folder
  //       width: 1200,
  //       height: 630,
  //       alt: "Farm Expert Open Graph Image",
  //     },
  //   ],
  //   locale: "en_US",
  //   type: "website",
  // },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"  className="dark" style={{ colorScheme: "dark" }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute={"class"}
          defaultTheme={"dark"}
          enableSystem={true}
        >
          <main className="container mx-auto px-5">
           
          {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
