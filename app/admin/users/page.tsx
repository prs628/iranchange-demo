"use client";

import { useState, useEffect } from "react";
// PHASE 1: NextAuth disabled temporarily
// import { useSession } from "next-auth/react";
import { getUsers } from "@/lib/auth";

type UserId = string | number;

type VisibleGiftCardsValue =
  | number[]
  | string[]
  | (number | string)[]
  | string
  | null
  | undefined;

type User = {
  id: UserId;
  name: string;
  email?: string | null;
  phone?: string | null;
  role: string;
  status: string;
  createdAt: string;
  orders: number;
  totalSpent: string;
  visibleGiftCards?: VisibleGiftCardsValue;
};

type GiftCard = {
  id: number;
  brand: string;
  brandKey: string;
  showByDefault: boolean;
};

export default function AdminUsers() {
  // PHASE 1: NextAuth disabled temporarily
  // const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [users, setUsers] = useState<User[]>([]);
  const [giftCards, setGiftCards] = useState<GiftCard[]>([]);
  const [isGiftCardModalOpen, setIsGiftCardModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedGiftCardIds, setSelectedGiftCardIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // PHASE 1: Load users from localStorage instead of API
  const loadUsers = () => {
    try {
      setIsLoading(true);
      if (typeof window === "undefined") {
        setUsers([]);
        setIsLoading(false);
        return;
      }

      const raw = getUsers() as unknown;

      // Ensure we always work with an array to keep types safe
      const allUsers: any[] = Array.isArray(raw) ? raw : [];

      // Convert localStorage User format to Admin User format
      const formattedUsers: User[] = allUsers.map((u: any): User => {
        const id: UserId =
          typeof u.id === "number" || typeof u.id === "string"
            ? u.id
            : String(u.id ?? "");

        let visibleGiftCards: VisibleGiftCardsValue = undefined;
        if (u.visibleGiftCards != null) {
          if (Array.isArray(u.visibleGiftCards)) {
            visibleGiftCards = u.visibleGiftCards as (number | string)[];
          } else if (typeof u.visibleGiftCards === "string") {
            visibleGiftCards = u.visibleGiftCards;
          }
        }

        return {
          id,
          name: u.name ?? "کاربر بدون نام",
          email: u.email ?? null,
          phone: u.phone ?? null,
          role: u.role || "user",
          status: u.status || "active",
          createdAt: u.createdAt || new Date().toISOString(),
          orders: typeof u.orders === "number" ? u.orders : 0,
          totalSpent: typeof u.totalSpent === "string" ? u.totalSpent : "0",
          visibleGiftCards,
        };
      });

      setUsers(formattedUsers);
      setError("");
      console.log("✅ Users loaded from localStorage:", formattedUsers.length, "users");
    } catch (error) {
      console.error("❌ خطا در بارگذاری کاربران:", error);
      setError("خطا در بارگذاری کاربران");
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Load gift cards from localStorage (admin configuration)
  const loadGiftCards = () => {
    if (typeof window === "undefined") return;
    const savedGiftCards = localStorage.getItem("admin_gift_cards");
    if (savedGiftCards) {
      try {
        const cards = JSON.parse(savedGiftCards);
        if (Array.isArray(cards) && cards.length > 0) {
          setGiftCards(cards);
          console.log("✅ Gift cards loaded:", cards.length, "cards");
        } else {
          console.warn("⚠️ Gift cards array is empty or invalid");
        }
      } catch (error) {
        console.error("❌ خطا در بارگذاری گیفت کارت‌ها:", error);
      }
    } else {
      console.warn("⚠️ No gift cards found in localStorage");
    }
  };

  useEffect(() => {
    loadUsers();
    loadGiftCards();
    
    const giftCardsInterval = setInterval(loadGiftCards, 2000);

    // PHASE 1: Refresh users every 2 seconds from localStorage
    const usersInterval = setInterval(loadUsers, 2000);
    
    // Also listen for usersUpdated event
    const handleUsersUpdated = () => {
      console.log("📢 usersUpdated event (AdminUsers) - reloading users");
      loadUsers();
    };
    window.addEventListener("usersUpdated", handleUsersUpdated);

    return () => {
      clearInterval(giftCardsInterval);
      clearInterval(usersInterval);
      window.removeEventListener("usersUpdated", handleUsersUpdated);
    };
  }, []);

  // Reload gift cards when modal opens
  useEffect(() => {
    if (isGiftCardModalOpen) {
      console.log("🔄 Modal opened, reloading gift cards...");
      loadGiftCards();
    }
  }, [isGiftCardModalOpen]);

  // Handle gift card management
  const handleManageGiftCards = (user: User) => {
    console.log("🎁 Opening gift cards modal for user:", {
      userId: user.id,
      userName: user.name,
      rawVisibleGiftCards: user.visibleGiftCards,
      giftCardsAvailable: giftCards.length,
    });
    
    // Parse visibleGiftCards - could be array or JSON string
    let currentVisibleCards: number[] = [];
    const rawVisible = user.visibleGiftCards;

    if (typeof rawVisible === "string" && rawVisible.trim() !== "") {
      try {
        const parsed = JSON.parse(rawVisible);
        const cards = Array.isArray(parsed) ? parsed : [];
        currentVisibleCards = cards.map((id: any) =>
          typeof id === "string" ? parseInt(id, 10) : Number(id)
        );
      } catch {
        currentVisibleCards = [];
      }
    } else if (Array.isArray(rawVisible)) {
      const cards = rawVisible as (number | string)[];
      currentVisibleCards = cards.map((id) =>
        typeof id === "string" ? parseInt(id, 10) : Number(id)
      );
    }
    
    // اگر کاربر visibleGiftCards خالی دارد یا ندارد، کارت‌هایی که showByDefault: true هستند (به جز Flow Money) را به صورت پیش‌فرض تیک بزن
    if (currentVisibleCards.length === 0 && giftCards.length > 0) {
      currentVisibleCards = giftCards
        .filter((card) => card.showByDefault === true && card.brandKey !== "flow-money")
        .map((card) => card.id);
      console.log("📋 Using default cards:", currentVisibleCards);
    }
    
    console.log("✅ Setting selectedGiftCardIds:", currentVisibleCards);

    setSelectedUser(user);
    setSelectedGiftCardIds(currentVisibleCards);
    setIsGiftCardModalOpen(true);
  };

  const handleSaveUserGiftCards = async () => {
    if (!selectedUser) {
      console.error("❌ No user selected");
      return;
    }

    console.log("💾 Saving gift cards for user:", {
      userId: selectedUser.id,
      userName: selectedUser.name,
      selectedCards: selectedGiftCardIds,
      selectedCardsType: typeof selectedGiftCardIds,
      selectedCardsLength: selectedGiftCardIds.length,
    });

    // PHASE 1: Update user's visibleGiftCards in localStorage
    try {
      if (typeof window === "undefined") {
        console.error("❌ Cannot save: window not available");
        return;
      }

      const allUsers = getUsers();
      console.log("📋 All users before update:", allUsers.length);
      
      const userIndex = allUsers.findIndex((u: any) => u.id.toString() === selectedUser.id);
      
      if (userIndex === -1) {
        console.error("❌ User not found. User ID:", selectedUser.id);
        console.error("📋 Available user IDs:", allUsers.map((u: any) => u.id));
        return;
      }

      console.log("✅ User found at index:", userIndex);
      console.log("📋 User before update:", {
        id: allUsers[userIndex].id,
        name: allUsers[userIndex].name,
        currentVisibleGiftCards: allUsers[userIndex].visibleGiftCards,
      });

      // Update user's visibleGiftCards - ensure it's an array of numbers
      const cardsToSave = Array.isArray(selectedGiftCardIds) 
        ? selectedGiftCardIds.map(id => typeof id === 'string' ? parseInt(id, 10) : id)
        : [];
      
      allUsers[userIndex].visibleGiftCards = cardsToSave;

      console.log("📋 User after update:", {
        id: allUsers[userIndex].id,
        name: allUsers[userIndex].name,
        newVisibleGiftCards: allUsers[userIndex].visibleGiftCards,
      });

      // Save back using central auth helper (handles backup + events)
      const { saveUsers } = await import("@/lib/auth");
      saveUsers(allUsers);
      
      console.log("✅ Gift cards saved to localStorage via saveUsers");
      
      // Reload users to reflect changes
      loadUsers();
      
      // Close modal
      setIsGiftCardModalOpen(false);
      setSelectedUser(null);
      setSelectedGiftCardIds([]);
      
      // Show success message
      alert(`گیفت کارت‌های ${selectedUser.name} با موفقیت ذخیره شد`);
    } catch (error) {
      console.error("❌ Error saving gift cards:", error);
      alert("خطا در ذخیره‌سازی گیفت کارت‌ها. لطفاً دوباره تلاش کنید.");
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesStatus =
      selectedStatus === "all" || user.status === selectedStatus;
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.email &&
        user.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (user.phone && user.phone.includes(searchQuery));
    return matchesStatus && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    try {
      if (!dateString) return "نامشخص";
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "نامشخص";
      }
      return date.toLocaleDateString("fa-IR");
    } catch {
      return "نامشخص";
    }
  };

  if (isLoading && users.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-slate-300">در حال بارگذاری...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">مدیریت کاربران</h1>
          <p className="text-sm text-slate-400 mt-1">
            مشاهده و مدیریت کاربران سیستم
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={loadUsers}
            className="px-4 py-2.5 bg-white/5 text-slate-200 font-medium rounded-xl hover:bg-white/10 transition-all border border-white/10"
          >
            🔄 به‌روزرسانی
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="glass-panel rounded-2xl p-4 border border-red-500/30">
          <p className="text-red-300">{error}</p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400 mb-1">کل کاربران</p>
              <p className="text-2xl font-bold text-slate-100">{users.length}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="glass-panel rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400 mb-1">کاربران فعال</p>
              <p className="text-2xl font-bold text-slate-100">
                {users.filter((u) => u.status === "active").length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="glass-panel rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400 mb-1">کاربران مسدود</p>
              <p className="text-2xl font-bold text-slate-100">
                {users.filter((u) => u.status === "banned").length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-panel rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              جستجو
            </label>
            <div className="relative">
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="جستجو بر اساس نام، ایمیل یا شماره تلفن..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              فیلتر بر اساس وضعیت
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
            >
              <option value="all">همه</option>
              <option value="active">فعال</option>
              <option value="banned">مسدود</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          {filteredUsers.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              <p>هیچ کاربری یافت نشد</p>
              <p className="text-sm mt-2">تعداد کل کاربران: {users.length}</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-slate-400">
                    نام
                  </th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-slate-400">
                    ایمیل
                  </th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-slate-400">
                    شماره تلفن
                  </th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-slate-400">
                    نقش
                  </th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-slate-400">
                    تعداد سفارش
                  </th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-slate-400">
                    کل خرید
                  </th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-slate-400">
                    وضعیت
                  </th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-slate-400">
                    تاریخ عضویت
                  </th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-slate-400">
                    عملیات
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {user.name[0]}
                          </span>
                        </div>
                        <span className="text-sm text-slate-200 font-medium">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-300">
                      {user.email || "-"}
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-300">
                      {user.phone || "-"}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${
                          user.role === "admin"
                            ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                            : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                        }`}
                      >
                        {user.role === "admin" ? "مدیر" : "کاربر"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-200">
                      {user.orders || 0}
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-200 font-medium">
                      {user.totalSpent || "۰"} تومان
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${
                          user.status === "active"
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : "bg-red-500/20 text-red-400 border-red-500/30"
                        }`}
                      >
                        {user.status === "active" ? "فعال" : "مسدود"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-400">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          onClick={() => handleManageGiftCards(user)}
                          className="text-purple-400 hover:text-purple-300 text-sm font-medium px-2 py-1 rounded hover:bg-purple-500/10 transition-colors"
                        >
                          گیفت کارت‌ها
                        </button>
                        <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
                          ویرایش
                        </button>
                        {user.status === "active" ? (
                          <button className="text-red-400 hover:text-red-300 text-sm font-medium">
                            مسدود
                          </button>
                        ) : (
                          <button className="text-green-400 hover:text-green-300 text-sm font-medium">
                            فعال
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal for managing gift cards */}
      {isGiftCardModalOpen && selectedUser && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setIsGiftCardModalOpen(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div
              className="glass-panel rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100">
                    مدیریت گیفت کارت‌های {selectedUser.name}
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    گیفت کارت‌هایی که برای این کاربر نمایش داده می‌شود را انتخاب
                    کنید
                  </p>
                </div>
                <button
                  onClick={() => setIsGiftCardModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-200 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-3 mb-6 max-h-[400px] overflow-y-auto">
                {giftCards.length === 0 ? (
                  <div className="text-center py-8 text-slate-400">
                    <p>هیچ گیفت کارتی یافت نشد</p>
                    <p className="text-sm mt-2">
                      لطفاً ابتدا از صفحه "گیفت کارت ها" گیفت کارت اضافه کنید
                    </p>
                  </div>
                ) : (
                  giftCards.map((card) => (
                    <label
                      key={card.id}
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedGiftCardIds.includes(card.id)}
                        onChange={(e) => {
                          const cardId = card.id;
                          const isChecked = e.target.checked;
                          console.log(`🔘 Checkbox changed: ${card.brand} (ID: ${cardId}) - ${isChecked ? 'checked' : 'unchecked'}`);
                          console.log(`📋 Current selectedGiftCardIds before:`, selectedGiftCardIds);
                          
                          if (isChecked) {
                            const updated = [...selectedGiftCardIds, cardId];
                            console.log(`✅ Adding card ${cardId}. New array:`, updated);
                            setSelectedGiftCardIds(updated);
                          } else {
                            const updated = selectedGiftCardIds.filter((id) => id !== cardId);
                            console.log(`❌ Removing card ${cardId}. New array:`, updated);
                            setSelectedGiftCardIds(updated);
                          }
                        }}
                        className="form-checkbox h-5 w-5 text-cyan-500 bg-white/10 border-white/20 rounded focus:ring-cyan-500"
                      />
                      <div className="flex-1">
                        <p className="text-slate-200 font-medium">
                          {card.brand}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          {card.brandKey}
                        </p>
                      </div>
                    </label>
                  ))
                )}
              </div>

              <div className="flex gap-3 pt-6 border-t border-white/10">
                <button
                  onClick={() => setIsGiftCardModalOpen(false)}
                  className="flex-1 px-4 py-2.5 bg-white/5 text-slate-200 rounded-lg hover:bg-white/10 transition-colors font-medium"
                >
                  انصراف
                </button>
                <button
                  onClick={handleSaveUserGiftCards}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                >
                  ذخیره
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

