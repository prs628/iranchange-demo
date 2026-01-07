"use client";

import { useEffect, useState } from "react";
import { getExchangeRateTomanPerUsd, setExchangeRateTomanPerUsd } from "@/lib/settings";

export default function AdminSettingsPage() {
  const [rateInput, setRateInput] = useState<string>("");
  const [savedRate, setSavedRate] = useState<number | null>(null);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    const current = getExchangeRateTomanPerUsd();
    setSavedRate(current);
    setRateInput(current.toString());
  }, []);

  const handleSave = () => {
    const numeric = Number(rateInput.replace(/,/g, ""));
    if (!isFinite(numeric) || numeric <= 0) {
      setStatus("لطفاً یک عدد معتبر وارد کنید");
      return;
    }
    setExchangeRateTomanPerUsd(numeric);
    setSavedRate(numeric);
    setStatus("نرخ با موفقیت ذخیره شد");
  };

  const formatNumber = (value: string) => {
    const numeric = Number(value.replace(/,/g, ""));
    if (!numeric) return "";
    return numeric.toLocaleString("fa-IR");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 lg:p-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100">
            تنظیمات قیمت‌گذاری
          </h1>
        </div>

        <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-100 mb-2">
              نرخ تبدیل دلار به تومان
            </h2>
            <p className="text-sm text-slate-400 mb-4">
              این نرخ برای محاسبه قیمت تومانی پلن‌ها (مثلاً ۶۰ دلار) استفاده می‌شود.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  مبلغ هر ۱ دلار (تومان)
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={rateInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^\d]/g, "");
                    setRateInput(formatNumber(raw));
                  }}
                  className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-white/10 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="مثلاً ۵۰,۰۰۰"
                />
              </div>

              <button
                onClick={handleSave}
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
              >
                ذخیره نرخ
              </button>
            </div>

            {savedRate !== null && (
              <p className="text-sm text-slate-400 mt-3">
                نرخ فعلی:{" "}
                <span className="font-semibold text-slate-100">
                  {savedRate.toLocaleString("fa-IR")} تومان
                </span>{" "}
                برای هر ۱ دلار
              </p>
            )}

            {status && (
              <p className="text-sm mt-3 text-cyan-400">
                {status}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}



