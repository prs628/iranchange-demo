"use client";

import Link from "next/link";

const allProducts = [
  {
    id: 1,
    title: "اکانت پی پال با حساب بانکی آنلاین",
    description: "حساب پی پال با قابلیت دریافت و ارسال پول. حساب معتبر و قابل اعتماد برای تراکنش‌های بین‌المللی. مناسب برای کسب‌وکارها و افراد حرفه‌ای",
    price: "۲,۵۰۰,۰۰۰ تومان",
    image: "💳",
    category: "پرداخت",
  },
  {
    id: 2,
    title: "ویزا کارت مجازی",
    description: "کارت مجازی برای خریدهای آنلاین. قابل استفاده در تمام سایت‌های بین‌المللی و اپلیکیشن‌های مختلف. بدون نیاز به کارت فیزیکی",
    price: "۱,۲۰۰,۰۰۰ تومان",
    image: "💳",
    category: "کارت",
  },
  {
    id: 3,
    title: "گیفت کارت استیم",
    description: "گیفت کارت استیم با قیمت مناسب. برای خرید بازی، DLC و محتوای قابل دانلود از استیم. تحویل فوری و آنی",
    price: "۸۰۰,۰۰۰ تومان",
    image: "🎮",
    category: "گیفت کارت",
  },
  {
    id: 4,
    title: "تریدینگ ویو",
    description: "دسترسی کامل به پلتفرم تریدینگ ویو برای تحلیل بازار و مشاهده نمودارهای پیشرفته. ابزارهای حرفه‌ای برای تریدرها",
    price: "۱,۵۰۰,۰۰۰ تومان",
    image: "📈",
    category: "ابزار",
  },
  {
    id: 5,
    title: "مسترکارت فیزیکی",
    description: "کارت فیزیکی برای استفاده روزمره. قابل استفاده در تمام دستگاه‌های POS و ATM. ارسال به سراسر کشور",
    price: "۳,۰۰۰,۰۰۰ تومان",
    image: "💳",
    category: "کارت",
  },
  {
    id: 6,
    title: "اکانت پی پال با حساب بانکی آنلاین",
    description: "حساب پی پال با قابلیت دریافت و ارسال پول. حساب معتبر و قابل اعتماد برای تراکنش‌های بین‌المللی",
    price: "۲,۵۰۰,۰۰۰ تومان",
    image: "💳",
    category: "پرداخت",
  },
  {
    id: 7,
    title: "ویزا کارت مجازی",
    description: "کارت مجازی برای خریدهای آنلاین. قابل استفاده در تمام سایت‌های بین‌المللی و اپلیکیشن‌های مختلف",
    price: "۱,۲۰۰,۰۰۰ تومان",
    image: "💳",
    category: "کارت",
  },
  {
    id: 8,
    title: "گیفت کارت استیم",
    description: "گیفت کارت استیم با قیمت مناسب. برای خرید بازی، DLC و محتوای قابل دانلود از استیم",
    price: "۸۰۰,۰۰۰ تومان",
    image: "🎮",
    category: "گیفت کارت",
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
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
            همه محصولات
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            مشاهده و خرید تمام محصولات و سرویس‌های ما
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {allProducts.map((product) => (
            <div
              key={product.id}
              className="glass-panel rounded-2xl p-6 hover:shadow-xl transition-all cursor-pointer group hover:-translate-y-2 hover:border-white/20"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors border border-white/10">
                <span className="text-3xl sm:text-4xl">{product.image}</span>
              </div>
              <div className="mb-2">
                <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  {product.category}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-slate-100 mb-3 group-hover:text-white transition-colors">
                {product.title}
              </h3>
              <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                {product.description}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-xl font-bold text-slate-100">{product.price}</span>
                <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all text-sm font-medium">
                  خرید
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

