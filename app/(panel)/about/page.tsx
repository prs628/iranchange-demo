"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 lg:p-12">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Back link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors text-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            بازگشت به صفحه اصلی
          </Link>
        </div>

        {/* Hero */}
        <section className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-100">
            درباره ایران‌چنج
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl">
            ایران‌چنج یک پلتفرم یکپارچه برای خرید گیفت کارت، کارت‌های اعتباری بین‌المللی
            و انجام پرداخت‌های ارزی است. هدف ما این است که بدون نیاز به حساب بانکی خارجی،
            بتوانید سرویس‌های بین‌المللی مثل پلی‌استیشن، استیم، نتفلیکس، اسپاتیفای و
            پلتفرم‌های پرداخت را به ساده‌ترین شکل ممکن استفاده کنید.
          </p>
        </section>

        {/* What we offer */}
        <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
          <h2 className="text-xl font-semibold text-slate-100">
            چه خدماتی ارائه می‌دهیم؟
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-100">
                گیفت کارت‌ سرویس‌های محبوب
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                از پلی‌استیشن و استیم تا نتفلیکس، گوگل‌پلی، اسپاتیفای و دیگر سرویس‌های بین‌المللی؛
                می‌توانید گیفت کارت سرویس‌های مختلف را با موجودی‌های متنوع و تحویل
                آنی تهیه کنید.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-100">
                کارت‌های مجازی و فیزیکی بین‌المللی
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                امکان تهیه ویزا و مسترکارت مجازی و فیزیکی برای خریدهای دلاری، پرداخت
                اشتراک‌ها و رزرو سرویس‌های بین‌المللی، بدون نیاز به حساب بانکی خارج
                از کشور.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-100">
                پرداخت‌ها و تسویه‌های ارزی
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                اگر نیاز به پرداخت در سایت‌ها یا پلتفرم‌های خارجی دارید، می‌توانید
                سفارش خود را ثبت کنید تا پرداخت به‌صورت امن و شفاف از طرف ما انجام
                شود.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-100">
                داشبورد و پیگیری سفارش‌ها
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                تمام سفارش‌ها، وضعیت پرداخت، تحویل کدها و تاریخچه تراکنش‌ها در
                داشبورد شما ثبت می‌شود و از طریق بخش «پیگیری سفارش» می‌توانید وضعیت
                هر سفارش را جداگانه بررسی کنید.
              </p>
            </div>
          </div>
        </section>

        {/* Why trust us */}
        <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-5">
          <h2 className="text-xl font-semibold text-slate-100">
            چرا ایران‌چنج را انتخاب کنید؟
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-100">
                تحویل سریع و خودکار
              </p>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                کد گیفت کارت‌ها بعد از تأیید پرداخت، به‌صورت آنی در پنل کاربری
                نمایش داده می‌شود و برای شما ایمیل/نمایش می‌گردد.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-100">
                شفافیت در قیمت و کارمزد
              </p>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                قیمت‌ها و کارمزدها به‌صورت شفاف در صفحه هر محصول و در بخش پرداخت
                نمایش داده می‌شود تا قبل از نهایی‌کردن سفارش دید کامل داشته باشید.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-100">
                تمرکز روی تجربه کاربری
              </p>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                ساختار پنل کاربری، داشبورد، فیلترها و پیگیری سفارش‌ها طوری طراحی
                شده که با کمترین کلیک به سرویس مورد نیازتان برسید.
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="glass-panel rounded-2xl p-6 sm:p-8 space-y-5">
          <h2 className="text-xl font-semibold text-slate-100">
            مسیر کلی استفاده از سرویس
          </h2>
          <ol className="space-y-3 list-decimal list-inside text-sm text-slate-300">
            <li>
              ثبت‌نام یا ورود به حساب کاربری و تکمیل اطلاعات پایه برای مدیریت بهتر
              سفارش‌ها.
            </li>
            <li>
              انتخاب سرویس مورد نظر (گیفت کارت، کارت اعتباری، پرداخت ارزی و ...)
              و مشاهده جزئیات محصول و قیمت‌ها.
            </li>
            <li>
              تکمیل پرداخت از طریق درگاه‌های فعال و انتظار برای تأیید خودکار
              سفارش.
            </li>
            <li>
              دریافت کد یا اطلاعات سفارش در داشبورد و امکان پیگیری وضعیت از بخش
              «سفارش‌ها» و «پیگیری سفارش».
            </li>
          </ol>
        </section>
      </div>
    </div>
  );
}


