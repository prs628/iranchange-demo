"use client";

export type GiftCardAmountConfig = {
  valueUsd: number;      // مقدار دلاری (مثلاً ۱۰، ۳۰، ۶۰)
  label: string;         // برچسب نمایشی (مثلاً "۱۰ دلار")
  priceToman: number;    // قیمت به تومان برای هر ۱ عدد از این پلن
};

export type GiftCardPricingMap = Record<string, GiftCardAmountConfig[]>;

const PRICING_KEY = "gift_card_pricing";

// مقادیر پیش‌فرض براساس قیمت‌های فعلی در صفحه گیفت‌کارت
const DEFAULT_PRICING: GiftCardPricingMap = {
  playstation: [
    { valueUsd: 10, label: "۱۰ دلار", priceToman: 5_200_000 },
    { valueUsd: 20, label: "۲۰ دلار", priceToman: 10_400_000 },
    { valueUsd: 50, label: "۵۰ دلار", priceToman: 26_000_000 },
    { valueUsd: 100, label: "۱۰۰ دلار", priceToman: 52_000_000 },
  ],
  fortnite: [
    { valueUsd: 10, label: "۱۰ دلار", priceToman: 5_200_000 },
    { valueUsd: 25, label: "۲۵ دلار", priceToman: 13_000_000 },
    { valueUsd: 50, label: "۵۰ دلار", priceToman: 26_000_000 },
    { valueUsd: 100, label: "۱۰۰ دلار", priceToman: 52_000_000 },
  ],
  amazon: [
    { valueUsd: 10, label: "۱۰ دلار", priceToman: 5_200_000 },
    { valueUsd: 25, label: "۲۵ دلار", priceToman: 13_000_000 },
    { valueUsd: 50, label: "۵۰ دلار", priceToman: 26_000_000 },
    { valueUsd: 100, label: "۱۰۰ دلار", priceToman: 52_000_000 },
  ],
  netflix: [
    { valueUsd: 15, label: "۱۵ دلار", priceToman: 7_800_000 },
    { valueUsd: 30, label: "۳۰ دلار", priceToman: 15_600_000 },
    { valueUsd: 60, label: "۶۰ دلار", priceToman: 31_200_000 },
  ],
  steam: [
    { valueUsd: 10, label: "۱۰ دلار", priceToman: 5_200_000 },
    { valueUsd: 25, label: "۲۵ دلار", priceToman: 13_000_000 },
    { valueUsd: 50, label: "۵۰ دلار", priceToman: 26_000_000 },
    { valueUsd: 100, label: "۱۰۰ دلار", priceToman: 52_000_000 },
  ],
  itunes: [
    { valueUsd: 10, label: "۱۰ دلار", priceToman: 5_200_000 },
    { valueUsd: 25, label: "۲۵ دلار", priceToman: 13_000_000 },
    { valueUsd: 50, label: "۵۰ دلار", priceToman: 26_000_000 },
    { valueUsd: 100, label: "۱۰۰ دلار", priceToman: 52_000_000 },
  ],
  "google-play": [
    { valueUsd: 10, label: "۱۰ دلار", priceToman: 5_200_000 },
    { valueUsd: 25, label: "۲۵ دلار", priceToman: 13_000_000 },
    { valueUsd: 50, label: "۵۰ دلار", priceToman: 26_000_000 },
    { valueUsd: 100, label: "۱۰۰ دلار", priceToman: 52_000_000 },
  ],
  spotify: [
    { valueUsd: 10, label: "۱۰ دلار", priceToman: 5_200_000 },
    { valueUsd: 30, label: "۳۰ دلار", priceToman: 15_600_000 },
    { valueUsd: 60, label: "۶۰ دلار", priceToman: 31_200_000 },
  ],
  "flow-money": [
    { valueUsd: 10, label: "۱۰ دلار", priceToman: 5_200_000 },
    { valueUsd: 25, label: "۲۵ دلار", priceToman: 13_000_000 },
    { valueUsd: 50, label: "۵۰ دلار", priceToman: 26_000_000 },
    { valueUsd: 100, label: "۱۰۰ دلار", priceToman: 52_000_000 },
  ],
};

export function getDefaultPricing(): GiftCardPricingMap {
  // برگرداندن کپی تا به شیء اصلی صدمه نخورد
  return JSON.parse(JSON.stringify(DEFAULT_PRICING));
}

export function getGiftCardPricing(): GiftCardPricingMap {
  if (typeof window === "undefined") {
    return getDefaultPricing();
  }

  try {
    const raw = localStorage.getItem(PRICING_KEY);
    if (!raw) return getDefaultPricing();
    const parsed = JSON.parse(raw) as GiftCardPricingMap;

    // ادغام با پیش‌فرض‌ها، اگر برندی ذخیره نشده بود
    const base = getDefaultPricing();
    const result: GiftCardPricingMap = { ...base };
    for (const key of Object.keys(parsed)) {
      if (Array.isArray(parsed[key])) {
        result[key] = parsed[key];
      }
    }
    return result;
  } catch (e) {
    console.error("❌ Error reading gift card pricing from localStorage", e);
    return getDefaultPricing();
  }
}

export function saveGiftCardPricing(map: GiftCardPricingMap): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PRICING_KEY, JSON.stringify(map));
    window.dispatchEvent(new CustomEvent("pricingUpdated"));
  } catch (e) {
    console.error("❌ Error saving gift card pricing to localStorage", e);
  }
}



