import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowLeft, Calendar, Clock, Bookmark, ChevronRight } from "lucide-react";
import { contentRepo } from "@/lib/content-repository";
import { formatDate } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";
import { ShareArticleButton } from "@/components/blog/ShareArticleButton";
import { PostCard } from "@/components/blog/PostCard";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await contentRepo.getPost(params.slug);
  if (!post || post.status !== "published") {
    return { title: "Không tìm thấy bài viết" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      images: post.coverImageUrl ? [post.coverImageUrl] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await contentRepo.getPost(params.slug);

  if (!post || post.status !== "published") {
    notFound();
  }

  // Related posts (from same category, excluding current)
  const relatedPostsData = await contentRepo.listPosts({
    category: post.category,
    limit: 4,
  });
  const relatedPosts = relatedPostsData.data
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const categoryLabel = post.category === "tech" ? "Công nghệ" : "Đời sống";

  return (
    <article className="w-full pb-24">
      {/* Article Top Header */}
      <section className="pt-10 pb-12 bg-surface-container-low/30 border-b border-outline-variant/30">
        <Container size="reading">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-body-sm text-outline mb-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 hover:text-primary transition-colors"
            >
              <ArrowLeft size={15} />
              <span>Blog</span>
            </Link>
            <ChevronRight size={13} />
            <Link
              href={`/blog?category=${post.category}`}
              className="hover:text-primary transition-colors"
            >
              {categoryLabel}
            </Link>
          </nav>

          {/* Category & Date */}
          <div className="flex flex-wrap items-center gap-3 mb-4 text-body-sm text-outline">
            <Badge category={post.category}>{categoryLabel}</Badge>
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={14} />
              <span>{formatDate(post.publishedAt || post.createdAt)}</span>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} />
              <span>{post.readingTimeMinutes} phút đọc</span>
            </span>
          </div>

          {/* Title */}
          <h1 className="font-headline-lg lg:font-display-xl text-headline-lg lg:text-[44px] lg:leading-[54px] text-on-surface font-bold tracking-tight mb-6">
            {post.title}
          </h1>

          {/* Lead Excerpt */}
          <p className="font-body-editorial text-body-editorial text-on-surface-variant leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author snippet & Share */}
          <div className="pt-6 mt-6 border-t border-outline-variant/30 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden relative border border-outline-variant">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Nguyễn Minh Quân"
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <div>
                <span className="font-label-md text-label-md text-on-surface font-semibold block">
                  Nguyễn Minh Quân
                </span>
                <span className="font-code-inline text-[12px] text-outline">
                  Senior Frontend Engineer
                </span>
              </div>
            </div>

            <ShareArticleButton title={post.title} />
          </div>
        </Container>
      </section>

      {/* Optional Hero Cover Image */}
      {post.coverImageUrl && (
        <div className="w-full max-w-[940px] mx-auto px-margin-mobile lg:px-margin mt-10">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-surface-container shadow-md border border-outline-variant/30">
            <Image
              src={post.coverImageUrl}
              alt={post.coverImageAlt || post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 940px) 100vw, 940px"
            />
          </div>
        </div>
      )}

      {/* Main Reading Column */}
      <section className="pt-10">
        <Container size="reading">
          {/* Markdown Content */}
          <MarkdownRenderer content={post.contentMarkdown} />

          {/* Tags */}
          <div className="pt-8 mt-12 border-t border-outline-variant/30 flex flex-wrap items-center gap-2">
            <span className="font-code-inline text-[13px] text-outline uppercase font-semibold mr-2">
              Chủ đề:
            </span>
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="px-3 py-1 rounded-md bg-surface-container font-code-inline text-[13px] text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="mt-20 pt-16 bg-surface-container-low/40 border-t border-outline-variant/30">
          <Container>
            <div className="flex items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-primary font-code-inline text-code-inline uppercase tracking-wider font-semibold">
                  Gợi ý đọc tiếp
                </span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-1">
                  Bài viết cùng chủ đề
                </h2>
              </div>
              <Link
                href="/blog"
                className="font-label-md text-label-md text-primary hover:text-secondary font-semibold"
              >
                Xem tất cả →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <PostCard key={related.id} post={related} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}
