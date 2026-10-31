"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, FolderGit2, Inbox, Plus, ArrowUpRight, CheckCircle2, Clock } from "lucide-react";
import { contentRepo } from "@/lib/content-repository";
import { PostSummary, ProjectSummary, ContactMessage } from "@/types";
import { formatDate } from "@/lib/utils";

export default function StudioDashboardPage() {
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [postsRes, projectsRes, msgsRes] = await Promise.all([
          contentRepo.listPosts({ limit: 100 }),
          contentRepo.listProjects({ limit: 100 }),
          contentRepo.listMessages(),
        ]);
        setPosts(postsRes.data);
        setProjects(projectsRes.data);
        setMessages(msgsRes);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const unreadMessagesCount = messages.filter((m) => !m.isRead).length;

  if (loading) {
    return (
      <div className="py-20 text-center text-on-surface-variant font-label-md">
        Đang nạp dữ liệu Studio...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
            Studio Dashboard
          </h1>
          <p className="font-body-default text-body-default text-on-surface-variant mt-1">
            Tổng quan nội dung website, bài viết blog, dự án và tin nhắn liên hệ.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/studio/posts/new"
            className="h-10 px-4 rounded-lg bg-primary text-white font-label-md text-label-md inline-flex items-center gap-2 hover:bg-secondary transition-colors shadow-sm"
          >
            <Plus size={16} />
            <span>Viết bài mới</span>
          </Link>
          <Link
            href="/studio/projects/new"
            className="h-10 px-4 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md inline-flex items-center gap-2 border border-outline-variant/30 hover:bg-surface-container transition-colors shadow-sm"
          >
            <Plus size={16} />
            <span>Thêm dự án</span>
          </Link>
        </div>
      </div>

      {/* Stats Counter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex items-center justify-between">
          <div>
            <span className="font-code-inline text-[13px] text-outline uppercase font-semibold">
              Bài viết Blog
            </span>
            <div className="font-headline-lg text-headline-lg text-on-surface font-bold mt-1">
              {posts.length}
            </div>
            <span className="text-[12px] text-secondary font-medium">
              {posts.filter((p) => p.featured).length} bài nổi bật
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
            <FileText size={22} />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex items-center justify-between">
          <div>
            <span className="font-code-inline text-[13px] text-outline uppercase font-semibold">
              Dự án Portfolio
            </span>
            <div className="font-headline-lg text-headline-lg text-on-surface font-bold mt-1">
              {projects.length}
            </div>
            <span className="text-[12px] text-primary font-medium">100% hoàn thành</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface">
            <FolderGit2 size={22} />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex items-center justify-between">
          <div>
            <span className="font-code-inline text-[13px] text-outline uppercase font-semibold">
              Tin nhắn mới
            </span>
            <div className="font-headline-lg text-headline-lg text-secondary font-bold mt-1">
              {unreadMessagesCount}
            </div>
            <span className="text-[12px] text-outline">
              Tổng số {messages.length} tin nhắn
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary">
            <Inbox size={22} />
          </div>
        </div>
      </div>

      {/* Split Section: Recent Posts & Recent Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Posts */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <h2 className="font-headline-sm text-[18px] text-on-surface font-bold">
                Bài viết gần đây
              </h2>
              <Link
                href="/studio/posts"
                className="text-body-sm text-primary hover:underline inline-flex items-center gap-1 font-medium"
              >
                <span>Xem tất cả</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="divide-y divide-outline-variant/20">
              {posts.slice(0, 4).map((post) => (
                <div key={post.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="truncate pr-2">
                    <span className="font-label-md text-label-md font-semibold text-on-surface truncate block">
                      {post.title}
                    </span>
                    <span className="font-code-inline text-[11px] text-outline">
                      {post.category.toUpperCase()} • {formatDate(post.publishedAt || post.createdAt)}
                    </span>
                  </div>
                  <Link
                    href={`/studio/posts/${post.id}/edit`}
                    className="px-2.5 py-1 rounded bg-surface-container text-body-sm text-on-surface hover:text-primary transition-colors flex-shrink-0"
                  >
                    Sửa
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <h2 className="font-headline-sm text-[18px] text-on-surface font-bold">
                Tin nhắn khách gửi
              </h2>
              <Link
                href="/studio/messages"
                className="text-body-sm text-primary hover:underline inline-flex items-center gap-1 font-medium"
              >
                <span>Mở hộp thư</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="divide-y divide-outline-variant/20">
              {messages.length > 0 ? (
                messages.slice(0, 3).map((msg) => (
                  <div key={msg.id} className="py-3 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-label-md font-bold text-on-surface">
                        {msg.name}
                      </span>
                      <span className="text-[11px] font-code-inline text-outline">
                        {formatDate(msg.createdAt)}
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                      {msg.message}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-body-sm text-outline py-6 text-center">
                  Hộp thư hiện đang trống.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
