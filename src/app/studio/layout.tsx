"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  FolderGit2,
  Inbox,
  Settings,
  LayoutDashboard,
  ExternalLink,
  LogOut,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STUDIO_NAV = [
  { label: "Tổng quan", href: "/studio", icon: LayoutDashboard },
  { label: "Bài viết (Posts)", href: "/studio/posts", icon: FileText },
  { label: "Dự án (Projects)", href: "/studio/projects", icon: FolderGit2 },
  { label: "Hộp thư (Inbox)", href: "/studio/messages", icon: Inbox },
  { label: "Cài đặt (Settings)", href: "/studio/settings", icon: Settings },
];

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // If on login page, render clean layout without sidebar
  if (pathname === "/studio/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col md:flex-row bg-surface">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-surface-container-lowest border-r border-outline-variant/30 flex flex-col justify-between p-4 flex-shrink-0">
        <div>
          <div className="flex items-center gap-2 px-3 py-3 mb-4 rounded-xl bg-surface-container-low border border-outline-variant/30">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm">
              S
            </div>
            <div>
              <span className="font-headline-sm text-[15px] font-bold text-on-surface block leading-tight">
                Studio Admin
              </span>
              <span className="text-[11px] font-code-inline text-secondary font-medium">
                Demo Session Active
              </span>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            {STUDIO_NAV.map((item) => {
              const Icon = item.icon;
              const active =
                item.href === "/studio"
                  ? pathname === "/studio"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-label-md text-label-md transition-all",
                    active
                      ? "bg-primary text-white font-semibold shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                  )}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 mt-6 border-t border-outline-variant/20 flex flex-col gap-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-lg text-body-sm text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink size={15} />
              <span>Xem trang public</span>
            </span>
          </Link>
          <Link
            href="/studio/login"
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-body-sm text-error hover:bg-error-container/20 transition-colors"
          >
            <LogOut size={15} />
            <span>Đăng xuất</span>
          </Link>
        </div>
      </aside>

      {/* Main Studio Viewport */}
      <main className="flex-1 p-6 lg:p-10 max-w-6xl overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
