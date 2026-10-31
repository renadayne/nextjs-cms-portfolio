"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { PostDetail, PostCategory, PostStatus } from "@/types";
import { contentRepo } from "@/lib/content-repository";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";

interface PostEditorFormProps {
  initialData?: PostDetail;
  isNew?: boolean;
}

export function PostEditorForm({ initialData, isNew = false }: PostEditorFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [category, setCategory] = useState<PostCategory>(initialData?.category || "tech");
  const [status, setStatus] = useState<PostStatus>(initialData?.status || "draft");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [contentMarkdown, setContentMarkdown] = useState(initialData?.contentMarkdown || "");
  const [tagsInput, setTagsInput] = useState(initialData?.tags.join(", ") || "");
  const [coverImageUrl, setCoverImageUrl] = useState(initialData?.coverImageUrl || "");
  const [featured, setFeatured] = useState(Boolean(initialData?.featured));

  const [previewMode, setPreviewMode] = useState(false);
  const [saving, setSaving] = useState(false);

  // Auto generate slug from title if new
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (isNew) {
      const generated = val
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[đĐ]/g, "d")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      setSlug(generated);
    }
  };

  const handleSave = async (targetStatus?: PostStatus) => {
    if (!title.trim() || !slug.trim()) {
      alert("Vui lòng nhập tiêu đề và đường dẫn (slug) bài viết.");
      return;
    }

    setSaving(true);
    const postStatus = targetStatus || status;
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      if (isNew) {
        await contentRepo.createPost({
          title,
          slug,
          category,
          status: postStatus,
          excerpt,
          contentMarkdown,
          tags,
          coverImageUrl: coverImageUrl || undefined,
          featured,
        });
      } else if (initialData?.id) {
        await contentRepo.updatePost(initialData.id, {
          title,
          slug,
          category,
          status: postStatus,
          excerpt,
          contentMarkdown,
          tags,
          coverImageUrl: coverImageUrl || undefined,
          featured,
        });
      }
      router.push("/studio/posts");
    } catch (err) {
      console.error(err);
      alert("Đã có lỗi xảy ra khi lưu bài viết.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-outline-variant/30">
        <Link
          href="/studio/posts"
          className="inline-flex items-center gap-1.5 text-body-sm text-outline hover:text-on-surface transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Quay lại danh sách</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className="h-10 px-4 rounded-lg bg-surface-container text-on-surface text-body-sm font-medium inline-flex items-center gap-2 hover:bg-surface-container-high transition-colors"
          >
            {previewMode ? <EyeOff size={16} /> : <Eye size={16} />}
            <span>{previewMode ? "Chế độ soạn thảo" : "Xem trước"}</span>
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave("draft")}
            className="h-10 px-4 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-on-surface text-body-sm font-medium hover:bg-surface-container transition-colors disabled:opacity-50"
          >
            Lưu bản nháp
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave("published")}
            className="h-10 px-5 rounded-lg bg-primary text-white text-body-sm font-semibold hover:bg-secondary transition-colors inline-flex items-center gap-2 shadow-sm disabled:opacity-50"
          >
            <Save size={16} />
            <span>{isNew ? "Xuất bản bài viết" : "Cập nhật bài viết"}</span>
          </button>
        </div>
      </div>

      {previewMode ? (
        <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30">
          <h1 className="font-headline-lg text-headline-lg font-bold mb-4">{title}</h1>
          <p className="font-body-editorial text-body-editorial text-on-surface-variant mb-8 italic">
            {excerpt}
          </p>
          <hr className="my-6 border-outline-variant/30" />
          <MarkdownRenderer content={contentMarkdown} />
        </div>
      ) : (
        <div className="flex flex-col gap-5 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30">
          {/* Title */}
          <div>
            <label className="font-label-md text-label-md font-semibold text-on-surface block mb-1.5">
              Tiêu đề bài viết
            </label>
            <input
              type="text"
              required
              placeholder="Nhập tiêu đề hấp dẫn..."
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40 text-headline-sm font-bold text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          {/* Slug & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-label-md text-label-md font-semibold text-on-surface block mb-1.5">
                Đường dẫn tĩnh (Slug)
              </label>
              <input
                type="text"
                required
                placeholder="ten-bai-viet-slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-surface-container-low border border-outline-variant/40 font-code-inline text-body-sm text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="font-label-md text-label-md font-semibold text-on-surface block mb-1.5">
                Chuyên mục
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as PostCategory)}
                className="w-full px-4 py-2 rounded-lg bg-surface-container-low border border-outline-variant/40 text-body-sm text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="tech">Công nghệ (Tech)</option>
                <option value="life">Đời sống (Life)</option>
              </select>
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="font-label-md text-label-md font-semibold text-on-surface block mb-1.5">
              Đoạn tóm tắt ngắn (Excerpt)
            </label>
            <textarea
              rows={3}
              placeholder="Tóm tắt ngắn gọn nội dung xuất hiện trên thẻ bài viết và meta SEO..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-surface-container-low border border-outline-variant/40 text-body-sm text-on-surface focus:outline-none focus:border-primary resize-none"
            />
          </div>

          {/* Markdown Content */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-label-md text-label-md font-semibold text-on-surface">
                Nội dung bài viết (Markdown)
              </label>
              <span className="text-[12px] font-code-inline text-outline">
                Hỗ trợ định dạng GFM: ## Tiêu đề, ```code, &gt; quote
              </span>
            </div>
            <textarea
              rows={16}
              placeholder="Nhập nội dung Markdown tại đây..."
              value={contentMarkdown}
              onChange={(e) => setContentMarkdown(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant/40 font-code-inline text-body-sm text-on-surface focus:outline-none focus:border-primary resize-y"
            />
          </div>

          {/* Cover image & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-label-md text-label-md font-semibold text-on-surface block mb-1.5">
                URL Ảnh bìa (Cover Image)
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={coverImageUrl}
                onChange={(e) => setCoverImageUrl(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-surface-container-low border border-outline-variant/40 text-body-sm text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="font-label-md text-label-md font-semibold text-on-surface block mb-1.5">
                Tags (Phân cách bởi dấu phẩy)
              </label>
              <input
                type="text"
                placeholder="Next.js, TypeScript, React"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-surface-container-low border border-outline-variant/40 text-body-sm text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Featured checkbox */}
          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="featured-checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 text-primary rounded"
            />
            <label htmlFor="featured-checkbox" className="font-label-md text-label-md text-on-surface">
              Đánh dấu bài viết nổi bật (Hiển thị ưu tiên tại Trang chủ)
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
