"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, ExternalLink, Search } from "lucide-react";
import { contentRepo } from "@/lib/content-repository";
import { PostSummary, PostStatus } from "@/types";
import { formatDate } from "@/lib/utils";

export default function StudioPostsPage() {
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<PostStatus | "all">("all");

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await contentRepo.listPosts({ limit: 100 });
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa bài viết "${title}"?`)) {
      await contentRepo.deletePost(id);
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  const filtered = posts.filter((post) => {
    if (statusFilter !== "all" && post.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!post.title.toLowerCase().includes(q) && !post.excerpt.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
            Quản lý Bài viết (Blog)
          </h1>
          <p className="font-body-default text-body-default text-on-surface-variant mt-1">
            Tạo mới, chỉnh sửa nội dung Markdown và phát hành bài viết.
          </p>
        </div>

        <Link
          href="/studio/posts/new"
          className="h-10 px-4 rounded-lg bg-primary text-white font-label-md text-label-md inline-flex items-center gap-2 hover:bg-secondary transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Tạo bài viết mới</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-body-sm transition-colors ${
              statusFilter === "all"
                ? "bg-on-surface text-surface font-semibold"
                : "bg-surface-container text-on-surface-variant"
            }`}
          >
            Tất cả ({posts.length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("published")}
            className={`px-3 py-1.5 rounded-lg text-body-sm transition-colors ${
              statusFilter === "published"
                ? "bg-primary text-white font-semibold"
                : "bg-surface-container text-on-surface-variant"
            }`}
          >
            Đã xuất bản ({posts.filter((p) => p.status === "published").length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("draft")}
            className={`px-3 py-1.5 rounded-lg text-body-sm transition-colors ${
              statusFilter === "draft"
                ? "bg-secondary text-white font-semibold"
                : "bg-surface-container text-on-surface-variant"
            }`}
          >
            Bản nháp ({posts.filter((p) => p.status === "draft").length})
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
          <input
            type="text"
            placeholder="Tìm theo tiêu đề..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/40 text-body-sm focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-12 text-center text-outline">Đang tải dữ liệu...</div>
        ) : filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-body-sm">
              <thead className="bg-surface-container text-on-surface-variant font-semibold">
                <tr>
                  <th className="px-5 py-3.5">Tiêu đề</th>
                  <th className="px-5 py-3.5">Chuyên mục</th>
                  <th className="px-5 py-3.5">Trạng thái</th>
                  <th className="px-5 py-3.5">Ngày đăng</th>
                  <th className="px-5 py-3.5 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {filtered.map((post) => (
                  <tr key={post.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-5 py-4 font-medium text-on-surface">
                      <div className="font-semibold">{post.title}</div>
                      <div className="text-[12px] font-code-inline text-outline truncate max-w-md">
                        /blog/{post.slug}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-0.5 rounded-full font-code-inline text-[12px] bg-surface-container">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {post.status === "published" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[12px] font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                          Đã phát hành
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container text-outline text-[12px]">
                          Bản nháp
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-outline font-code-inline text-[12px]">
                      {formatDate(post.publishedAt || post.createdAt)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-1.5 rounded text-outline hover:text-primary transition-colors"
                          title="Xem trước bài viết"
                        >
                          <ExternalLink size={16} />
                        </Link>
                        <Link
                          href={`/studio/posts/${post.id}/edit`}
                          className="p-1.5 rounded text-outline hover:text-on-surface transition-colors"
                          title="Chỉnh sửa bài viết"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(post.id, post.title)}
                          className="p-1.5 rounded text-outline hover:text-error transition-colors"
                          title="Xóa bài viết"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center text-outline">Không có bài viết nào phù hợp.</div>
        )}
      </div>
    </div>
  );
}
