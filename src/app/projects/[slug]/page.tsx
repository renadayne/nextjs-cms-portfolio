import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowLeft, ExternalLink, Calendar, User, ChevronRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { contentRepo } from "@/lib/content-repository";
import { Container } from "@/components/ui/Container";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await contentRepo.getProject(params.slug);
  if (!project || project.status !== "published") {
    return { title: "Không tìm thấy dự án" };
  }

  return {
    title: `${project.title} — Dự án`,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: project.coverImageUrl ? [project.coverImageUrl] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await contentRepo.getProject(params.slug);

  if (!project || project.status !== "published") {
    notFound();
  }

  return (
    <article className="w-full pb-24">
      {/* Project Top Hero */}
      <section className="pt-10 pb-12 bg-surface-container-low/30 border-b border-outline-variant/30">
        <Container>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-body-sm text-outline mb-6">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 hover:text-primary transition-colors"
            >
              <ArrowLeft size={15} />
              <span>Dự án</span>
            </Link>
            <ChevronRight size={13} />
            <span className="text-on-surface truncate max-w-xs">{project.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              {/* Category Pill & Year */}
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm font-semibold">
                  {project.category.toUpperCase()}
                </span>
                {project.year && (
                  <span className="font-code-inline text-[13px] text-outline flex items-center gap-1.5">
                    <Calendar size={13} />
                    <span>{project.year}</span>
                  </span>
                )}
                {project.role && (
                  <span className="font-code-inline text-[13px] text-outline flex items-center gap-1.5">
                    <User size={13} />
                    <span>{project.role}</span>
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-headline-lg lg:font-display-xl text-headline-lg lg:text-[44px] lg:leading-[54px] text-on-surface font-bold tracking-tight mb-5">
                {project.title}
              </h1>

              {/* Summary */}
              <p className="font-body-editorial text-body-editorial text-on-surface-variant leading-relaxed mb-8">
                {project.summary}
              </p>

              {/* Action Links */}
              <div className="flex flex-wrap items-center gap-3">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="h-11 px-5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md inline-flex items-center gap-2 shadow-sm hover:bg-secondary active:scale-[0.98] transition-all"
                  >
                    <span>Xem Demo Trực Tiếp</span>
                    <ExternalLink size={16} />
                  </a>
                )}
                {project.repositoryUrl && (
                  <a
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="h-11 px-5 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md inline-flex items-center gap-2 shadow-sm border border-outline-variant/30 hover:bg-surface-container hover:text-primary active:scale-[0.98] transition-all"
                  >
                    <GithubIcon size={18} />
                    <span>Mã nguồn GitHub</span>
                  </a>
                )}
              </div>
            </div>

            {/* Right Meta Card: Tech Stack */}
            <div className="lg:col-span-4 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm">
              <span className="font-code-inline text-code-inline uppercase tracking-wider text-outline font-semibold block mb-3">
                Công nghệ áp dụng
              </span>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded bg-surface-container font-code-inline text-[13px] text-on-surface font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.metrics && (
                <div className="pt-4 border-t border-outline-variant/20">
                  <span className="text-body-sm text-outline block mb-1">
                    {project.metrics.label}
                  </span>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">
                    {project.metrics.value}
                  </span>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Optional Cover Image */}
      {project.coverImageUrl && (
        <div className="w-full max-w-[1000px] mx-auto px-margin-mobile lg:px-margin mt-10">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-surface-container shadow-md border border-outline-variant/30">
            <Image
              src={project.coverImageUrl}
              alt={project.coverImageAlt || project.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1000px) 100vw, 1000px"
            />
          </div>
        </div>
      )}

      {/* Case Study Content */}
      <section className="pt-12">
        <Container size="reading">
          <MarkdownRenderer content={project.contentMarkdown} />

          {/* Navigation back */}
          <div className="pt-12 mt-12 border-t border-outline-variant/30 flex items-center justify-between">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-label-md text-label-md text-primary font-semibold hover:text-secondary transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Quay lại danh sách dự án</span>
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-label-md text-label-md text-on-surface hover:text-primary transition-colors"
            >
              <span>Thảo luận về dự án tương tự →</span>
            </Link>
          </div>
        </Container>
      </section>
    </article>
  );
}
