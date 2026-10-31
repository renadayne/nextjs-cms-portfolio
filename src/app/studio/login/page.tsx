"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, ArrowRight, ShieldCheck } from "lucide-react";

export default function StudioLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      router.push("/studio");
    } else {
      setError("Tài khoản hoặc mật khẩu không chính xác (Mặc định: admin / admin123)");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-surface">
      <div className="w-full max-w-md bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/30 shadow-lg">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-primary-container text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
            <Lock size={22} />
          </div>
          <h1 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">
            Đăng nhập Studio
          </h1>
          <p className="font-body-default text-body-default text-on-surface-variant mt-1">
            Cổng quản trị nội dung website cá nhân
          </p>
        </div>

        {error && (
          <div className="p-3 mb-5 rounded-xl bg-error-container text-on-error-container text-body-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="font-label-md text-label-md font-medium text-on-surface block mb-1.5">
              Tên tài khoản
            </label>
            <div className="relative">
              <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary transition-all"
              />
            </div>
          </div>

          <div>
            <label className="font-label-md text-label-md font-medium text-on-surface block mb-1.5">
              Mật khẩu
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 h-11 px-5 rounded-lg bg-primary text-white font-label-md text-label-md font-semibold hover:bg-secondary active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Đăng nhập</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-outline-variant/20 flex items-center justify-center gap-2 text-[12px] font-code-inline text-outline">
          <ShieldCheck size={14} className="text-secondary" />
          <span>Demo Account: admin / admin123</span>
        </div>
      </div>
    </div>
  );
}
