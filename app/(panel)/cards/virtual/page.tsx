"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";

export default function VirtualCardsPage() {
  const { isLoggedIn, openAuthModal } = useAuth();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const cardTypes = [
    {
      id: "visa-virtual",
      name: "ویزا کارت مجازی",
      icon: "💳",
      price: "۱,۲۰۰,۰۰۰",
      description: "کارت مجازی Visa برای خریدهای آنلاین و پرداخت‌های بین‌المللی",
      features: [
        "قابل استفاده در تمام سایت‌های آنلاین",
        "پرداخت امن و سریع",
        "بدون نیاز به کارت فیزیکی",
        "تحویل فوری و آنی",
      ],
    },
    {
      id: "mastercard-virtual",
      name: "مسترکارت مجازی",
      icon: "💳",
      price: "۱,۲۰۰,۰۰۰",
      description: "کارت مجازی Mastercard برای تراکنش‌های آنلاین",
      features: [
        "قابل استفاده در تمام پلتفرم‌ها",
        "امنیت بالا",
        "بدون نیاز به کارت فیزیکی",
        "تحویل فوری و آنی",
      ],
    },
  ];

  // تابع helper برای parse کردن اعداد فارسی و انگلیسی با کاما
  const parsePrice = (priceStr: string): number => {
    // تبدیل اعداد فارسی به انگلیسی
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    const englishDigits = "0123456789";
    let persianToEnglish = priceStr;
    for (let i = 0; i < persianDigits.length; i++) {
      persianToEnglish = persianToEnglish.replace(new RegExp(persianDigits[i], "g"), englishDigits[i]);
    }
    // حذف کاما و فاصله
    const cleaned = persianToEnglish.replace(/,/g, "").replace(/\s/g, "").trim();
    const parsed = parseInt(cleaned, 10);
    return isNaN(parsed) ? 0 : parsed;
  };

  const handlePurchase = () => {
    if (!selectedCard) {
      alert("لطفا نوع کارت را انتخاب کنید");
      return;
    }
    const selectedCardData = cardTypes.find((c) => c.id === selectedCard);
    if (!selectedCardData) return;
    
    const pricePerCard = parsePrice(selectedCardData.price);
    const totalPrice = pricePerCard * quantity;
    
    // هدایت به checkout
    const params = new URLSearchParams({
      type: "card",
      cardType: selectedCard,
      quantity: quantity.toString(),
      price: pricePerCard.toString(),
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
            ویزا کارت و مسترکارت مجازی
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            دریافت کارت مجازی برای خریدهای آنلاین و پرداخت‌های بین‌المللی
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {cardTypes.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelectedCard(card.id)}
              className={`glass-panel rounded-2xl p-6 cursor-pointer transition-all ${
                selectedCard === card.id
                  ? "border-2 border-cyan-500 bg-cyan-500/10"
                  : "border border-white/10 hover:border-white/20"
              }`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  <span className="text-3xl">{card.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-100 mb-2">{card.name}</h3>
                  <p className="text-sm text-slate-400 mb-4">{card.description}</p>
                  <div className="text-2xl font-bold text-slate-100 mb-4">
                    {card.price} تومان
                  </div>
                </div>
              </div>
              <ul className="space-y-2 mb-4">
                {card.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-cyan-400 mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Quantity Selection */}
        {selectedCard && (
          <div className="glass-panel rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-slate-100 mb-4">تعداد کارت</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-200 hover:bg-white/10 transition-colors"
              >
                −
              </button>
              <span className="text-2xl font-semibold text-slate-100 min-w-[3rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-200 hover:bg-white/10 transition-colors"
              >
                +
              </button>
              <span className="text-sm text-slate-400 mr-auto">عدد کارت</span>
            </div>
          </div>
        )}

        {/* Purchase Button */}
        {selectedCard && (
          <div className="glass-panel rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg text-slate-300 font-medium">جمع کل:</span>
              <span className="text-3xl font-bold text-slate-100">
                {(parseInt(cardTypes.find((c) => c.id === selectedCard)?.price.replace(/,/g, "") || "0") * quantity).toLocaleString("fa-IR")} تومان
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
          <h2 className="text-xl font-semibold text-slate-100 mb-4">مزایای کارت مجازی</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-cyan-400 text-xl">⚡</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-100 mb-1">تحویل فوری</h3>
                <p className="text-xs text-slate-400">کارت مجازی به صورت آنی و خودکار تحویل داده می‌شود</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-green-400 text-xl">🔒</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-100 mb-1">امنیت بالا</h3>
                <p className="text-xs text-slate-400">امنیت کامل برای تراکنش‌های آنلاین</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-purple-400 text-xl">🌍</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-100 mb-1">استفاده جهانی</h3>
                <p className="text-xs text-slate-400">قابل استفاده در تمام سایت‌های بین‌المللی</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
