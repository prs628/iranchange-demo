"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// نوع داده گیفت کارت
type GiftCard = {
  id: number;
  brand: string;
  brandKey: string;
  logo: string;
  subtitle: string;
  available: number;
  sold: number;
  revenue: string;
  status: "active" | "inactive";
  showByDefault: boolean; // آیا به صورت پیش‌فرض برای کاربران جدید نمایش داده شود
};

// داده‌های پیش‌فرض
const defaultGiftCards: GiftCard[] = [
  {
    id: 1,
    brand: "PlayStation",
    brandKey: "playstation",
    logo: "/brands/playstation.svg",
    subtitle: "گیفت کارت پلی استیشن",
    available: 245,
    sold: 1250,
    revenue: "۶۵,۰۰۰,۰۰۰",
    status: "active",
    showByDefault: true,
  },
  {
    id: 2,
    brand: "Steam",
    brandKey: "steam",
    logo: "/brands/steam.svg",
    subtitle: "گیفت کارت استیم",
    available: 180,
    sold: 890,
    revenue: "۲۳,۱۴۰,۰۰۰",
    status: "active",
    showByDefault: true,
  },
  {
    id: 3,
    brand: "Amazon",
    brandKey: "amazon",
    logo: "/brands/amazon.svg",
    subtitle: "خرید از آمازون",
    available: 320,
    sold: 2100,
    revenue: "۱۰۹,۲۰۰,۰۰۰",
    status: "active",
    showByDefault: true,
  },
  {
    id: 4,
    brand: "Netflix",
    brandKey: "netflix",
    logo: "/brands/netflix.svg",
    subtitle: "اشتراک نتفلیکس",
    available: 95,
    sold: 450,
    revenue: "۳۵,۱۰۰,۰۰۰",
    status: "active",
    showByDefault: true,
  },
  {
    id: 5,
    brand: "iTunes",
    brandKey: "itunes",
    logo: "/brands/itunes.svg",
    subtitle: "آیتونز و اپ استور",
    available: 0,
    sold: 320,
    revenue: "۱۶,۶۴۰,۰۰۰",
    status: "inactive",
    showByDefault: true,
  },
  {
    id: 6,
    brand: "Fortnite",
    brandKey: "fortnite",
    logo: "/brands/fortnite.svg",
    subtitle: "وی‌باکس و آیتم",
    available: 150,
    sold: 680,
    revenue: "۲۸,۹۰۰,۰۰۰",
    status: "active",
    showByDefault: true,
  },
  {
    id: 7,
    brand: "Google Play",
    brandKey: "google-play",
    logo: "/brands/googleplay.svg",
    subtitle: "گوگل پلی",
    available: 200,
    sold: 950,
    revenue: "۴۲,۷۵۰,۰۰۰",
    status: "active",
    showByDefault: true,
  },
  {
    id: 8,
    brand: "Spotify",
    brandKey: "spotify",
    logo: "/brands/spotify.svg",
    subtitle: "اشتراک اسپاتیفای",
    available: 120,
    sold: 520,
    revenue: "۲۱,۸۴۰,۰۰۰",
    status: "active",
    showByDefault: true,
  },
  {
    id: 9,
    brand: "فلیپ مانی",
    brandKey: "flow-money",
    logo: "/brands/flip-money.png",
    subtitle: "فلیپ مانی",
    available: 100,
    sold: 0,
    revenue: "۰",
    status: "active",
    showByDefault: false, // به صورت پیش‌فرض نمایش داده نمی‌شود
  },
];

