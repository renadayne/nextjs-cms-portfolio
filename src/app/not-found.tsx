import React from "react";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-20">
      <Container size="reading" className="text-center">
        <span className="font-code-inline text-display-xl font-bold text-primary block mb-2">
          404
        </span>
        <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mb-4">
          Trang không tồn tại
        </h1>
        <p className="font-body-editorial text-body-editorial text-on-surface-variant max-w-md mx-auto mb-8 leading-relaxed">
          Bài viết hoặc trang bạn đang tìm kiếm có thể đã được gỡ bỏ, đổi đường dẫn hoặc tạm thời không khả dụng.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="h-11 px-6 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold inline-flex items-center gap-2 shadow-sm hover:bg-secondary transition-all"
          >
            <Home size={18} />
            <span>Về Trang chủ</span>
          </Link>
          <Link
            href="/blog"
            className="h-11 px-6 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md inline-flex items-center gap-2 border border-outline-variant/40 hover:bg-surface-container transition-all"
          >
            <ArrowLeft size={18} />
            <span>Xem Blog</span>
          </Link>
        </div>
      </Container>
    </div>
  );
}
