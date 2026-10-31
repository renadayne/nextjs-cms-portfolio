"use client";

import React, { useEffect, useState } from "react";
import { Mail, Check, Trash2, Clock, CheckCheck, RefreshCw } from "lucide-react";
import { contentRepo } from "@/lib/content-repository";
import { ContactMessage } from "@/types";
import { formatDate } from "@/lib/utils";

export default function StudioMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const msgs = await contentRepo.listMessages();
      setMessages(msgs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleToggleRead = async (id: string, currentRead: boolean) => {
    await contentRepo.markMessageRead(id, !currentRead);
    setMessages(
      messages.map((m) => (m.id === id ? { ...m, isRead: !currentRead } : m))
    );
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa tin nhắn này?")) {
      await contentRepo.deleteMessage(id);
      setMessages(messages.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
            Hộp thư Liên hệ (Inbox)
          </h1>
          <p className="font-body-default text-body-default text-on-surface-variant mt-1">
            Quản lý và phản hồi các tin nhắn của nhà tuyển dụng và độc giả.
          </p>
        </div>

        <button
          type="button"
          onClick={loadMessages}
          className="h-10 px-4 rounded-lg bg-surface-container-lowest border border-outline-variant/30 text-on-surface text-body-sm font-medium hover:bg-surface-container transition-colors inline-flex items-center gap-2 shadow-sm self-start sm:self-auto"
        >
          <RefreshCw size={15} />
          <span>Làm mới</span>
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {loading ? (
          <div className="py-16 text-center text-outline">Đang nạp tin nhắn...</div>
        ) : messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-6 rounded-2xl border transition-all ${
                msg.isRead
                  ? "bg-surface-container-lowest border-outline-variant/30"
                  : "bg-surface-container-low border-primary/40 shadow-sm"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${
                      msg.isRead
                        ? "bg-surface-container text-outline"
                        : "bg-primary text-white"
                    }`}
                  >
                    {msg.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <span className="font-headline-sm text-[16px] font-bold text-on-surface block leading-tight">
                      {msg.name}
                    </span>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-[13px] font-code-inline text-primary hover:underline"
                    >
                      {msg.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[12px] font-code-inline text-outline flex items-center gap-1">
                    <Clock size={12} />
                    <span>{formatDate(msg.createdAt)}</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => handleToggleRead(msg.id, msg.isRead)}
                    className="p-1.5 rounded-lg text-outline hover:text-primary hover:bg-surface-container transition-colors"
                    title={msg.isRead ? "Đánh dấu chưa đọc" : "Đánh dấu đã đọc"}
                  >
                    {msg.isRead ? <CheckCheck size={18} /> : <Check size={18} />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(msg.id)}
                    className="p-1.5 rounded-lg text-outline hover:text-error hover:bg-error-container/20 transition-colors"
                    title="Xóa tin nhắn"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="bg-surface-container-lowest/80 p-4 rounded-xl border border-outline-variant/20 font-body-default text-body-default text-on-surface whitespace-pre-line leading-relaxed">
                {msg.message}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-surface-container-lowest p-16 rounded-2xl border border-outline-variant/30 text-center text-outline">
            Chưa có tin nhắn nào được gửi đến.
          </div>
        )}
      </div>
    </div>
  );
}
