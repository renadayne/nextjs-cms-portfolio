import React, { Suspense } from "react";
import { Metadata } from "next";
import { contentRepo } from "@/lib/content-repository";
import { BlogCatalog } from "@/components/blog/BlogCatalog";

export const metadata: Metadata = {
  title: "Blog — Góc nhìn Công nghệ & Đời sống",
  description:
    "Tuyển tập các bài viết chuyên sâu về kiến trúc Next.js, Web Vitals, Quản lý State, và lối sống tĩnh lặng số của Nguyễn Minh Quân.",
};

export default async function BlogPage() {
  const [postsData, allTags] = await Promise.all([
    contentRepo.listPosts({ limit: 50 }),
    contentRepo.getAllTags(),
  ]);

  return (
    <Suspense fallback={<div className="py-20 text-center">Đang tải danh sách bài viết...</div>}>
      <BlogCatalog initialPosts={postsData.data} allTags={allTags} />
    </Suspense>
  );
}
