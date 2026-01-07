"use client";

import { useEffect, useState } from "react";
import {
  getGiftCardPricing,
  saveGiftCardPricing,
  GiftCardPricingMap,
  GiftCardAmountConfig,
} from "@/lib/giftCardPricing";

export default function GiftCardPricingAdminPage() {
  const [pricing, setPricing] = useState<GiftCardPricingMap>({});
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    const data = getGiftCardPricing();
    setPricing(data);
  }, []);

  const handleChange = (
    brandKey: string,
    index: number,
    field: keyof GiftCardAmountConfig,
    value: string
  ) => {
    setPricing((prev) => {
      const copy: GiftCardPricingMap = { ...prev };
      const list = copy[brandKey] ? [...copy[brandKey]] : [];
      const item = { ...list[index] };

      if (field === "valueUsd") {
        const num = Number(value.replace(/[^\d]/g, ""));
        item.valueUsd = isFinite(num) ? num : 0;
        // برچسب را هم بر اساس مقدار دلار آپدیت می‌کنیم
        item.label = `${item.valueUsd} دلار`;
      } else if (field === "priceToman") {
        const num = Number(value.replace(/[^\d]/g, ""));
        item.priceToman = isFinite(num) ? num : 0;
      } else if (field === "label") {
        item.label = value;
      }

      list[index] = item;
      copy[brandKey] = list;
      return copy;
    });
    setStatus("");
  };

  const formatToman = (value: number) =>
    value ? value.toLocaleString("fa-IR") : "";

  const handleSave = () => {
    saveGiftCardPricing(pricing);
    setStatus("قیمت‌ها با موفقیت ذخیره شدند");
  };

  const brandKeys = Object.keys(pricing);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 lg:p-12">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-100">
              قیمت‌گذاری گیفت کارت‌ها
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              برای هر پلن (مثلاً ۱۰، ۳۰، ۶۰ دلار) قیمت تومانی را جداگانه تنظیم کنید.
            </p>
          </div>
        </div>

        {brandKeys.length === 0 ? (
          <div className="glass-panel rounded-2xl p-6 text-slate-400">
            در حال بارگذاری داده‌ها...
          </div>
        ) : (
          brandKeys.map((brandKey) => (
            <div
              key={brandKey}
              className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4"
            >
              <h2 className="text-lg font-semibold text-slate-100 mb-2">
                {brandKey}
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-slate-200">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400">
                      <th className="py-2 pr-2 text-right">مبلغ دلاری</th>
                      <th className="py-2 pr-2 text-right">برچسب</th>
                      <th className="py-2 pr-2 text-right">قیمت هر ۱ عدد (تومان)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricing[brandKey].map((item, index) => (
                      <tr key={index} className="border-b border-white/5">
                        <td className="py-2 pr-2">
                          <input
                            type="text"
                            inputMode="numeric"
                            value={item.valueUsd || ""}
                            onChange={(e) =>
                              handleChange(
                                brandKey,
                                index,
                                "valueUsd",
                                e.target.value
                              )
                            }
                            className="w-24 px-2 py-1 rounded-lg bg-slate-900 border border-white/10 text-slate-100 text-sm"
                          />
                        </td>
                        <td className="py-2 pr-2">
                          <input
                            type="text"
                            value={item.label}
                            onChange={(e) =>
                              handleChange(
                                brandKey,
                                index,
                                "label",
                                e.target.value
                              )
                            }
                            className="w-32 px-2 py-1 rounded-lg bg-slate-900 border border-white/10 text-slate-100 text-sm"
                          />
                        </td>
                        <td className="py-2 pr-2">
                          <input
                            type="text"
                            inputMode="numeric"
                            value={formatToman(item.priceToman)}
                            onChange={(e) =>
                              handleChange(
                                brandKey,
                                index,
                                "priceToman",
                                e.target.value
                              )
                            }
                            className="w-40 px-2 py-1 rounded-lg bg-slate-900 border border-white/10 text-slate-100 text-sm"
                            placeholder="مثلاً ۳,۰۰۰,۰۰۰"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
          >
            ذخیره همه قیمت‌ها
          </button>
        </div>

        {status && (
          <p className="text-sm text-cyan-400 text-right">{status}</p>
        )}
      </div>
    </div>
  );
}