export default function AdminGiftCards() {
  const [searchQuery, setSearchQuery] = useState("");
  const [giftCards, setGiftCards] = useState<GiftCard[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<GiftCard | null>(null);
  const [formData, setFormData] = useState({
    brand: "",
    brandKey: "",
    logo: "",
    subtitle: "",
    available: 0,
    status: "active" as "active" | "inactive",
    showByDefault: true,
  });

  // بارگذاری داده‌ها از localStorage یا استفاده از داده‌های پیش‌فرض
  useEffect(() => {
    const saved = localStorage.getItem("admin_gift_cards");
    let cards: GiftCard[] = [];
    
    console.log("🔍 Loading gift cards from localStorage...");
    
    if (saved) {
      try {
        const parsed: GiftCard[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          cards = parsed;
          console.log(`📋 Loaded ${cards.length} cards from localStorage`);
        }
      } catch (error) {
        console.error("❌ Error parsing admin_gift_cards:", error);
      }
    }
    
    // اگر localStorage خالی یا خراب بود، از پیش‌فرض استفاده کن
    if (cards.length === 0) {
      console.log("📦 localStorage empty, using default cards");
      cards = defaultGiftCards;
      localStorage.setItem("admin_gift_cards", JSON.stringify(defaultGiftCards));
      setGiftCards(defaultGiftCards);
      return;
    }
    
    // همیشه مطمئن شو که فلیپ مانی وجود دارد
    const hasFlipMoney = cards.some((card) => card.brandKey === "flow-money");
    console.log(`🔍 Flip Money exists: ${hasFlipMoney}`);
    
    if (!hasFlipMoney) {
      // اگر فلیپ مانی نیست، اضافه کن
      const flipMoneyCard = defaultGiftCards.find((card) => card.brandKey === "flow-money");
      if (flipMoneyCard) {
        cards = [...cards, flipMoneyCard];
        localStorage.setItem("admin_gift_cards", JSON.stringify(cards));
        console.log("✅ Added Flip Money card to existing gift cards. Total cards:", cards.length);
      } else {
        console.error("❌ Flip Money card not found in defaultGiftCards!");
      }
    }
    
    console.log(`✅ Final cards count: ${cards.length}`);
    setGiftCards(cards);
  }, []);

  // ذخیره در localStorage
  const saveGiftCards = (cards: GiftCard[]) => {
    setGiftCards(cards);
    localStorage.setItem("admin_gift_cards", JSON.stringify(cards));
  };

  // باز کردن modal برای اضافه کردن
  const handleAdd = () => {
    setEditingCard(null);
    setFormData({
      brand: "",
      brandKey: "",
      logo: "",
      subtitle: "",
      available: 0,
      status: "active",
      showByDefault: true,
    });
    setIsModalOpen(true);
  };

  // باز کردن modal برای ویرایش
  const handleEdit = (card: GiftCard) => {
    setEditingCard(card);
    setFormData({
      brand: card.brand,
      brandKey: card.brandKey,
      logo: card.logo,
      subtitle: card.subtitle,
      available: card.available,
      status: card.status,
      showByDefault: card.showByDefault,
    });
    setIsModalOpen(true);
  };

  // حذف گیفت کارت
  const handleDelete = (id: number) => {
    if (confirm("آیا مطمئن هستید که می‌خواهید این گیفت کارت را حذف کنید؟")) {
      const updated = giftCards.filter((card) => card.id !== id);
      saveGiftCards(updated);
    }
  };

  // ذخیره (اضافه یا ویرایش)
  const handleSave = () => {
    if (!formData.brand || !formData.brandKey || !formData.subtitle) {
      alert("لطفا تمام فیلدهای ضروری را پر کنید");
      return;
    }

    if (editingCard) {
      // ویرایش
      const updated = giftCards.map((card) =>
        card.id === editingCard.id
          ? { ...editingCard, ...formData }
          : card
      );
      saveGiftCards(updated);
    } else {
      // اضافه کردن
      const newCard: GiftCard = {
        id: Date.now(),
        ...formData,
        sold: 0,
        revenue: "۰",
      };
      saveGiftCards([...giftCards, newCard]);
    }

    setIsModalOpen(false);
    setEditingCard(null);
  };

  const filteredCards = giftCards.filter((card) =>
    card.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">مدیریت گیفت کارت‌ها</h1>
          <p className="text-slate-400">مشاهده و مدیریت موجودی و قیمت گیفت کارت‌ها</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/gift-cards/pricing"
            className="px-4 py-2.5 rounded-xl border border-cyan-500/60 text-cyan-300 text-sm font-medium hover:bg-cyan-500/10 transition-all"
          >
            تنظیم قیمت پلن‌ها
          </Link>
          <button
            onClick={() => {
              if (confirm("آیا مطمئن هستید که می‌خواهید لیست گیفت کارت‌ها را به حالت پیش‌فرض بازنشانی کنید؟")) {
                localStorage.setItem("admin_gift_cards", JSON.stringify(defaultGiftCards));
                setGiftCards(defaultGiftCards);
                console.log("✅ Reset to default gift cards");
              }
            }}
            className="px-4 py-2.5 rounded-xl border border-yellow-500/60 text-yellow-300 text-sm font-medium hover:bg-yellow-500/10 transition-all"
          >
            بازنشانی به پیش‌فرض
          </button>
          <button
            onClick={handleAdd}
            className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
          >
            افزودن گیفت کارت
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="glass-panel rounded-2xl p-6">
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
            placeholder="جستجو بر اساس نام برند..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
          />
        </div>
      </div>

      {/* Gift Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCards.map((card) => (
          <div key={card.id} className="glass-panel rounded-2xl p-6 hover:shadow-xl transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 p-3">
                  <img src={card.logo} alt={card.brand} className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-1">{card.brand}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    card.status === "active"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}>
                    {card.status === "active" ? "فعال" : "غیرفعال"}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">موجودی:</span>
                <span className={`text-sm font-semibold ${
                  card.available > 0 ? "text-green-400" : "text-red-400"
                }`}>
                  {card.available} عدد
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">فروخته شده:</span>
                <span className="text-sm font-semibold text-slate-200">{card.sold} عدد</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">درآمد:</span>
                <span className="text-sm font-semibold text-slate-100">{card.revenue} تومان</span>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-white/10">
              <button
                onClick={() => handleEdit(card)}
                className="flex-1 px-4 py-2 bg-white/5 text-slate-200 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium"
              >
                ویرایش
              </button>
              <button
                onClick={() => handleDelete(card.id)}
                className="flex-1 px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors text-sm font-medium"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal برای اضافه/ویرایش */}
      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div
              className="glass-panel rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-100">
                  {editingCard ? "ویرایش گیفت کارت" : "افزودن گیفت کارت جدید"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-200 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    نام برند *
                  </label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                    placeholder="مثال: PlayStation"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    کلید برند (brandKey) *
                  </label>
                  <input
                    type="text"
                    value={formData.brandKey}
                    onChange={(e) => setFormData({ ...formData, brandKey: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                    placeholder="مثال: playstation (فقط حروف انگلیسی و خط تیره)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    زیرنویس *
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                    placeholder="مثال: گیفت کارت پلی استیشن"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    آدرس لوگو
                  </label>
                  <input
                    type="text"
                    value={formData.logo}
                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                    placeholder="مثال: /brands/playstation.svg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      موجودی
                    </label>
                    <input
                      type="number"
                      value={formData.available}
                      onChange={(e) => setFormData({ ...formData, available: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      وضعیت
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as "active" | "inactive" })}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                    >
                      <option value="active">فعال</option>
                      <option value="inactive">غیرفعال</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.showByDefault}
                      onChange={(e) => setFormData({ ...formData, showByDefault: e.target.checked })}
                      className="w-5 h-5 rounded bg-white/5 border border-white/10 text-cyan-500 focus:ring-2 focus:ring-cyan-500/50"
                    />
                    <span className="text-sm font-medium text-slate-300">
                      نمایش به صورت پیش‌فرض برای کاربران جدید
                    </span>
                  </label>
                  <p className="text-xs text-slate-500 mt-1 pr-8">
                    اگر غیرفعال باشد، فقط برای کاربرانی که دستی فعال کرده‌اید نمایش داده می‌شود
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-6 border-t border-white/10">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2.5 bg-white/5 text-slate-200 rounded-lg hover:bg-white/10 transition-colors font-medium"
                >
                  انصراف
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all font-medium"
                >
                  {editingCard ? "ذخیره تغییرات" : "افزودن"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

