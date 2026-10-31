import React from "react";
import Link from "next/link";
import { Mail, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "../ui/Icons";
import { Container } from "../ui/Container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-surface-container-low/70 border-t border-outline-variant/30 mt-20 pt-16 pb-12 transition-colors">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-outline-variant/30">
          {/* Brand & Mission */}
          <div className="md:col-span-5 flex flex-col items-start gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary-container flex items-center justify-center text-white font-bold text-xs shadow-sm">
                Q
              </div>
              <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">
                Minh Quân
                <span className="text-primary font-code-inline text-code-inline">
                  .dev
                </span>
              </span>
            </Link>
            <p className="font-body-default text-body-default text-on-surface-variant max-w-sm leading-relaxed">
              Không gian số cá nhân chia sẻ kiến trúc frontend hiện đại, tối ưu hiệu
              năng web và những suy ngẫm về lối sống tĩnh lặng.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-colors shadow-sm"
                aria-label="GitHub Profile"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-colors shadow-sm"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-colors shadow-sm"
                aria-label="Twitter Profile"
              >
                <TwitterIcon size={18} />
              </a>
              <a
                href="mailto:quan.nguyen@example.com"
                className="w-9 h-9 rounded-full bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-colors shadow-sm"
                aria-label="Send Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="font-code-inline text-code-inline uppercase tracking-wider text-outline font-semibold">
              Điều hướng
            </span>
            <Link
              href="/blog"
              className="text-body-default text-on-surface-variant hover:text-primary transition-colors"
            >
              Tất cả bài viết
            </Link>
            <Link
              href="/projects"
              className="text-body-default text-on-surface-variant hover:text-primary transition-colors"
            >
              Dự án thực hiện
            </Link>
            <Link
              href="/about"
              className="text-body-default text-on-surface-variant hover:text-primary transition-colors"
            >
              Hành trình & Kinh nghiệm
            </Link>
            <Link
              href="/contact"
              className="text-body-default text-on-surface-variant hover:text-primary transition-colors"
            >
              Liên hệ hợp tác
            </Link>
          </div>

          {/* Editorial & Topics */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <span className="font-code-inline text-code-inline uppercase tracking-wider text-outline font-semibold">
              Chủ đề nổi bật
            </span>
            <div className="flex flex-wrap gap-2 pt-1">
              {["Next.js", "Web Vitals", "State Management", "Tĩnh lặng số", "Tailwind CSS", "Architecture"].map(
                (tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="px-2.5 py-1 rounded bg-surface-container font-code-inline text-[12px] text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors"
                  >
                    #{tag}
                  </Link>
                )
              )}
            </div>
            <div className="pt-3">
              <Link
                href="/studio"
                className="inline-flex items-center gap-1.5 text-[13px] font-code-inline text-outline hover:text-on-surface transition-colors"
              >
                <span>→ Studio Admin Portal</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-body-sm text-outline">
          <p>© {currentYear} Nguyễn Minh Quân. Thiết kế & phát triển với Next.js và Tailwind CSS.</p>
          <a
            href="#"
            className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
          >
            <span>Lên đầu trang</span>
            <ArrowUp size={16} />
          </a>
        </div>
      </Container>
    </footer>
  );
}
