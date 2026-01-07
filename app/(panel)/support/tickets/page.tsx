"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";

export default function SupportTicketsPage() {
  const { isLoggedIn, openAuthModal } = useAuth();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("general");
  const [submitting, setSubmitting] = useState(false);

  const categories = [
    { value: "general", label: "عمومی" },
    { value: "payment", label: "پرداخت" },
    { value: "order", label: "سفارش" },
    { value: "technical", label: "فنی" },
    { value: "other", label: "سایر" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      openAuthModal();
      return;
    }
    if (!subject.trim() || !message.trim()) {
      alert("لطفا تمام فیلدها را پر کنید");
      return;
    }
    setSubmitting(true);
    // در آینده اینجا API call می‌شود
    setTimeout(() => {
      setSubmitting(false);
      alert("تیکت شما با موفقیت ثبت شد. به زودی با شما تماس خواهیم گرفت.");
      setSubject("");
      setMessage("");
      setCategory("general");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 mb-6 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            بازگشت به صفحه اصلی
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-3">
            پشتیبانی و تیکت
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            در صورت وجود هرگونه سوال یا مشکل، تیکت پشتیبانی ثبت کنید
          </p>
        </div>

        {/* Ticket Form */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                دسته‌بندی
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                موضوع
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="موضوع تیکت را وارد کنید"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                پیام
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="متن پیام خود را وارد کنید"
                rows={6}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  در حال ارسال...
                </span>
              ) : (
                "ثبت تیکت"
              )}
            </button>
          </form>
        </div>

        {/* Info Section */}
        <div className="mt-8 glass-panel rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-slate-100 mb-4">اطلاعات تماس</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-cyan-400 text-xl">💬</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-100 mb-1">پشتیبانی آنلاین</h3>
                <p className="text-xs text-slate-400">پاسخگویی 24 ساعته از طریق تیکت</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-green-400 text-xl">⏱️</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-100 mb-1">زمان پاسخ</h3>
                <p className="text-xs text-slate-400">حداکثر 24 ساعت کاری</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
