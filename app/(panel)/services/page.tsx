"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";

// All services data
const allServices = [
  {
    id: 1,
    title: "اکانت پی پال با حساب بانکی",
    price: "۲,۵۰۰,۰۰۰ تومان",
    badge: "پیشنهاد ویژه",
    icon: "💳",
    href: "/paypal",
    description: "دریافت و ارسال پول با اکانت پی پال معتبر و قابل اعتماد",
  },
  {
    id: 2,
    title: "ویزا کارت مجازی",
    price: "۱,۲۰۰,۰۰۰ تومان",
    badge: null,
    icon: "💳",
    href: "/cards/virtual",
    description: "ویزا کارت مجازی برای خرید آنلاین و پرداخت‌های بین‌المللی",
  },
  {
    id: 3,
    title: "مسترکارت فیزیکی",
    price: "۳,۰۰۰,۰۰۰ تومان",
    badge: null,
    icon: "💳",
    href: "/cards/physical",
    description: "مسترکارت فیزیکی برای استفاده در تمام نقاط جهان",
  },
  {
    id: 4,
    title: "گیفت کارت آمازون",
    price: "۵۰۰,۰۰۰ تومان",
    badge: null,
    icon: "📦",
    href: "/gift-cards/amazon",
    description: "گیفت کارت آمازون برای خرید از Amazon.com",
  },
  {
    id: 5,
    title: "پرداخت خارجی",
    price: "متغیر",
    badge: null,
    icon: "🌍",
    href: "/international-payments",
    description: "پرداخت و دریافت پول از خارج از کشور",
  },
  {
    id: 6,
    title: "خرید و تحویل در ایران",
    price: "متغیر",
    badge: null,
    icon: "📦",
    href: "/buy-deliver-iran",
    description: "خرید کالا از خارج و تحویل در ایران",
  },
  {
    id: 7,
    title: "نقد کردن",
    price: "متغیر",
    badge: null,
    icon: "💰",
    href: "/services/cashout",
    description: "نقد کردن موجودی حساب‌های مختلف",
  },
];

export default function ServicesPage() {
  const { isLoggedIn, openAuthModal } = useAuth();

  const handleServiceClick = (href: string) => {
    if (!isLoggedIn) {
      openAuthModal();
      return;
    }
    window.location.href = href;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
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
            سرویس های پیشنهادی
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            مشاهده و خرید تمام سرویس‌های ما
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {allServices.map((service) => (
            <div
              key={service.id}
              onClick={() => handleServiceClick(service.href)}
              className="glass-panel rounded-2xl p-6 hover:shadow-xl transition-all cursor-pointer group hover:-translate-y-1 hover:border-white/20"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                  <span className="text-2xl">{service.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className="text-base font-semibold text-slate-100 group-hover:text-white transition-colors">
                      {service.title}
                    </h3>
                    {service.badge && (
                      <span className="px-2 py-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-medium rounded-full whitespace-nowrap">
                        {service.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-lg font-semibold text-slate-100 mb-2">{service.price}</p>
                  <p className="text-sm text-slate-400 line-clamp-2">{service.description}</p>
                </div>
              </div>
              <button className="w-full px-4 py-2.5 text-sm font-medium text-slate-200 border border-white/10 rounded-lg hover:bg-white/5 transition-colors backdrop-blur-sm group-hover:border-cyan-500/50 group-hover:text-cyan-400">
                مشاهده و خرید
              </button>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 glass-panel rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-100 mb-4">
            چرا از سرویس‌های ما استفاده کنید؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-cyan-400 text-xl">⚡</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-100 mb-1">
                  تحویل سریع
                </h3>
                <p className="text-xs text-slate-400">
                  تمامی سرویس‌ها به صورت آنی و خودکار تحویل داده می‌شوند
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-green-400 text-xl">✓</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-100 mb-1">
                  معتبر و قابل اعتماد
                </h3>
                <p className="text-xs text-slate-400">
                  همه سرویس‌ها از منابع معتبر و رسمی تهیه می‌شوند
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-purple-400 text-xl">💬</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-100 mb-1">
                  پشتیبانی 24/7
                </h3>
                <p className="text-xs text-slate-400">
                  تیم پشتیبانی ما همیشه آماده کمک به شماست
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


