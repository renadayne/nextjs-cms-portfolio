import React from "react";
import { Metadata } from "next";
import { contentRepo } from "@/lib/content-repository";
import { ProjectsCatalog } from "@/components/projects/ProjectsCatalog";

export const metadata: Metadata = {
  title: "Dự án đã thực hiện — Portfolio",
  description:
    "Tuyển tập các sản phẩm, ứng dụng web và công cụ mã nguồn mở được thiết kế và phát triển bởi Nguyễn Minh Quân.",
};

export default async function ProjectsPage() {
  const projectsData = await contentRepo.listProjects({ limit: 50 });

  return <ProjectsCatalog initialProjects={projectsData.data} />;
}
