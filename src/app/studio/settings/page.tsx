"use client";

import React, { useEffect, useState } from "react";
import { Save, CheckCircle2 } from "lucide-react";
import { contentRepo } from "@/lib/content-repository";
import { SiteSettings } from "@/types";

export default function StudioSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const data = await contentRepo.getSite();
        setSettings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    try {
      await contentRepo.updateSite(settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
      alert("Đã xảy ra lỗi khi lưu cài đặt.");
    }
  };

  if (loading || !settings) {
    return <div className="py-20 text-center text-outline">Đang tải cài đặt...</div>;
  }

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/30">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
            Cài đặt Website & Hồ sơ
          </h1>
          <p className="font-body-default text-body-default text-on-surface-variant mt-1">
            Tùy biến tên tác giả, tiểu sử, tiêu đề SEO và thông tin liên hệ.
          </p>
        </div>

        <button
          type="submit"
          className="h-10 px-5 rounded-lg bg-primary text-white text-body-sm font-semibold hover:bg-secondary transition-colors inline-flex items-center gap-2 shadow-sm self-start sm:self-auto"
        >
          <Save size={16} />
          <span>Lưu thay đổi</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center gap-2">
          <CheckCircle2 size={18} className="text-secondary" />
          <span className="font-body-sm font-medium">Đã cập nhật cài đặt thành công!</span>
        </div>
      )}

      {/* General Profile Section */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 flex flex-col gap-5">
        <h2 className="font-headline-sm text-[18px] font-bold text-on-surface">
          Thông tin hiển thị chính
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-label-md text-label-md font-semibold text-on-surface block mb-1.5">
              Tên hiển thị (Display Name)
            </label>
            <input
              type="text"
              required
              value={settings.displayName}
              onChange={(e) => setSettings({ ...settings, displayName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40 text-body-sm text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="font-label-md text-label-md font-semibold text-on-surface block mb-1.5">
              Chức danh / Vai trò (Role)
            </label>
            <input
              type="text"
              required
              value={settings.role}
              onChange={(e) => setSettings({ ...settings, role: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40 text-body-sm text-on-surface focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div>
          <label className="font-label-md text-label-md font-semibold text-on-surface block mb-1.5">
            Khẩu hiệu (Tagline)
          </label>
          <input
            type="text"
            value={settings.tagline}
            onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40 text-body-sm text-on-surface focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="font-label-md text-label-md font-semibold text-on-surface block mb-1.5">
            Tiểu sử ngắn (Short Bio trên Hero)
          </label>
          <textarea
            rows={3}
            value={settings.shortBio}
            onChange={(e) => setSettings({ ...settings, shortBio: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40 text-body-sm text-on-surface focus:outline-none focus:border-primary resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="font-label-md text-label-md font-semibold text-on-surface block mb-1.5">
              Địa điểm (Location)
            </label>
            <input
              type="text"
              value={settings.locationLabel || ""}
              onChange={(e) => setSettings({ ...settings, locationLabel: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40 text-body-sm text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="font-label-md text-label-md font-semibold text-on-surface block mb-1.5">
              Email liên hệ
            </label>
            <input
              type="email"
              value={settings.contactEmail || ""}
              onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40 text-body-sm text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="font-label-md text-label-md font-semibold text-on-surface block mb-1.5">
              Trạng thái (Availability)
            </label>
            <input
              type="text"
              value={settings.availabilityStatus || ""}
              onChange={(e) => setSettings({ ...settings, availabilityStatus: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40 text-body-sm text-on-surface focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* SEO Section */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 flex flex-col gap-5">
        <h2 className="font-headline-sm text-[18px] font-bold text-on-surface">
          Cấu hình Tìm kiếm (SEO Defaults)
        </h2>

        <div>
          <label className="font-label-md text-label-md font-semibold text-on-surface block mb-1.5">
            Tiêu đề SEO mặc định (SEO Title)
          </label>
          <input
            type="text"
            value={settings.seoTitle || ""}
            onChange={(e) => setSettings({ ...settings, seoTitle: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40 text-body-sm text-on-surface focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="font-label-md text-label-md font-semibold text-on-surface block mb-1.5">
            Mô tả SEO mặc định (SEO Description)
          </label>
          <textarea
            rows={3}
            value={settings.seoDescription || ""}
            onChange={(e) => setSettings({ ...settings, seoDescription: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40 text-body-sm text-on-surface focus:outline-none focus:border-primary resize-none"
          />
        </div>
      </div>
    </form>
  );
}
