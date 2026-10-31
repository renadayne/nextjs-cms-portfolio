"use client";

import React, { useState } from "react";
import { Share2, Check, Copy } from "lucide-react";

export function ShareArticleButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-all active:scale-95 border border-outline-variant/30"
      title="Sao chép liên kết bài viết"
    >
      {copied ? (
        <>
          <Check size={16} className="text-secondary" />
          <span className="text-secondary font-medium">Đã sao chép link!</span>
        </>
      ) : (
        <>
          <Copy size={16} />
          <span>Sao chép liên kết</span>
        </>
      )}
    </button>
  );
}
