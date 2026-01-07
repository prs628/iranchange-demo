type MenuItem = {
  key: string;
  title: string;
  href?: string;
  icon?: string;        // فعلاً اسم آیکن را string بگذار
  badge?: string;       // مثل "پیشنهاد ویژه"
  children?: MenuItem[];
};

type MenuSection = { title?: string; items: MenuItem[] };

export const panelMenu: MenuSection[] = [
  {
    items: [
      {
        key: "home",
        title: "صفحه اصلی",
        href: "/",
      },
      {
        key: "dashboard",
        title: "داشبورد",
        href: "/dashboard",
      },
      {
        key: "crypto",
        title: "ارز دیجیتال",
        children: [
          {
            key: "crypto-buy",
            title: "خرید ارز",
            href: "/crypto/buy",
          },
          {
            key: "crypto-tradingview",
            title: "تریدینگ ویو",
            href: "/crypto/tradingview",
          },
        ],
      },
      {
        key: "cards-physical",
        title: "ویزا کارت و مسترکارت فیزیکی",
        href: "/cards/physical",
      },
      {
        key: "cards-virtual",
        title: "ویزا کارت و مسترکارت مجازی",
        href: "/cards/virtual",
      },
      {
        key: "gift-cards",
        title: "گیفت کارت ها",
        href: "/gift-cards",
      },
      {
        key: "paypal",
        title: "پی پال، پول الکترونیکی",
        href: "/paypal",
      },
    ],
  },
  {
    items: [
      {
        key: "orders-track",
        title: "پیگیری سفارش",
        href: "/orders/track",
      },
      {
        key: "support-tickets",
        title: "پشتیبانی و تیکت",
        href: "/support/tickets",
      },
      {
        key: "about",
        title: "درباره ما",
        href: "/about",
      },
    ],
  },
];

