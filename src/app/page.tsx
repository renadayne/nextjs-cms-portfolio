import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Terminal, Sparkles, MapPin, Send } from "lucide-react";
import { contentRepo } from "@/lib/content-repository";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PostCard } from "@/components/blog/PostCard";
import { ProjectCard } from "@/components/projects/ProjectCard";

export default async function HomePage() {
  const [site, featuredProjectsData, latestPostsData] = await Promise.all([
    contentRepo.getSite(),
    contentRepo.listProjects({ featured: true, limit: 3 }),
    contentRepo.listPosts({ limit: 4 }),
  ]);

  const featuredProjects = featuredProjectsData.data;
  const latestPosts = latestPostsData.data;

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Subtle ambient decorative glow */}
      <div className="relative w-full max-w-[1140px] mx-auto px-margin-mobile lg:px-margin">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[600px] h-[260px] bg-gradient-to-tr from-primary/10 via-secondary-fixed-dim/20 to-transparent blur-3xl pointer-events-none -z-10" />
      </div>

      {/* HERO SECTION */}
      <section className="w-full pt-10 pb-16 lg:pt-16 lg:pb-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Bio & CTAs */}
            <div className="lg:col-span-8 flex flex-col items-start">
              {/* Availability Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-lowest border border-outline-variant/30 shadow-sm mb-6">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
                </span>
                <span className="font-label-sm text-label-sm text-on-surface font-medium">
                  {site.availabilityStatus || "Sẵn sàng nhận dự án mới"}
                </span>
                <span className="text-outline-variant font-code-inline text-[12px]">• 2024</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-headline-lg lg:font-display-xl text-headline-lg lg:text-display-xl text-on-surface tracking-tight mb-3">
                {site.displayName}
              </h1>

              {/* Role Tags */}
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="px-3 py-1 rounded-full bg-surface-container text-primary font-code-inline text-code-inline font-medium">
                  Senior Frontend Engineer
                </span>
                <span className="text-outline-variant font-code-inline text-code-inline">/</span>
                <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                  Product Builder
                </span>
              </div>

              {/* Tagline & Short Bio */}
              <p className="font-headline-sm text-headline-sm text-on-surface font-semibold max-w-2xl mb-4 leading-snug">
                {site.tagline}
              </p>
              <p className="font-body-editorial text-body-editorial text-on-surface-variant max-w-xl mb-8 leading-relaxed">
                {site.shortBio}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/projects"
                  className="h-11 px-6 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md inline-flex items-center gap-2 shadow-sm hover:bg-secondary active:scale-[0.98] transition-all"
                >
                  <span>Xem dự án</span>
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/blog"
                  className="h-11 px-6 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md inline-flex items-center gap-2 shadow-sm border border-outline-variant/30 hover:bg-surface-container hover:text-primary active:scale-[0.98] transition-all"
                >
                  <BookOpen size={18} className="text-primary" />
                  <span>Đọc bài viết</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Portrait & Metrics Card */}
            <div className="lg:col-span-4 mt-6 lg:mt-0 flex flex-col items-center lg:items-end">
              <div className="relative w-full max-w-[340px]">
                {/* Decorative shadow layer */}
                <div className="absolute inset-0 bg-primary/10 rounded-2xl rotate-3 transform translate-x-2 translate-y-2 -z-10" />

                <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-outline-variant/30 flex flex-col gap-4">
                  <div className="relative h-64 w-full overflow-hidden rounded-xl bg-surface-container">
                    <Image
                      src={
                        site.avatarUrl ||
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
                      }
                      alt={site.displayName}
                      fill
                      priority
                      className="object-cover"
                      sizes="340px"
                    />
                    <div className="absolute bottom-3 left-3 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full text-on-surface font-code-inline text-[11px] shadow-sm flex items-center gap-1.5 border border-outline-variant/30">
                      <MapPin size={12} className="text-secondary" />
                      <span>{site.locationLabel || "Hà Nội, Việt Nam"}</span>
                    </div>
                  </div>

                  {/* Micro stats */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="p-3 rounded-xl bg-surface-container-low flex flex-col">
                      <span className="font-code-inline text-[12px] text-on-surface-variant">
                        Kinh nghiệm
                      </span>
                      <span className="font-headline-sm text-headline-sm text-primary font-bold">
                        6+ năm
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-surface-container-low flex flex-col">
                      <span className="font-code-inline text-[12px] text-on-surface-variant">
                        Sản phẩm
                      </span>
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                        18+ live
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FEATURED PROJECTS SECTION */}
      <section className="w-full py-20 bg-surface-container-low/50 border-y border-outline-variant/30">
        <Container>
          <SectionHeading
            eyebrow="Portfolio Highlights"
            title="Dự án tiêu biểu"
            description="Tuyển tập các sản phẩm, ứng dụng web và công cụ mã nguồn mở được tối ưu hiệu năng."
            action={
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary hover:text-secondary font-semibold group transition-colors"
              >
                <span>Xem tất cả dự án</span>
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                featured={index === 0}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* LATEST BLOG POSTS SECTION */}
      <section className="w-full py-20">
        <Container>
          <SectionHeading
            eyebrow="Tech & Life Journal"
            title="Bài viết mới nhất"
            description="Chia sẻ kinh nghiệm kiến trúc frontend, phân tích giải pháp kỹ thuật và suy ngẫm làm nghề."
            action={
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary hover:text-secondary font-semibold group transition-colors"
              >
                <span>Đọc toàn bộ blog</span>
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {latestPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </Container>
      </section>

      {/* ABOUT & SKILLS TEASER */}
      <section className="w-full py-20 bg-surface-container-low/40 border-t border-outline-variant/30">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="flex items-center gap-2 text-primary font-code-inline text-code-inline font-medium uppercase tracking-wider mb-2">
                <Terminal size={16} />
                <span>Về bản thân & Triết lý</span>
              </div>
              <h2 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight mb-4">
                Theo đuổi sự tĩnh lặng và chuẩn mực kỹ thuật
              </h2>
              <p className="font-body-default text-body-default text-on-surface-variant leading-relaxed mb-6">
                Tôi tin rằng code không chỉ để máy tính thực thi, mà là phương tiện giao tiếp giữa con người. Một giao diện tốt không cần phải phô trương, mà là sự mượt mà trong từng tương tác nhỏ nhất và tôn trọng tuyệt đối thời gian của người dùng.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-label-md text-label-md text-primary font-semibold hover:text-secondary transition-colors"
              >
                <span>Đọc thêm về hành trình & kinh nghiệm</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="lg:col-span-6 bg-surface-container-lowest p-6 lg:p-8 rounded-2xl border border-outline-variant/30 shadow-sm">
              <span className="font-code-inline text-code-inline uppercase tracking-wider text-outline font-semibold block mb-4">
                Công nghệ cốt lõi
              </span>
              <div className="space-y-4">
                {site.skills.map((group) => (
                  <div key={group.category}>
                    <span className="text-body-sm font-semibold text-on-surface block mb-2">
                      {group.category}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-md bg-surface-container font-code-inline text-[13px] text-on-surface-variant"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CONTACT CTA BANNER */}
      <section className="w-full py-20">
        <Container>
          <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 lg:p-14 text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="relative z-10 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-label-sm font-medium mb-4">
                <Sparkles size={14} />
                <span>Hợp tác & Kết nối</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg font-bold text-white tracking-tight mb-3">
                Bạn có ý tưởng dự án hoặc muốn trao đổi chuyên môn?
              </h2>
              <p className="font-body-default text-white/90 leading-relaxed">
                Tôi luôn hào hứng với các dự án web đòi hỏi tính thách thức kỹ thuật cao hoặc cơ hội chia sẻ cùng cộng đồng lập trình.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="h-12 px-7 rounded-xl bg-white text-primary font-label-md text-label-md font-semibold inline-flex items-center justify-center gap-2 shadow-md hover:bg-surface-container-lowest active:scale-95 transition-all"
              >
                <Send size={18} />
                <span>Gửi tin nhắn</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
