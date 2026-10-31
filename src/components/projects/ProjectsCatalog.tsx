"use client";

import React, { useState, useMemo } from "react";
import { Search, X, Terminal } from "lucide-react";
import { ProjectCategory, ProjectSummary } from "@/types";
import { Container } from "../ui/Container";
import { ProjectCard } from "./ProjectCard";

interface ProjectsCatalogProps {
  initialProjects: ProjectSummary[];
}

export function ProjectsCatalog({ initialProjects }: ProjectsCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | "all">("all");
  const [search, setSearch] = useState("");

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      if (selectedCategory !== "all" && project.category !== selectedCategory) {
        return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchTitle = project.title.toLowerCase().includes(q);
        const matchSummary = project.summary.toLowerCase().includes(q);
        const matchTech = project.techStack.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchSummary && !matchTech) return false;
      }
      return true;
    });
  }, [initialProjects, selectedCategory, search]);

  const categories: { key: ProjectCategory | "all"; label: string }[] = [
    { key: "all", label: `Tất cả (${initialProjects.length})` },
    {
      key: "web",
      label: `Sản phẩm Web (${initialProjects.filter((p) => p.category === "web").length})`,
    },
    {
      key: "oss",
      label: `Mã nguồn mở (${initialProjects.filter((p) => p.category === "oss").length})`,
    },
    {
      key: "design",
      label: `Thiết kế UI/UX (${initialProjects.filter((p) => p.category === "design").length})`,
    },
  ];

  return (
    <div className="w-full pb-24">
      {/* Header Section */}
      <section className="pt-12 pb-12 bg-surface-container-low/40 border-b border-outline-variant/30">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <span className="font-code-inline text-code-inline uppercase tracking-widest text-primary font-medium">
                  Selected Works &amp; Lab
                </span>
              </div>
              <h1 className="font-headline-lg lg:font-display-xl text-headline-lg text-on-surface font-bold tracking-tight">
                Dự án đã thực hiện
              </h1>
              <p className="mt-3 font-body-editorial text-body-editorial text-on-surface-variant leading-relaxed">
                Tuyển tập các sản phẩm, ứng dụng web và công cụ mã nguồn mở tôi đã thiết kế và phát triển với sự chú trọng cao vào hiệu năng và trải nghiệm tương tác.
              </p>
            </div>

            {/* Quick Metrics Sparkline Card */}
            <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 shadow-sm flex items-center gap-4 self-start md:self-auto min-w-[260px]">
              <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary">
                <Terminal size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2 font-headline-sm text-headline-sm text-on-surface font-bold">
                  <span>{initialProjects.length}</span>
                  <span className="font-label-sm text-label-sm text-secondary bg-surface-container-low px-2 py-0.5 rounded-full font-medium">
                    100% Shipped
                  </span>
                </div>
                <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                  Sản phẩm công khai &amp; mã nguồn
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Filter Controls & Search Toolbar */}
      <section className="py-6 border-b border-outline-variant/20 sticky top-16 z-30 bg-surface/90 backdrop-blur-md">
        <Container>
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-4 py-2 rounded-full font-label-md text-label-md transition-all whitespace-nowrap ${
                    selectedCategory === cat.key
                      ? "bg-on-surface text-surface shadow-sm font-semibold"
                      : "bg-surface-container-lowest text-on-surface-variant hover:text-on-surface hover:bg-surface-container border border-outline-variant/30"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Keyword Search */}
            <div className="relative w-full md:w-80">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm kiếm dự án, công nghệ..."
                className="w-full pl-10 pr-10 py-2 bg-surface-container-lowest rounded-lg border border-outline-variant/40 font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Projects Grid Showcase */}
      <section className="pt-10">
        <Container>
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  featured={index === 0 && selectedCategory === "all" && !search}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center flex flex-col items-center justify-center max-w-md mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center text-outline mb-4">
                <Search size={28} />
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-2">
                Không tìm thấy dự án phù hợp
              </h3>
              <p className="font-body-default text-body-default text-on-surface-variant mb-6">
                Không có dự án nào thỏa mãn tiêu chí tìm kiếm. Hãy thử từ khóa khác.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearch("");
                }}
                className="px-5 py-2.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-medium hover:bg-secondary transition-colors"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
