"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";
import { contentRepo } from "@/lib/content-repository";
import { ProjectSummary } from "@/types";

export default function StudioProjectsPage() {
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await contentRepo.listProjects({ limit: 100 });
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Bạn có chắc muốn xóa dự án "${title}"?`)) {
      await contentRepo.deleteProject(id);
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
            Quản lý Dự án (Portfolio)
          </h1>
          <p className="font-body-default text-body-default text-on-surface-variant mt-1">
            Danh sách các sản phẩm và case studies hiển thị trên portfolio.
          </p>
        </div>

        <Link
          href="/studio/projects/new"
          className="h-10 px-4 rounded-lg bg-primary text-white font-label-md text-label-md inline-flex items-center gap-2 hover:bg-secondary transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Thêm dự án mới</span>
        </Link>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-12 text-center text-outline">Đang tải dữ liệu...</div>
        ) : projects.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-body-sm">
              <thead className="bg-surface-container text-on-surface-variant font-semibold">
                <tr>
                  <th className="px-5 py-3.5">Tên dự án</th>
                  <th className="px-5 py-3.5">Phân loại</th>
                  <th className="px-5 py-3.5">Vai trò & Năm</th>
                  <th className="px-5 py-3.5">Nổi bật</th>
                  <th className="px-5 py-3.5 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-5 py-4 font-medium text-on-surface">
                      <div className="font-semibold">{proj.title}</div>
                      <div className="text-[12px] font-code-inline text-outline truncate max-w-sm">
                        /projects/{proj.slug}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-0.5 rounded-full font-code-inline text-[12px] bg-surface-container uppercase">
                        {proj.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-on-surface-variant">
                      <div>{proj.role || "Developer"}</div>
                      <div className="text-[12px] text-outline">{proj.year || "2024"}</div>
                    </td>
                    <td className="px-5 py-4">
                      {proj.featured ? (
                        <span className="text-[12px] text-primary font-semibold">★ Có</span>
                      ) : (
                        <span className="text-[12px] text-outline">Không</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          href={`/projects/${proj.slug}`}
                          target="_blank"
                          className="p-1.5 rounded text-outline hover:text-primary transition-colors"
                          title="Xem trang dự án"
                        >
                          <ExternalLink size={16} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(proj.id, proj.title)}
                          className="p-1.5 rounded text-outline hover:text-error transition-colors"
                          title="Xóa dự án"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center text-outline">Chưa có dự án nào.</div>
        )}
      </div>
    </div>
  );
}
