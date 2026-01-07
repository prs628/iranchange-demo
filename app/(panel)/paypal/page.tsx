"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";

export default function PayPalPage() {
  const { isLoggedIn, openAuthModal } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: "basic",
      name: "اکانت پی پال پایه",
      price: "۲,۵۰۰,۰۰۰",
      description: "حساب پی پال با قابلیت دریافت و ارسال پول",
      features: [
        "دریافت و ارسال پول",
        "خرید آنلاین",
        "پشتیبانی از تمام ارزها",
        "امنیت بالا",
      ],
    },
    {
      id: "business",
      name: "اکانت پی پال تجاری",
      price: "۳,۵۰۰,۰۰۰",
      description: "حساب پی پال تجاری با امکانات پیشرفته",
      features: [
        "تمام امکانات حساب پایه",
        "دریافت پرداخت از مشتریان",
        "گزارش‌گیری پیشرفته",
        "پشتیبانی اولویت‌دار",
      ],
    },
  ];

  const handlePurchase = () => {
    if (!selectedPlan) {
      alert("لطفا نوع حساب را انتخاب کنید");
      return;
    }
    const selectedPlanData = plans.find((p) => p.id === selectedPlan);
    if (!selectedPlanData) return;
    
    const totalPrice = parseInt(selectedPlanData.price.replace(/,/g, ""));
    
    // هدایت به checkout
    const params = new URLSearchParams({
      type: "paypal",
      plan: selectedPlan,
      totalPrice: totalPrice.toString(),
    });
    window.location.href = `/checkout?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">
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
            پی پال، پول الکترونیکی
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            دریافت و ارسال پول با اکانت پی پال معتبر و قابل اعتماد
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`glass-panel rounded-2xl p-6 cursor-pointer transition-all ${
                selectedPlan === plan.id
                  ? "border-2 border-cyan-500 bg-cyan-500/10"
                  : "border border-white/10 hover:border-white/20"
              }`}
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-slate-100 mb-2">{plan.name}</h3>
                <p className="text-sm text-slate-400 mb-4">{plan.description}</p>
                <div className="text-3xl font-bold text-slate-100 mb-4">
                  {plan.price} تومان
                </div>
              </div>
              <ul className="space-y-2 mb-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-cyan-400 mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Purchase Button */}
        {selectedPlan && (
          <div className="glass-panel rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg text-slate-300 font-medium">مبلغ قابل پرداخت:</span>
              <span className="text-3xl font-bold text-slate-100">
                {plans.find((p) => p.id === selectedPlan)?.price} تومان
              </span>
            </div>
            <button
              onClick={handlePurchase}
              className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
            >
              ادامه خرید
            </button>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-8 glass-panel rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-slate-100 mb-4">چرا پی پال؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-cyan-400 text-xl">⚡</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-100 mb-1">تراکنش سریع</h3>
                <p className="text-xs text-slate-400">ارسال و دریافت پول در کمترین زمان</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-green-400 text-xl">✓</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-100 mb-1">معتبر و امن</h3>
                <p className="text-xs text-slate-400">حساب معتبر از PayPal رسمی</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-purple-400 text-xl">🌍</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-100 mb-1">استفاده جهانی</h3>
                <p className="text-xs text-slate-400">قابل استفاده در تمام نقاط جهان</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
