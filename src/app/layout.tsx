import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Nguyễn Minh Quân",
    default: "Nguyễn Minh Quân — Senior Frontend Engineer & Tech Blog",
  },
  description:
    "Không gian số cá nhân của Nguyễn Minh Quân: Showcase dự án kỹ thuật và bài viết chuyên sâu về công nghệ web, kiến trúc frontend và lối sống tĩnh lặng.",
  keywords: [
    "Frontend Engineer",
    "Next.js",
    "React",
    "Web Vitals",
    "Nguyen Minh Quan",
    "Blog cong nghe",
    "Tinh lang so",
  ],
  authors: [{ name: "Nguyễn Minh Quân" }],
  creator: "Nguyễn Minh Quân",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://minhquan.dev",
    siteName: "Minh Quân.dev",
    title: "Nguyễn Minh Quân — Senior Frontend Engineer & Tech Blog",
    description:
      "Showcase dự án kỹ thuật và bài viết chuyên sâu về công nghệ web, kiến trúc frontend và lối sống tĩnh lặng.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nguyễn Minh Quân — Senior Frontend Engineer & Tech Blog",
    description:
      "Showcase dự án kỹ thuật và bài viết chuyên sâu về công nghệ web, kiến trúc frontend và lối sống tĩnh lặng.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${plusJakarta.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-surface font-sans text-on-surface antialiased">
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
