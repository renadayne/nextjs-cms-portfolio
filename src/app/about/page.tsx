import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { MapPin, Mail, Briefcase, Award, Send, ArrowRight } from "lucide-react";
import { contentRepo } from "@/lib/content-repository";
import { Container } from "@/components/ui/Container";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";

export const metadata: Metadata = {
  title: "Giới thiệu — Nguyễn Minh Quân",
  description:
    "Hành trình 6+ năm phát triển phần mềm, triết lý xây dựng sản phẩm và các kỹ năng chuyên môn của Nguyễn Minh Quân.",
};

export default async function AboutPage() {
  const site = await contentRepo.getSite();

  const timeline = [
    {
      period: "2022 – Hiện tại",
      role: "Senior Frontend Engineer / Tech Lead",
      company: "Tech Solutions Corp",
      description:
        "Dẫn dắt kiến trúc giao diện cho nền tảng SaaS phục vụ khách hàng doanh nghiệp quốc tế. Tối ưu Core Web Vitals, xây dựng Design System và cố vấn kỹ thuật cho hơn 10 kỹ sư frontend.",
    },
    {
      period: "2020 – 2022",
      role: "Frontend Engineer",
      company: "Digital Product Studio",
      description:
        "Phát triển các ứng dụng Next.js, React Native và tích hợp GraphQL API. Trực tiếp làm việc với Product Manager và UI/UX Designer để hiện thực hóa các tương tác phức tạp.",
    },
    {
      period: "2018 – 2020",
      role: "Junior Web Developer",
      company: "Software Agency",
      description:
        "Khởi đầu sự nghiệp với việc xây dựng các website thương mại điện tử, landing pages hiệu năng cao với JavaScript hiện đại và REST APIs.",
    },
  ];

  return (
    <div className="w-full pb-24">
      {/* Top Profile Hero */}
      <section className="pt-12 pb-14 bg-surface-container-low/40 border-b border-outline-variant/30">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Avatar & Card */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
              <div className="relative w-48 h-48 lg:w-60 lg:h-60 rounded-3xl overflow-hidden border-2 border-outline-variant/50 shadow-md bg-surface-container">
                <Image
                  src={
                    site.avatarUrl ||
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
                  }
                  alt={site.displayName}
                  fill
                  priority
                  className="object-cover"
                  sizes="240px"
                />
              </div>
              <div className="mt-4 flex flex-col items-center lg:items-start gap-1">
                <div className="flex items-center gap-1.5 text-body-sm text-outline">
                  <MapPin size={15} className="text-secondary" />
                  <span>{site.locationLabel || "Hà Nội, Việt Nam"}</span>
                </div>
                {site.contactEmail && (
                  <a
                    href={`mailto:${site.contactEmail}`}
                    className="flex items-center gap-1.5 text-body-sm text-primary hover:underline"
                  >
                    <Mail size={15} />
                    <span>{site.contactEmail}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Title & Headline */}
            <div className="lg:col-span-8">
              <span className="text-primary font-code-inline text-code-inline uppercase tracking-wider font-semibold block mb-2">
                Hành trình & Triết lý
              </span>
              <h1 className="font-headline-lg lg:font-display-xl text-headline-lg text-on-surface font-bold tracking-tight mb-3">
                {site.displayName}
              </h1>
              <p className="font-headline-sm text-headline-sm text-primary font-semibold mb-4">
                {site.role}
              </p>
              <p className="font-body-editorial text-body-editorial text-on-surface-variant leading-relaxed mb-6">
                {site.tagline}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="h-11 px-6 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md inline-flex items-center gap-2 shadow-sm hover:bg-secondary transition-all"
                >
                  <Send size={16} />
                  <span>Liên hệ trao đổi</span>
                </Link>
                <Link
                  href="/projects"
                  className="h-11 px-6 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md inline-flex items-center gap-2 shadow-sm border border-outline-variant/30 hover:bg-surface-container hover:text-primary transition-all"
                >
                  <span>Xem các sản phẩm đã làm</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Narrative & Bio */}
      <section className="pt-14 pb-12">
        <Container size="reading">
          <MarkdownRenderer content={site.aboutMarkdown} />
        </Container>
      </section>

      {/* Experience Timeline */}
      <section className="py-16 bg-surface-container-low/30 border-y border-outline-variant/30">
        <Container size="reading">
          <div className="flex items-center gap-2 text-primary font-code-inline text-code-inline uppercase tracking-wider mb-2">
            <Briefcase size={16} />
            <span>Kinh nghiệm làm việc</span>
          </div>
          <h2 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight mb-8">
            Các mốc sự nghiệp đã qua
          </h2>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-outline-variant/50">
            {timeline.map((item) => (
              <div key={item.period} className="relative flex items-start gap-6 pl-2">
                <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-surface-container-lowest mt-1.5 flex-shrink-0 z-10" />
                <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <h3 className="font-headline-sm text-[18px] text-on-surface font-bold">
                      {item.role}
                    </h3>
                    <span className="font-code-inline text-[12px] text-primary px-2.5 py-0.5 rounded-full bg-primary-fixed">
                      {item.period}
                    </span>
                  </div>
                  <span className="font-label-md text-label-md text-outline font-medium block mb-3">
                    {item.company}
                  </span>
                  <p className="font-body-default text-body-default text-on-surface-variant leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Skills & Tooling Grid */}
      <section className="pt-16">
        <Container size="reading">
          <div className="flex items-center gap-2 text-primary font-code-inline text-code-inline uppercase tracking-wider mb-2">
            <Award size={16} />
            <span>Năng lực chuyên môn</span>
          </div>
          <h2 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight mb-8">
            Công nghệ & Kỹ năng thành thạo
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {site.skills.map((group) => (
              <div
                key={group.category}
                className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm"
              >
                <h3 className="font-label-md text-label-md font-bold text-on-surface uppercase tracking-wider mb-4">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg bg-surface-container font-code-inline text-[13px] text-on-surface-variant font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
