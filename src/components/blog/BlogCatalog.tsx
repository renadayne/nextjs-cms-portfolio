"use client";

import React, { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, BookOpen, Layers } from "lucide-react";
import { PostSummary, PostCategory } from "@/types";
import { Container } from "../ui/Container";
import { PostCard } from "./PostCard";

interface BlogCatalogProps {
  initialPosts: PostSummary[];
  allTags: string[];
}

export function BlogCatalog({ initialPosts, allTags }: BlogCatalogProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = (searchParams.get("category") as PostCategory | "all") || "all";
  const currentTag = searchParams.get("tag") || "";
  const currentQuery = searchParams.get("q") || "";

  const [search, setSearch] = useState(currentQuery);

  const updateFilters = (params: {
    category?: string;
    tag?: string;
    q?: string;
  }) => {
    const urlParams = new URLSearchParams(searchParams.toString());

    if (params.category !== undefined) {
      if (params.category === "all") urlParams.delete("category");
      else urlParams.set("category", params.category);
    }

    if (params.tag !== undefined) {
      if (!params.tag) urlParams.delete("tag");
      else urlParams.set("tag", params.tag);
    }

    if (params.q !== undefined) {
      if (!params.q.trim()) urlParams.delete("q");
      else urlParams.set("q", params.q.trim());
    }

    router.push(`/blog?${urlParams.toString()}`);
  };

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      // Category filter
      if (currentCategory !== "all" && post.category !== currentCategory) {
        return false;
      }
      // Tag filter
      if (currentTag && !post.tags.some((t) => t.toLowerCase() === currentTag.toLowerCase())) {
        return false;
      }
      // Search query filter
      if (currentQuery) {
        const query = currentQuery.toLowerCase();
        const matchTitle = post.title.toLowerCase().includes(query);
        const matchExcerpt = post.excerpt.toLowerCase().includes(query);
        if (!matchTitle && !matchExcerpt) return false;
      }
      return true;
    });
  }, [initialPosts, currentCategory, currentTag, currentQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ q: search });
  };

  const handleClearFilters = () => {
    setSearch("");
    router.push("/blog");
  };

  return (
    <div className="w-full pb-24">
      {/* Page Header */}
      <section className="pt-12 pb-10 bg-surface-container-low/40 border-b border-outline-variant/30">
        <Container>
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-primary font-code-inline text-code-inline uppercase tracking-wider mb-2">
              <BookOpen size={16} />
              <span>Góc nhìn & Bài viết</span>
            </div>
            <h1 className="font-headline-lg lg:font-display-xl text-headline-lg text-on-surface font-bold tracking-tight mb-4">
              Blog Công nghệ & Đời sống
            </h1>
            <p className="font-body-editorial text-body-editorial text-on-surface-variant leading-relaxed">
              Những bài viết chuyên sâu về kỹ thuật web, kinh nghiệm tối ưu hóa hiệu năng, cùng các ghi chép chiêm nghiệm về hành trình làm việc và lối sống tĩnh lặng.
            </p>
          </div>
        </Container>
      </section>

      {/* Filter Toolbar */}
      <section className="py-8 border-b border-outline-variant/20 sticky top-16 z-30 bg-surface/90 backdrop-blur-md">
        <Container>
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              <button
                type="button"
                onClick={() => updateFilters({ category: "all" })}
                className={`px-4 py-2 rounded-full font-label-md text-label-md transition-all whitespace-nowrap ${
                  currentCategory === "all"
                    ? "bg-on-surface text-surface shadow-sm font-semibold"
                    : "bg-surface-container-lowest text-on-surface-variant hover:text-on-surface hover:bg-surface-container border border-outline-variant/30"
                }`}
              >
                Tất cả ({initialPosts.length})
              </button>
              <button
                type="button"
                onClick={() => updateFilters({ category: "tech" })}
                className={`px-4 py-2 rounded-full font-label-md text-label-md transition-all whitespace-nowrap ${
                  currentCategory === "tech"
                    ? "bg-primary-container text-on-primary shadow-sm font-semibold"
                    : "bg-surface-container-lowest text-on-surface-variant hover:text-on-surface hover:bg-surface-container border border-outline-variant/30"
                }`}
              >
                Công nghệ ({initialPosts.filter((p) => p.category === "tech").length})
              </button>
              <button
                type="button"
                onClick={() => updateFilters({ category: "life" })}
                className={`px-4 py-2 rounded-full font-label-md text-label-md transition-all whitespace-nowrap ${
                  currentCategory === "life"
                    ? "bg-on-surface text-surface shadow-sm font-semibold"
                    : "bg-surface-container-lowest text-on-surface-variant hover:text-on-surface hover:bg-surface-container border border-outline-variant/30"
                }`}
              >
                Đời sống ({initialPosts.filter((p) => p.category === "life").length})
              </button>
            </div>

            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm bài viết..."
                className="w-full pl-10 pr-10 py-2 bg-surface-container-lowest rounded-lg border border-outline-variant/40 font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    updateFilters({ q: "" });
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
                >
                  <X size={16} />
                </button>
              )}
            </form>
          </div>

          {/* Tags Filter Row */}
          <div className="flex items-center gap-2 overflow-x-auto pt-4 text-body-sm">
            <span className="font-code-inline text-[12px] text-outline uppercase font-semibold whitespace-nowrap flex items-center gap-1">
              <Layers size={13} /> Tags:
            </span>
            {allTags.map((tag) => {
              const active = currentTag.toLowerCase() === tag.toLowerCase();
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => updateFilters({ tag: active ? "" : tag })}
                  className={`px-2.5 py-1 rounded-md font-code-inline text-[12px] transition-colors whitespace-nowrap ${
                    active
                      ? "bg-primary text-white font-medium"
                      : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Posts Grid */}
      <section className="pt-10">
        <Container>
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="py-20 text-center flex flex-col items-center justify-center max-w-md mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center text-outline mb-4">
                <Search size={28} />
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-2">
                Không tìm thấy bài viết phù hợp
              </h3>
              <p className="font-body-default text-body-default text-on-surface-variant mb-6">
                Rất tiếc, không có bài viết nào khớp với từ khóa hoặc bộ lọc đã chọn. Hãy thử tìm kiếm với từ khóa khác.
              </p>
              <button
                type="button"
                onClick={handleClearFilters}
                className="px-5 py-2.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-medium hover:bg-secondary transition-colors"
              >
                Xóa tất cả bộ lọc
              </button>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
