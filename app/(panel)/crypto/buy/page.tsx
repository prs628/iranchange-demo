"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import Link from "next/link";

type CryptoCurrency = {
  symbol: string;
  name: string;
  icon: string;
  price: string; // قیمت به تومان
  change: string; // تغییرات درصدی
  minAmount: number; // حداقل خرید (دلار)
};

const cryptocurrencies: CryptoCurrency[] = [
  {
    symbol: "BTC",
    name: "بیت کوین",
    icon: "₿",
    price: "۱۲,۵۰۰,۰۰۰,۰۰۰",
    change: "+۲.۴%",
    minAmount: 10,
  },
  {
    symbol: "ETH",
    name: "اتریوم",
    icon: "Ξ",
    price: "۴,۲۰۰,۰۰۰,۰۰۰",
    change: "+۱.۸%",
    minAmount: 10,
  },
  {
    symbol: "USDT",
    name: "تتر",
    icon: "₮",
    price: "۴۲,۰۰۰",
    change: "+۰.۱%",
    minAmount: 10,
  },
  {
    symbol: "TRX",
    name: "ترون",
    icon: "T",
    price: "۵,۲۰۰",
    change: "+۰.۵%",
    minAmount: 10,
  },
  {
    symbol: "BNB",
    name: "بایننس کوین",
    icon: "B",
    price: "۲,۸۰۰,۰۰۰",
    change: "-۰.۳%",
    minAmount: 10,
  },
];

export default function BuyCryptoPage() {
  const router = useRouter();
  const { isLoggedIn, openAuthModal } = useAuth();
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoCurrency | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [amountType, setAmountType] = useState<"usd" | "crypto">("usd");

  const handlePurchase = () => {
    if (!selectedCrypto) {
      alert("لطفا ارز دیجیتال را انتخاب کنید");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      alert("لطفا مبلغ را وارد کنید");
      return;
    }

    const minAmountUsd = selectedCrypto.minAmount;
    const amountUsd = parseFloat(amount);

    if (amountUsd < minAmountUsd) {
      alert(`حداقل خرید ${minAmountUsd} دلار است`);
      return;
    }

    // هدایت به صفحه checkout
    const params = new URLSearchParams({
      type: "crypto",
      symbol: selectedCrypto.symbol,
      name: selectedCrypto.name,
      amount: amount,
      amountType: amountType,
    });
    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 mb-6 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          بازگشت به صفحه اصلی
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-3">
            خرید ارز دیجیتال
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            خرید و فروش ارزهای دیجیتال معتبر با قیمت‌های به‌روز
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Crypto Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Crypto List */}
            <div className="glass-panel rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-slate-100 mb-4">
                انتخاب ارز دیجیتال
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cryptocurrencies.map((crypto) => (
                  <button
                    key={crypto.symbol}
                    onClick={() => setSelectedCrypto(crypto)}
                    className={`p-4 rounded-xl border-2 transition-all text-right ${
                      selectedCrypto?.symbol === crypto.symbol
                        ? "border-cyan-500 bg-cyan-500/10"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold">{crypto.icon}</span>
                        <div>
                          <div className="text-lg font-semibold text-slate-100">
                            {crypto.symbol}
                          </div>
                          <div className="text-xs text-slate-400">{crypto.name}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="text-sm font-semibold text-slate-200">
                        {crypto.price} تومان
                      </div>
                      <div
                        className={`text-xs font-medium ${
                          crypto.change.startsWith("+")
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {crypto.change}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Amount Input */}
            {selectedCrypto && (
              <div className="glass-panel rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                  مبلغ خرید
                </h2>
                <div className="space-y-4">
                  {/* Amount Type Toggle */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setAmountType("usd")}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                        amountType === "usd"
                          ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50"
                          : "bg-white/5 text-slate-400 border border-white/10"
                      }`}
                    >
                      دلار (USD)
                    </button>
                    <button
                      onClick={() => setAmountType("crypto")}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                        amountType === "crypto"
                          ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50"
                          : "bg-white/5 text-slate-400 border border-white/10"
                      }`}
                    >
                      {selectedCrypto.symbol}
                    </button>
                  </div>

                  {/* Amount Input */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      مبلغ ({amountType === "usd" ? "دلار" : selectedCrypto.symbol})
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder={`حداقل ${selectedCrypto.minAmount} ${amountType === "usd" ? "دلار" : selectedCrypto.symbol}`}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                      min={selectedCrypto.minAmount}
                      step="0.01"
                    />
                    <p className="text-xs text-slate-400 mt-2">
                      حداقل خرید: {selectedCrypto.minAmount} {amountType === "usd" ? "دلار" : selectedCrypto.symbol}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-panel rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-3">
                  <span className="text-cyan-400 text-xl">⚡</span>
                </div>
                <h3 className="text-sm font-semibold text-slate-100 mb-1">
                  تحویل فوری
                </h3>
                <p className="text-xs text-slate-400">
                  ارز دیجیتال به صورت آنی به کیف پول شما واریز می‌شود
                </p>
              </div>
              <div className="glass-panel rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center mb-3">
                  <span className="text-green-400 text-xl">✓</span>
                </div>
                <h3 className="text-sm font-semibold text-slate-100 mb-1">
                  امن و معتبر
                </h3>
                <p className="text-xs text-slate-400">
                  تمام تراکنش‌ها با امنیت بالا و از منابع معتبر انجام می‌شود
                </p>
              </div>
              <div className="glass-panel rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mb-3">
                  <span className="text-purple-400 text-xl">💬</span>
                </div>
                <h3 className="text-sm font-semibold text-slate-100 mb-1">
                  پشتیبانی 24/7
                </h3>
                <p className="text-xs text-slate-400">
                  تیم پشتیبانی ما همیشه آماده پاسخگویی به سوالات شماست
                </p>
              </div>
            </div>
          </div>

          {/* Right: Purchase Summary */}
          <div className="lg:col-span-1">
            <div className="glass-panel rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-slate-100 mb-6">
                خلاصه خرید
              </h2>

              {selectedCrypto ? (
                <>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">ارز:</span>
                      <span className="text-slate-200 font-medium">
                        {selectedCrypto.name} ({selectedCrypto.symbol})
                      </span>
                    </div>
                    {amount && parseFloat(amount) > 0 && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">مبلغ:</span>
                          <span className="text-slate-200 font-medium">
                            {parseFloat(amount).toLocaleString("fa-IR")}{" "}
                            {amountType === "usd" ? "دلار" : selectedCrypto.symbol}
                          </span>
                        </div>
                        <div className="pt-4 border-t border-white/10">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-300 font-medium">جمع کل:</span>
                            <span className="text-xl font-bold text-slate-100">
                              {amount} {amountType === "usd" ? "دلار" : selectedCrypto.symbol}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <button
                    onClick={handlePurchase}
                    disabled={!amount || parseFloat(amount) < selectedCrypto.minAmount}
                    className="w-full px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ادامه خرید
                  </button>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-slate-400 mb-4">
                    لطفا ارز دیجیتال را انتخاب کنید
                  </p>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                <div className="flex items-start gap-2 text-xs text-slate-400">
                  <span>⚡</span>
                  <span>تحویل فوری و آنی</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-400">
                  <span>✓</span>
                  <span>ارز معتبر و قابل اعتماد</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-400">
                  <span>💬</span>
                  <span>پشتیبانی 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

