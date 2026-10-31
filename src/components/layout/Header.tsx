"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Trang chủ", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Dự án", href: "/projects" },
  { label: "Giới thiệu", href: "/about" },
  { label: "Liên hệ", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/85 backdrop-blur-xl border-b border-outline-variant/30 transition-all">
      <div className="h-16 max-w-[1140px] mx-auto px-margin-mobile lg:px-margin flex items-center justify-between gap-space-md">
        {/* Brand Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-space-sm group focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center text-white font-bold text-sm shadow-sm">
            Q
          </div>
          <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight group-hover:text-primary transition-colors">
            Minh Quân
            <span className="text-primary font-code-inline text-code-inline">
              .dev
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-surface-container-low/70 px-2 py-1.5 rounded-full border border-outline-variant/20">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all",
                  active
                    ? "bg-surface-container-lowest text-on-surface shadow-[0_1px_3px_0_rgba(15,23,42,0.06)] font-semibold"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action & Status */}
        <div className="flex items-center gap-space-sm sm:gap-space-md">
          {/* Availability Status Chip */}
          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-lowest border border-outline-variant/30 shadow-[0_1px_3px_0_rgba(15,23,42,0.03)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            <span className="font-label-sm text-label-sm text-on-surface font-medium">
              Available
            </span>
          </div>

          {/* Quick Avatar Link to About */}
          <Link
            href="/about"
            className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/40 shadow-sm relative focus:ring-2 focus:ring-primary focus:outline-none"
            title="Nguyễn Minh Quân"
          >
            <Image
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
              alt="Avatar tác giả"
              fill
              className="object-cover"
              sizes="32px"
            />
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-on-surface hover:bg-surface-container transition-colors focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-outline-variant/20 bg-surface/95 backdrop-blur-xl px-margin-mobile py-4 flex flex-col gap-2">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "px-4 py-2.5 rounded-lg font-label-md text-label-md flex items-center justify-between transition-colors",
                  active
                    ? "bg-primary-container text-on-primary font-semibold"
                    : "text-on-surface hover:bg-surface-container"
                )}
              >
                <span>{item.label}</span>
                <ArrowUpRight size={16} />
              </Link>
            );
          })}
          <div className="pt-2 mt-2 border-t border-outline-variant/20 flex items-center justify-between text-body-sm text-on-surface-variant">
            <span>Trạng thái:</span>
            <span className="text-secondary font-medium">Sẵn sàng nhận dự án mới</span>
          </div>
        </div>
      )}
    </header>
  );
}
