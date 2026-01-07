"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { logout, getSessionUser } from "@/lib/auth";

type AdminTopBarProps = {
  onMenuClick: () => void;
};

export default function AdminTopBar({ onMenuClick }: AdminTopBarProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const router = useRouter();
  const user = typeof window !== "undefined" ? getSessionUser() : null;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-10 glass-panel border-b border-white/10 backdrop-blur-xl">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Menu Button + Search */}
          <div className="flex items-center gap-4 flex-1">
            {/* Mobile Menu Button */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 text-slate-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-md">
              <div className="relative w-full">
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="جستجو..."
                  className="w-full pr-10 pl-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                />
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 text-slate-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {notificationsOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setNotificationsOpen(false)}
                  />
                  <div className="absolute left-0 top-full mt-2 w-80 glass-panel rounded-xl shadow-2xl border border-white/10 p-4 z-20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-slate-100">اعلان‌ها</h3>
                      <button className="text-xs text-cyan-400 hover:text-cyan-300">مشاهده همه</button>
                    </div>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                        <p className="text-sm text-slate-200">سفارش جدید دریافت شد</p>
                        <p className="text-xs text-slate-400 mt-1">۲ دقیقه پیش</p>
                      </div>
                      <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                        <p className="text-sm text-slate-200">پرداخت موفقیت‌آمیز بود</p>
                        <p className="text-xs text-slate-400 mt-1">۱۵ دقیقه پیش</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-3">
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-slate-100">{user?.name || "مدیر سیستم"}</p>
                <p className="text-xs text-slate-400">{user?.email || "admin@example.com"}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-semibold">{user?.name?.[0] || "م"}</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                خروج
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

