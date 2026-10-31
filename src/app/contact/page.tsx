import React from "react";
import { Metadata } from "next";
import { Mail, MessageSquare, Clock, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/Icons";
import { contentRepo } from "@/lib/content-repository";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Liên hệ — Nguyễn Minh Quân",
  description:
    "Kết nối với Nguyễn Minh Quân để thảo luận về dự án công nghệ, tư vấn giải pháp frontend hoặc cơ hội hợp tác.",
};

export default async function ContactPage() {
  const site = await contentRepo.getSite();

  return (
    <div className="w-full pb-24">
      {/* Header Section */}
      <section className="pt-12 pb-12 bg-surface-container-low/40 border-b border-outline-variant/30">
        <Container>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
              <span className="font-code-inline text-code-inline uppercase tracking-widest text-primary font-medium">
                Kết nối &amp; Hợp tác
              </span>
            </div>
            <h1 className="font-headline-lg lg:font-display-xl text-headline-lg text-on-surface font-bold tracking-tight mb-3">
              Liên hệ với tôi
            </h1>
            <p className="font-body-editorial text-body-editorial text-on-surface-variant leading-relaxed">
              Bạn đang tìm kiếm một kỹ sư giao diện giải quyết các bài toán hiệu năng phức tạp, hay muốn trò chuyện về công nghệ? Hãy gửi tin nhắn cho tôi.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content: Form & Direct Channels */}
      <section className="pt-12">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Direct Info & Social Channels */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col gap-4">
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Thông tin kết nối
                </h3>

                <div className="flex flex-col gap-4 pt-2">
                  <div className="flex items-start gap-3 text-body-default">
                    <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                      <Mail size={18} />
                    </div>
                    <div>
                      <span className="font-label-md text-label-md text-outline block">Email cá nhân</span>
                      <a
                        href={`mailto:${site.contactEmail || "quan.nguyen@example.com"}`}
                        className="font-medium text-on-surface hover:text-primary transition-colors"
                      >
                        {site.contactEmail || "quan.nguyen@example.com"}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-body-default">
                    <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-secondary flex-shrink-0 mt-0.5">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <span className="font-label-md text-label-md text-outline block">Vị trí hiện tại</span>
                      <span className="font-medium text-on-surface">
                        {site.locationLabel || "Hà Nội, Việt Nam (UTC+7)"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-body-default">
                    <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-outline flex-shrink-0 mt-0.5">
                      <Clock size={18} />
                    </div>
                    <div>
                      <span className="font-label-md text-label-md text-outline block">Thời gian phản hồi</span>
                      <span className="font-medium text-on-surface">
                        Thường trong vòng 24 – 48 giờ làm việc
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm">
                <h4 className="font-label-md text-label-md font-bold text-on-surface uppercase tracking-wider mb-4">
                  Mạng xã hội &amp; Mã nguồn
                </h4>
                <div className="flex flex-col gap-2.5">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-between text-on-surface transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <GithubIcon size={18} />
                      <span className="font-label-md text-label-md font-medium">GitHub Profile</span>
                    </div>
                    <span className="font-code-inline text-[12px] text-outline">@nguyenminhquan</span>
                  </a>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-between text-on-surface transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <LinkedinIcon size={18} className="text-secondary" />
                      <span className="font-label-md text-label-md font-medium">LinkedIn Network</span>
                    </div>
                    <span className="font-code-inline text-[12px] text-outline">in/minhquan</span>
                  </a>

                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-between text-on-surface transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <TwitterIcon size={18} className="text-primary" />
                      <span className="font-label-md text-label-md font-medium">Twitter / X</span>
                    </div>
                    <span className="font-code-inline text-[12px] text-outline">@quan_dev</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
