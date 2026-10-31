import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, ArrowRight, Sparkles } from "lucide-react";
import { GithubIcon } from "../ui/Icons";
import { ProjectSummary } from "@/types";

interface ProjectCardProps {
  project: ProjectSummary;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const categoryLabels: Record<string, string> = {
    web: "Sản phẩm Web",
    oss: "Mã nguồn mở",
    design: "Thiết kế UI/UX",
    mobile: "Mobile App",
  };

  return (
    <article
      className={`group bg-surface-container-lowest rounded-2xl p-6 lg:p-8 border border-outline-variant/30 shadow-[0_1px_3px_0_rgba(15,23,42,0.03)] hover:shadow-[0_10px_25px_-5px_rgba(15,23,42,0.06)] hover:border-outline-variant transition-all duration-300 flex flex-col justify-between ${
        featured ? "md:col-span-12 lg:col-span-7" : "md:col-span-6 lg:col-span-5"
      }`}
    >
      <div>
        {/* Header: Badges & Year */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm font-semibold">
              {categoryLabels[project.category] || "Dự án"}
            </span>
            {project.featured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-low text-on-surface-variant font-code-inline text-[12px]">
                <Sparkles size={11} className="text-secondary" />
                Featured
              </span>
            )}
          </div>
          {project.year && (
            <span className="font-code-inline text-code-inline text-outline">
              {project.year}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-primary transition-colors mb-2">
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>

        {/* Role */}
        {project.role && (
          <p className="font-code-inline text-[13px] text-outline mb-3">
            Vai trò: <span className="text-on-surface-variant font-medium">{project.role}</span>
          </p>
        )}

        {/* Summary */}
        <p className="font-body-default text-body-default text-on-surface-variant mb-6 leading-relaxed">
          {project.summary}
        </p>

        {/* Visual Metric Preview or Image */}
        {project.metrics ? (
          <div className="w-full h-36 rounded-xl bg-surface-container-low p-4 flex flex-col justify-between mb-6 overflow-hidden relative border border-outline-variant/20">
            <div className="flex items-center justify-between">
              <span className="font-code-inline text-[12px] text-on-surface-variant font-medium">
                {project.metrics.label}
              </span>
              <span className="font-code-inline text-[13px] text-secondary font-bold">
                {project.metrics.value}
              </span>
            </div>
            {/* Visual simulation bar */}
            <div className="w-full flex items-end gap-3 h-20 pt-2">
              <div className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-surface-container rounded-t h-12"></div>
                <span className="font-code-inline text-[10px] text-outline">Setup</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-surface-container rounded-t h-16"></div>
                <span className="font-code-inline text-[10px] text-outline">Test</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-primary-container rounded-t h-8"></div>
                <span className="font-code-inline text-[10px] text-primary font-semibold">
                  Optimized
                </span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-surface-container rounded-t h-14"></div>
                <span className="font-code-inline text-[10px] text-outline">Deploy</span>
              </div>
            </div>
          </div>
        ) : project.coverImageUrl ? (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 bg-surface-container-low border border-outline-variant/20">
            <Image
              src={project.coverImageUrl}
              alt={project.coverImageAlt || project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ) : null}
      </div>

      {/* Footer: Tech Stack and Links */}
      <div>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 rounded bg-surface-container font-code-inline text-[12px] text-on-surface-variant"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between gap-3">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary font-semibold hover:text-secondary transition-colors"
          >
            <span>Chi tiết dự án</span>
            <ArrowRight size={16} />
          </Link>

          <div className="flex items-center gap-2">
            {project.repositoryUrl && (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
                title="Mã nguồn GitHub"
                aria-label="GitHub Repository"
              >
                <GithubIcon size={17} />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
                title="Xem bản Live Demo"
                aria-label="Live Demo"
              >
                <ExternalLink size={17} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
