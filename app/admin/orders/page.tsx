"use client";

import { useState } from "react";

const orders = [
  {
    id: "ORD-2024-001",
    user: "علی احمدی",
    email: "ali@example.com",
    product: "گیفت کارت PlayStation",
    amount: "۵,۲۰۰,۰۰۰",
    quantity: 1,
    status: "completed",
    date: "۱۴۰۳/۰۹/۱۵ - ۱۴:۳۰",
    paymentMethod: "زرین‌پال",
  },
  {
    id: "ORD-2024-002",
    user: "مریم رضایی",
    email: "maryam@example.com",
    product: "گیفت کارت Steam",
    amount: "۲,۶۰۰,۰۰۰",
    quantity: 2,
    status: "processing",
    date: "۱۴۰۳/۰۹/۱۵ - ۱۳:۱۵",
    paymentMethod: "زرین‌پال",
  },
  {
    id: "ORD-2024-003",
    user: "حسین کریمی",
    email: "hossein@example.com",
    product: "گیفت کارت Amazon",
    amount: "۱۰,۴۰۰,۰۰۰",
    quantity: 1,
    status: "pending",
    date: "۱۴۰۳/۰۹/۱۵ - ۱۲:۰۰",
    paymentMethod: "پی‌پینگ",
  },
  {
    id: "ORD-2024-004",
    user: "فاطمه محمدی",
    email: "fateme@example.com",
    product: "گیفت کارت Netflix",
    amount: "۷,۸۰۰,۰۰۰",
    quantity: 1,
    status: "completed",
    date: "۱۴۰۳/۰۹/۱۵ - ۱۱:۲۰",
    paymentMethod: "زرین‌پال",
  },
  {
    id: "ORD-2024-005",
    user: "رضا حسینی",
    email: "reza@example.com",
    product: "گیفت کارت iTunes",
    amount: "۵,۲۰۰,۰۰۰",
    quantity: 1,
    status: "failed",
    date: "۱۴۰۳/۰۹/۱۵ - ۱۰:۴۵",
    paymentMethod: "زرین‌پال",
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

export default function AdminOrders() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus;
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">مدیریت سفارش‌ها</h1>
          <p className="text-slate-400">مشاهده و مدیریت تمام سفارش‌ها</p>
        </div>
        <button className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
          خروجی Excel
        </button>
      </div>

      {/* Filters */}
      <div className="glass-panel rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">جستجو</label>
            <div className="relative">
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="جستجو بر اساس شماره سفارش، نام یا ایمیل..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">فیلتر بر اساس وضعیت</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
            >
              <option value="all">همه</option>
              <option value="pending">در انتظار</option>
              <option value="processing">در حال پردازش</option>
              <option value="completed">تکمیل شده</option>
              <option value="failed">ناموفق</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-right py-4 px-6 text-sm font-semibold text-slate-400">شماره سفارش</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-slate-400">کاربر</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-slate-400">محصول</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-slate-400">تعداد</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-slate-400">مبلغ</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-slate-400">وضعیت</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-slate-400">روش پرداخت</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-slate-400">تاریخ</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-slate-400">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 text-sm text-slate-200 font-mono">{order.id}</td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-sm text-slate-200 font-medium">{order.user}</p>
                      <p className="text-xs text-slate-400">{order.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-300">{order.product}</td>
                  <td className="py-4 px-6 text-sm text-slate-300">{order.quantity} عدد</td>
                  <td className="py-4 px-6 text-sm text-slate-200 font-medium">{order.amount} تومان</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${statusColors[order.status as keyof typeof statusColors]}`}>
                      {statusLabels[order.status as keyof typeof statusLabels]}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-300">{order.paymentMethod}</td>
                  <td className="py-4 px-6 text-sm text-slate-400">{order.date}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
                        جزئیات
                      </button>
                      {order.status === "pending" && (
                        <button className="text-green-400 hover:text-green-300 text-sm font-medium">
                          تایید
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
          <p className="text-sm text-slate-400">
            نمایش ۱ تا {filteredOrders.length} از {orders.length} سفارش
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white/5 text-slate-300 rounded-lg hover:bg-white/10 transition-colors">
              قبلی
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg">
              ۱
            </button>
            <button className="px-4 py-2 bg-white/5 text-slate-300 rounded-lg hover:bg-white/10 transition-colors">
              ۲
            </button>
            <button className="px-4 py-2 bg-white/5 text-slate-300 rounded-lg hover:bg-white/10 transition-colors">
              بعدی
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

