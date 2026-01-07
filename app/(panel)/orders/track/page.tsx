"use client";

import Link from "next/link";
import { useState } from "react";

export default function TrackOrdersPage() {
  const [orderId, setOrderId] = useState("");
  const [searching, setSearching] = useState(false);

  const handleSearch = () => {
    if (!orderId.trim()) {
      alert("لطفا شماره سفارش را وارد کنید");
      return;
    }
    setSearching(true);
    // در آینده اینجا API call می‌شود
    setTimeout(() => {
      setSearching(false);
      alert("سفارش پیدا نشد. لطفا شماره سفارش را بررسی کنید.");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 mb-6 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            بازگشت به صفحه اصلی
          </Link>
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-100">
              وضعیت سفارش من کجاست؟
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
              با وارد کردن کد پیگیری، می‌توانید ببینید سفارش‌تان در چه مرحله‌ای است؛
              از ثبت و پرداخت تا آماده‌سازی و تحویل. این صفحه فقط برای نمایش وضعیت است
              و تغییری در سفارش ایجاد نمی‌کند.
            </p>
          </div>
        </div>

        {/* Search Box */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                شماره سفارش
              </label>
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="مثال: ORD-123456"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={searching}
              className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {searching ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  در حال جستجو...
                </span>
              ) : (
                "جستجو"
              )}
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-100 mb-6">
            چه اطلاعاتی در این صفحه می‌بینید؟
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-xl bg-white/5 border border-white/10 p-4 flex flex-col gap-2">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/15 text-cyan-300 flex items-center justify-center text-lg">
                ۱
              </div>
              <p className="text-sm text-slate-200 font-medium">
                مرحله فعلی سفارش
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                مثل «در حال بررسی»، «در حال آماده‌سازی» یا «تکمیل شده» همراه با زمان آخرین به‌روزرسانی.
              </p>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-4 flex flex-col gap-2">
              <div className="w-9 h-9 rounded-lg bg-purple-500/15 text-purple-300 flex items-center justify-center text-lg">
                ۲
              </div>
              <p className="text-sm text-slate-200 font-medium">
                جزئیات پرداخت و محصولات
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                مبلغ سفارش، روش پرداخت و لیست محصولاتی که برای این سفارش ثبت کرده‌اید.
              </p>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-4 flex flex-col gap-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/15 text-emerald-300 flex items-center justify-center text-lg">
                ۳
              </div>
              <p className="text-sm text-slate-200 font-medium">
                راه‌های ارتباط با پشتیبانی
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                اگر وضعیت سفارش مبهم بود یا مشکلی داشتید، از همین‌جا می‌توانید راه ارتباط با تیم پشتیبانی را ببینید.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
