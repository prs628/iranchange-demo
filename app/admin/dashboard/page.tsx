"use client";

import { useState } from "react";

// Mock data
const stats = [
  {
    title: "کل فروش امروز",
    value: "۱۲,۵۰۰,۰۰۰",
    change: "+۱۲.۵%",
    trend: "up",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "text-green-400",
    bgColor: "bg-green-500/20",
  },
  {
    title: "سفارش‌های جدید",
    value: "۴۸",
    change: "+۸",
    trend: "up",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
  },
  {
    title: "کاربران فعال",
    value: "۱,۲۴۵",
    change: "+۵.۲%",
    trend: "up",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    color: "text-purple-400",
    bgColor: "bg-purple-500/20",
  },
  {
    title: "نرخ تبدیل",
    value: "۳.۲%",
    change: "+۰.۵%",
    trend: "up",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/20",
  },
];

const recentOrders = [
  {
    id: "ORD-2024-001",
    user: "علی احمدی",
    product: "گیفت کارت PlayStation",
    amount: "۵,۲۰۰,۰۰۰",
    status: "completed",
    date: "۱۴۰۳/۰۹/۱۵ - ۱۴:۳۰",
  },
  {
    id: "ORD-2024-002",
    user: "مریم رضایی",
    product: "گیفت کارت Steam",
    amount: "۲,۶۰۰,۰۰۰",
    status: "processing",
    date: "۱۴۰۳/۰۹/۱۵ - ۱۳:۱۵",
  },
  {
    id: "ORD-2024-003",
    user: "حسین کریمی",
    product: "گیفت کارت Amazon",
    amount: "۱۰,۴۰۰,۰۰۰",
    status: "pending",
    date: "۱۴۰۳/۰۹/۱۵ - ۱۲:۰۰",
  },
  {
    id: "ORD-2024-004",
    user: "فاطمه محمدی",
    product: "گیفت کارت Netflix",
    amount: "۷,۸۰۰,۰۰۰",
    status: "completed",
    date: "۱۴۰۳/۰۹/۱۵ - ۱۱:۲۰",
  },
];

const statusColors = {
  completed: "bg-green-500/20 text-green-400 border-green-500/30",
  processing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  failed: "bg-red-500/20 text-red-400 border-red-500/30",
};

const statusLabels = {
  completed: "تکمیل شده",
  processing: "در حال پردازش",
  pending: "در انتظار",
  failed: "ناموفق",
};

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("today");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">داشبورد</h1>
          <p className="text-slate-400">خلاصه عملکرد سیستم</p>
        </div>
        <div className="flex gap-2">
          {["today", "week", "month"].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedPeriod === period
                  ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                  : "bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              {period === "today" ? "امروز" : period === "week" ? "هفته" : "ماه"}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="glass-panel rounded-2xl p-6 hover:shadow-xl transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center ${stat.color}`}>
                {stat.icon}
              </div>
              <div className={`text-xs font-semibold px-2 py-1 rounded-full ${
                stat.trend === "up" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
              }`}>
                {stat.change}
              </div>
            </div>
            <h3 className="text-sm text-slate-400 mb-2">{stat.title}</h3>
            <p className="text-2xl font-bold text-slate-100">{stat.value}</p>
            {stat.title !== "نرخ تبدیل" && <p className="text-xs text-slate-500 mt-1">تومان</p>}
          </div>
        ))}
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-100">نمودار فروش</h2>
            <select className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-200">
              <option>۷ روز گذشته</option>
              <option>۳۰ روز گذشته</option>
              <option>۳ ماه گذشته</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-2">
            {[65, 45, 80, 55, 90, 70, 85].map((height, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-cyan-500 to-purple-600 hover:opacity-80 transition-opacity cursor-pointer"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-slate-400 mt-2">
                  {["شن", "یک", "دو", "سه", "چهار", "پنج", "جم"][index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">آمار سریع</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">فروش این ماه</span>
                <span className="text-lg font-bold text-slate-100">۳۷۵,۰۰۰,۰۰۰</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">سفارش‌های ماه</span>
                <span className="text-lg font-bold text-slate-100">۱,۴۵۰</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">میانگین سفارش</span>
                <span className="text-lg font-bold text-slate-100">۲۵۸,۶۲۰</span>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">وضعیت سیستم</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">سرور</span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="text-sm text-green-400">آنلاین</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">دیتابیس</span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="text-sm text-green-400">متصل</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">درگاه پرداخت</span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="text-sm text-green-400">فعال</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="glass-panel rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-100">سفارش‌های اخیر</h2>
          <button className="text-sm text-cyan-400 hover:text-cyan-300 font-medium">
            مشاهده همه
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-400">شماره سفارش</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-400">کاربر</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-400">محصول</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-400">مبلغ</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-400">وضعیت</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-400">تاریخ</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-400">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4 text-sm text-slate-200 font-mono">{order.id}</td>
                  <td className="py-4 px-4 text-sm text-slate-300">{order.user}</td>
                  <td className="py-4 px-4 text-sm text-slate-300">{order.product}</td>
                  <td className="py-4 px-4 text-sm text-slate-200 font-medium">{order.amount} تومان</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${statusColors[order.status as keyof typeof statusColors]}`}>
                      {statusLabels[order.status as keyof typeof statusLabels]}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-slate-400">{order.date}</td>
                  <td className="py-4 px-4">
                    <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
                      جزئیات
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

