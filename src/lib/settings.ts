"use client";

/**
 * Simple client-side settings helper for demo purposes.
 * Stores configuration in localStorage.
 *
 * NOTE: This is NOT suitable for production – replace with real backend storage.
 */

const EXCHANGE_RATE_KEY = "settings_exchange_rate_toman_per_usd";

// پیش‌فرض: ۵۲,۰۰۰ تومان برای هر ۱ دلار (فقط دمو)
const DEFAULT_EXCHANGE_RATE = 52000;

export function getExchangeRateTomanPerUsd(): number {
  if (typeof window === "undefined") {
    return DEFAULT_EXCHANGE_RATE;
  }

  try {
    const raw = localStorage.getItem(EXCHANGE_RATE_KEY);
    if (!raw) return DEFAULT_EXCHANGE_RATE;
    const parsed = Number(raw);
    if (!isFinite(parsed) || parsed <= 0) return DEFAULT_EXCHANGE_RATE;
    return parsed;
  } catch (e) {
    console.error("❌ Error reading exchange rate from localStorage", e);
    return DEFAULT_EXCHANGE_RATE;
  }
}

export function setExchangeRateTomanPerUsd(value: number): void {
  if (typeof window === "undefined") return;
  if (!isFinite(value) || value <= 0) {
    console.error("❌ Invalid exchange rate value", value);
    return;
  }

  try {
    localStorage.setItem(EXCHANGE_RATE_KEY, String(Math.round(value)));
    // برای اطلاع سایر بخش‌ها که نرخ عوض شده
    window.dispatchEvent(new CustomEvent("settingsUpdated", { detail: { key: "exchangeRate" } }));
  } catch (e) {
    console.error("❌ Error saving exchange rate to localStorage", e);
  }
}



