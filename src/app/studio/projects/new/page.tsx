"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { contentRepo } from "@/lib/content-repository";
import { ProjectCategory } from "@/types";

export default function NewProjectPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState<ProjectCategory>("web");
  const [role, setRole] = useState("Lead Frontend Engineer");
  const [year, setYear] = useState("2024");
  const [techStackInput, setTechStackInput] = useState("React, Next.js, TypeScript, Tailwind");
  const [demoUrl, setDemoUrl] = useState("");
  const [repositoryUrl, setRepositoryUrl] = useState("");
  const [contentMarkdown, setContentMarkdown] = useState(`## Bối cảnh dự án\nMô tả vấn đề thực tế cần giải quyết...\n\n### Thách thức kỹ thuật\n1. Hiệu năng\n2. Kiến trúc...\n\n### Giải pháp\nChi tiết giải pháp...\n\n### Kết quả\nCác chỉ số thực tế...`);
  const [featured, setFeatured] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    const generated = val
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    setSlug(generated);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) {
      alert("Vui lòng nhập tiêu đề và slug dự án.");
      return;
    }

    setSaving(true);
    const techStack = techStackInput.split(",").map((t) => t.trim()).filter(Boolean);

    try {
      await contentRepo.createProject({
        title,
        slug,
        summary,
        category,
        role,
        year,
        techStack,
        demoUrl: demoUrl || undefined,
        repositoryUrl: repositoryUrl || undefined,
        contentMarkdown,
        featured,
        status: "published",
      });
      router.push("/studio/projects");
    } catch (err) {
      console.error(err);
      alert("Đã xảy ra lỗi khi tạo dự án.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-6 max-w-4xl">
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-outline-variant/30">
        <Link
          href="/studio/projects"
          className="inline-flex items-center gap-1.5 text-body-sm text-outline hover:text-on-surface transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Quay lại danh sách</span>
        </Link>

        <button
          type="submit"
          disabled={saving}
          className="h-10 px-5 rounded-lg bg-primary text-white text-body-sm font-semibold hover:bg-secondary transition-colors inline-flex items-center gap-2 shadow-sm disabled:opacity-50"
        >
          <Save size={16} />
          <span>Lưu dự án</span>
        </button>
      </div>

      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 flex flex-col gap-5">
        <div>
          <label className="font-label-md text-label-md font-semibold text-on-surface block mb-1.5">
            Tên dự án
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Ví dụ: HyperFlow — Workflow Automation Platform"
            className="w-full px-4 py-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40 font-bold text-headline-sm text-on-surface focus:outline-none focus:border-primary"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-label-md text-label-md font-semibold text-on-surface block mb-1.5">
              Slug
            </label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-surface-container-low border border-outline-variant/40 font-code-inline text-body-sm text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="font-label-md text-label-md font-semibold text-on-surface block mb-1.5">
              Phân loại
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ProjectCategory)}
              className="w-full px-4 py-2 rounded-lg bg-surface-container-low border border-outline-variant/40 text-body-sm text-on-surface focus:outline-none focus:border-primary"
            >
              <option value="web">Sản phẩm Web</option>
              <option value="oss">Mã nguồn mở (OSS)</option>
              <option value="design">Thiết kế UI/UX</option>
              <option value="mobile">Mobile App</option>
            </select>
          </div>
        </div>

        <div>
          <label className="font-label-md text-label-md font-semibold text-on-surface block mb-1.5">
            Tóm tắt ngắn (Summary)
          </label>
          <textarea
            rows={2}
            required
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Mô tả 1-2 câu về giải pháp và mục tiêu..."
            className="w-full px-4 py-2 rounded-lg bg-surface-container-low border border-outline-variant/40 text-body-sm text-on-surface focus:outline-none focus:border-primary resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="font-label-md text-label-md font-semibold text-on-surface block mb-1.5">
              Vai trò
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-surface-container-low border border-outline-variant/40 text-body-sm text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="font-label-md text-label-md font-semibold text-on-surface block mb-1.5">
              Năm thực hiện
            </label>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-surface-container-low border border-outline-variant/40 text-body-sm text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="font-label-md text-label-md font-semibold text-on-surface block mb-1.5">
              Công nghệ (phân cách bởi dấu phẩy)
            </label>
            <input
              type="text"
              value={techStackInput}
              onChange={(e) => setTechStackInput(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-surface-container-low border border-outline-variant/40 text-body-sm text-on-surface focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-label-md text-label-md font-semibold text-on-surface block mb-1.5">
              Demo URL
            </label>
            <input
              type="url"
              placeholder="https://example.com"
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-surface-container-low border border-outline-variant/40 text-body-sm text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="font-label-md text-label-md font-semibold text-on-surface block mb-1.5">
              Repository URL (GitHub)
            </label>
            <input
              type="url"
              placeholder="https://github.com/..."
              value={repositoryUrl}
              onChange={(e) => setRepositoryUrl(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-surface-container-low border border-outline-variant/40 text-body-sm text-on-surface focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div>
          <label className="font-label-md text-label-md font-semibold text-on-surface block mb-1.5">
            Nội dung Case Study chi tiết (Markdown)
          </label>
          <textarea
            rows={10}
            value={contentMarkdown}
            onChange={(e) => setContentMarkdown(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant/40 font-code-inline text-body-sm text-on-surface focus:outline-none focus:border-primary resize-y"
          />
        </div>

        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="featured-proj"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="w-4 h-4 text-primary rounded"
          />
          <label htmlFor="featured-proj" className="font-label-md text-label-md text-on-surface">
            Đánh dấu dự án tiêu biểu (Featured on Homepage)
          </label>
        </div>
      </div>
    </form>
  );
}
