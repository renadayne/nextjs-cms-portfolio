import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { PostSummary } from "@/types";
import { formatDate } from "@/lib/utils";
import { Badge } from "../ui/Badge";

interface PostCardProps {
  post: PostSummary;
  featured?: boolean;
}

export function PostCard({ post, featured = false }: PostCardProps) {
  const categoryLabel = post.category === "tech" ? "Công nghệ" : "Đời sống";

  return (
    <article
      className={`group bg-surface-container-lowest rounded-2xl p-6 lg:p-7 border border-outline-variant/30 shadow-[0_1px_3px_0_rgba(15,23,42,0.03)] hover:shadow-[0_10px_25px_-5px_rgba(15,23,42,0.06)] hover:border-outline-variant transition-all duration-300 flex flex-col justify-between ${
        featured ? "lg:col-span-2" : ""
      }`}
    >
      <div>
        {/* Optional Cover Image */}
        {post.coverImageUrl && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-5 bg-surface-container-low">
            <Image
              src={post.coverImageUrl}
              alt={post.coverImageAlt || post.title}
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        {/* Card Header: Category & Metadata */}
        <div className="flex items-center justify-between gap-3 mb-3 text-body-sm text-outline">
          <Badge category={post.category}>{categoryLabel}</Badge>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <Calendar size={13} />
              <span>{formatDate(post.publishedAt || post.createdAt)}</span>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={13} />
              <span>{post.readingTimeMinutes} phút đọc</span>
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-primary transition-colors tracking-tight mb-2.5 line-clamp-2">
          <Link href={`/blog/${post.slug}`} className="focus:outline-none">
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="font-body-default text-body-default text-on-surface-variant line-clamp-3 mb-6 leading-relaxed">
          {post.excerpt}
        </p>
      </div>

      {/* Footer: Tags and Read CTA */}
      <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded bg-surface-container-low font-code-inline text-[12px] text-on-surface-variant"
            >
              #{tag}
            </span>
          ))}
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1 text-label-md font-semibold text-primary group-hover:translate-x-0.5 transition-transform"
          aria-label={`Đọc bài viết ${post.title}`}
        >
          <span>Đọc</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    </article>
  );
}
