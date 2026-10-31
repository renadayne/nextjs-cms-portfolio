"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { contentRepo } from "@/lib/content-repository";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "", // Honeypot field
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Spam honeypot check: if filled, quietly succeed without doing anything
    if (formData.website) {
      setStatus("success");
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Vui lòng điền đầy đủ các trường thông tin bắt buộc.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      await contentRepo.sendMessage({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      setStatus("success");
      setFormData({ name: "", email: "", message: "", website: "" });
    } catch {
      setStatus("error");
      setErrorMessage("Đã có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface-container-lowest p-6 lg:p-8 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col gap-5"
    >
      <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
        Gửi tin nhắn trực tiếp
      </h3>

      {/* Honeypot hidden input */}
      <input
        type="text"
        name="website"
        value={formData.website}
        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Name Input */}
      <div>
        <label
          htmlFor="name"
          className="font-label-md text-label-md font-medium text-on-surface block mb-1.5"
        >
          Họ và tên <span className="text-error">*</span>
        </label>
        <input
          id="name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Ví dụ: Nguyễn Văn A"
          className="w-full px-4 py-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40 font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:bg-surface-container-lowest transition-all"
        />
      </div>

      {/* Email Input */}
      <div>
        <label
          htmlFor="email"
          className="font-label-md text-label-md font-medium text-on-surface block mb-1.5"
        >
          Địa chỉ Email <span className="text-error">*</span>
        </label>
        <input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="name@example.com"
          className="w-full px-4 py-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40 font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:bg-surface-container-lowest transition-all"
        />
      </div>

      {/* Message Area */}
      <div>
        <label
          htmlFor="message"
          className="font-label-md text-label-md font-medium text-on-surface block mb-1.5"
        >
          Nội dung tin nhắn <span className="text-error">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Hãy chia sẻ về dự án hoặc nội dung bạn muốn trao đổi..."
          className="w-full px-4 py-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40 font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:bg-surface-container-lowest transition-all resize-none"
        />
      </div>

      {/* Status Notifications */}
      {status === "success" && (
        <div className="p-4 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-start gap-3">
          <CheckCircle2 size={18} className="mt-0.5 text-secondary flex-shrink-0" />
          <p className="font-body-sm text-body-sm">
            Cảm ơn bạn! Tin nhắn đã được gửi thành công. Tôi sẽ phản hồi lại bạn trong thời gian sớm nhất.
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="p-4 rounded-xl bg-error-container text-on-error-container flex items-start gap-3">
          <AlertCircle size={18} className="mt-0.5 text-error flex-shrink-0" />
          <p className="font-body-sm text-body-sm">{errorMessage}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="h-11 px-6 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-secondary active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            <span>Đang gửi tin nhắn...</span>
          </>
        ) : (
          <>
            <Send size={16} />
            <span>Gửi tin nhắn ngay</span>
          </>
        )}
      </button>

      <p className="text-[12px] text-outline text-center mt-1">
        Thông tin của bạn được bảo mật tuyệt đối và chỉ dùng để trao đổi công việc.
      </p>
    </form>
  );
}
