"use client";

import { useState } from "react";

const transactions = [
  {
    id: "TXN-2024-001",
    orderId: "ORD-2024-001",
    user: "علی احمدی",
    amount: "۵,۲۰۰,۰۰۰",
    gateway: "زرین‌پال",
    status: "success",
    refId: "1234567890",
    date: "۱۴۰۳/۰۹/۱۵ - ۱۴:۳۰",
  },
  {
    id: "TXN-2024-002",
    orderId: "ORD-2024-002",
    user: "مریم رضایی",
    amount: "۲,۶۰۰,۰۰۰",
    gateway: "زرین‌پال",
    status: "success",
    refId: "1234567891",
    date: "۱۴۰۳/۰۹/۱۵ - ۱۳:۱۵",
  },
  {
    id: "TXN-2024-003",
    orderId: "ORD-2024-003",
    user: "حسین کریمی",
    amount: "۱۰,۴۰۰,۰۰۰",
    gateway: "پی‌پینگ",
    status: "pending",
    refId: "-",
    date: "۱۴۰۳/۰۹/۱۵ - ۱۲:۰۰",
  },
  {
    id: "TXN-2024-004",
    orderId: "ORD-2024-005",
    user: "رضا حسینی",
    amount: "۵,۲۰۰,۰۰۰",
    gateway: "زرین‌پال",
    status: "failed",
    refId: "-",
    date: "۱۴۰۳/۰۹/۱۵ - ۱۰:۴۵",
  },
];

const statusColors = {
  success: "bg-green-500/20 text-green-400 border-green-500/30",
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  failed: "bg-red-500/20 text-red-400 border-red-500/30",
};

const statusLabels = {
  success: "موفق",
  pending: "در انتظار",
  failed: "ناموفق",
};

export default function AdminTransactions() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedGateway, setSelectedGateway] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTransactions = transactions.filter((txn) => {
    const matchesStatus = selectedStatus === "all" || txn.status === selectedStatus;
    const matchesGateway = selectedGateway === "all" || txn.gateway === selectedGateway;
    const matchesSearch =
      txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.user.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesGateway && matchesSearch;
  });

  const totalRevenue = transactions
    .filter((t) => t.status === "success")
    .reduce((sum, t) => sum + parseInt(t.amount.replace(/,/g, "")), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">مدیریت تراکنش‌ها</h1>
          <p className="text-slate-400">مشاهده و مدیریت تمام تراکنش‌های پرداخت</p>
        </div>
        <button className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
          خروجی Excel
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400 mb-1">کل تراکنش‌ها</p>
              <p className="text-2xl font-bold text-slate-100">{transactions.length}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="glass-panel rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400 mb-1">تراکنش‌های موفق</p>
              <p className="text-2xl font-bold text-slate-100">
                {transactions.filter((t) => t.status === "success").length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="glass-panel rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400 mb-1">کل درآمد</p>
              <p className="text-2xl font-bold text-slate-100">
                {totalRevenue.toLocaleString("fa-IR")} تومان
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-panel rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                placeholder="جستجو..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">وضعیت</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
            >
              <option value="all">همه</option>
              <option value="success">موفق</option>
              <option value="pending">در انتظار</option>
              <option value="failed">ناموفق</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">درگاه پرداخت</label>
            <select
              value={selectedGateway}
              onChange={(e) => setSelectedGateway(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
            >
              <option value="all">همه</option>
              <option value="زرین‌پال">زرین‌پال</option>
              <option value="پی‌پینگ">پی‌پینگ</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-right py-4 px-6 text-sm font-semibold text-slate-400">شماره تراکنش</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-slate-400">شماره سفارش</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-slate-400">کاربر</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-slate-400">مبلغ</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-slate-400">درگاه</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-slate-400">کد پیگیری</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-slate-400">وضعیت</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-slate-400">تاریخ</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-slate-400">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((txn) => (
                <tr key={txn.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 text-sm text-slate-200 font-mono">{txn.id}</td>
                  <td className="py-4 px-6 text-sm text-slate-300 font-mono">{txn.orderId}</td>
                  <td className="py-4 px-6 text-sm text-slate-300">{txn.user}</td>
                  <td className="py-4 px-6 text-sm text-slate-200 font-medium">{txn.amount} تومان</td>
                  <td className="py-4 px-6 text-sm text-slate-300">{txn.gateway}</td>
                  <td className="py-4 px-6 text-sm text-slate-300 font-mono">{txn.refId}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${statusColors[txn.status as keyof typeof statusColors]}`}>
                      {statusLabels[txn.status as keyof typeof statusLabels]}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-400">{txn.date}</td>
                  <td className="py-4 px-6">
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

