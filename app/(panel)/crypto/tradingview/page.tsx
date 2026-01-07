"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    TradingView: any;
  }
}

export default function TradingViewPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const initRef = useRef(false);
  const iframeCheckDoneRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const initializeWidget = () => {
    if (initRef.current) {
      console.log("[TradingView] initializeWidget: Already initialized, skipping");
      return;
    }
    if (!window.TradingView) {
      console.log("[TradingView] initializeWidget: window.TradingView not available");
      return;
    }
    if (!containerRef.current) {
      console.log("[TradingView] initializeWidget: containerRef.current is null");
      return;
    }

    console.log("[TradingView] initializeWidget: Starting widget initialization");
    initRef.current = true;

    try {
      // Clear container
      const container = document.getElementById("tradingview-widget-container");
      if (container) {
        container.innerHTML = "";
        console.log("[TradingView] Container cleared");
      }

      // Create new TradingView widget
      // Use autosize=true and set height via container CSS (not in widget options)
      new window.TradingView.widget({
        autosize: true,
        symbol: "BINANCE:BTCUSDT",
        interval: "D",
        timezone: "Asia/Tehran",
        theme: "dark",
        style: "1",
        locale: "fa_IR",
        toolbar_bg: "#1e293b",
        enable_publishing: false,
        allow_symbol_change: true,
        container_id: "tradingview-widget-container",
        hide_side_toolbar: false,
        studies: [
          "Volume@tv-basicstudies",
        ],
        show_popup_button: true,
        popup_width: "1000",
        popup_height: "650",
        no_referral_id: true,
        referral_id: "",
        overrides: {
          "paneProperties.background": "#0f172a",
          "paneProperties.backgroundType": "solid",
        },
      });

      console.log("[TradingView] Widget created, checking for iframe...");

      // Check for iframe after widget creation
      setTimeout(() => {
        const iframe = containerRef.current?.querySelector('iframe');
        if (iframe) {
          console.log("[TradingView] Iframe found:", iframe);
          iframe.style.width = '100%';
          iframe.style.height = '640px';
          iframe.style.minHeight = '640px';
          iframe.style.display = 'block';
          setIsLoading(false);
          setError(null);
        } else {
          console.warn("[TradingView] Iframe not found after widget creation");
          // Will be checked again after 2 seconds
        }
      }, 100);
    } catch (err) {
      console.error("[TradingView] Initialization error:", err);
      setError("خطا در راه‌اندازی نمودار");
      setIsLoading(false);
      initRef.current = false;
    }
  };

  useEffect(() => {
    console.log("[TradingView] useEffect: Component mounted");

    // Load TradingView script if not already loaded
    if (window.TradingView) {
      console.log("[TradingView] Script already loaded");
      // Script already loaded, try to initialize
      setTimeout(() => {
        if (containerRef.current) {
          initializeWidget();
        }
      }, 100);
    } else {
      // Check if script is already being loaded
      const existingScript = document.querySelector('script[src="https://s3.tradingview.com/tv.js"]');
      if (existingScript) {
        console.log("[TradingView] Script already in DOM, waiting for load");
        existingScript.addEventListener('load', () => {
          console.log("[TradingView] Existing script loaded");
          setTimeout(() => {
            if (containerRef.current) {
              initializeWidget();
            }
          }, 100);
        });
      } else {
        // Load TradingView script
        console.log("[TradingView] Loading script from https://s3.tradingview.com/tv.js");
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/tv.js";
        script.async = true;
        script.onload = () => {
          console.log("[TradingView] Script loaded successfully");
          if (window.TradingView && containerRef.current) {
            setTimeout(() => {
              initializeWidget();
            }, 100);
          } else {
            console.error("[TradingView] Script loaded but window.TradingView not available");
            setError("خطا در بارگذاری TradingView");
            setIsLoading(false);
          }
        };
        script.onerror = () => {
          console.error("[TradingView] Script failed to load");
          setError("خطا در بارگذاری اسکریپت TradingView");
          setIsLoading(false);
        };

        document.head.appendChild(script);
      }
    }

    // Check for iframe after 2 seconds
    const iframeCheckTimeout = setTimeout(() => {
      if (!iframeCheckDoneRef.current) {
        const iframe = containerRef.current?.querySelector('iframe');
        if (!iframe) {
          console.error("[TradingView] Iframe not found after 2 seconds");
          setError("TradingView blocked or failed to load (check AdBlock/CSP/Network).");
          setIsLoading(false);
        } else {
          console.log("[TradingView] Iframe found after 2 seconds check");
          setIsLoading(false);
        }
        iframeCheckDoneRef.current = true;
      }
    }, 2000);

    // Handle window resize
    const handleResize = () => {
      if (containerRef.current) {
        const iframe = containerRef.current.querySelector('iframe');
        if (iframe) {
          iframe.style.width = '100%';
        }
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(iframeCheckTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleRetry = () => {
    console.log("[TradingView] Retry clicked");
    setError(null);
    setIsLoading(true);
    iframeCheckDoneRef.current = false;
    initRef.current = false;
    
    if (window.TradingView && containerRef.current) {
      setTimeout(() => {
        initializeWidget();
      }, 100);
    } else {
      // Reload page if script not loaded
      console.log("[TradingView] Reloading page to reload script");
      window.location.reload();
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full">
      <div className="w-full max-w-full">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">تریدینگ ویو</h1>
          <p className="text-slate-400">نمودارهای زنده و تحلیل بازار ارزهای دیجیتال</p>
        </div>

        {/* Chart Container */}
        <div className="glass-panel rounded-2xl p-4 sm:p-6 w-full relative" style={{ overflow: "visible" }}>
          {/* TradingView Widget Container - ALWAYS MOUNTED */}
          <div
            id="tradingview-widget-container"
            ref={containerRef}
            className="w-full"
            style={{
              minHeight: "640px",
              height: "640px",
              width: "100%",
              overflow: "visible",
              position: "relative",
            }}
          />

          {/* Loading Overlay - Only shown when isLoading=true */}
          {isLoading && (
            <div 
              className="absolute inset-0 w-full h-full bg-slate-800/80 backdrop-blur-sm rounded-xl flex items-center justify-center"
              style={{ 
                minHeight: "640px",
                zIndex: 10,
                pointerEvents: "auto"
              }}
            >
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
                <p className="text-slate-400">در حال بارگذاری نمودار...</p>
              </div>
            </div>
          )}

          {/* Error Overlay - Only shown when error exists */}
          {error && !isLoading && (
            <div 
              className="absolute inset-0 w-full h-full bg-red-500/20 border-2 border-red-500/50 rounded-xl flex items-center justify-center"
              style={{ 
                minHeight: "640px",
                zIndex: 10,
                pointerEvents: "auto"
              }}
            >
              <div className="text-center bg-slate-900/90 p-6 rounded-xl">
                <p className="text-red-400 mb-4 text-lg font-semibold">{error}</p>
                <button
                  onClick={handleRetry}
                  className="px-6 py-3 bg-red-500/30 text-red-300 border border-red-500/50 rounded-lg hover:bg-red-500/40 transition-colors font-medium"
                >
                  تلاش مجدد
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-panel rounded-xl p-4">
            <h3 className="text-sm font-semibold text-slate-300 mb-2">نمودار زنده</h3>
            <p className="text-xs text-slate-400">
              قیمت‌های لحظه‌ای و تحلیل تکنیکال پیشرفته
            </p>
          </div>
          <div className="glass-panel rounded-xl p-4">
            <h3 className="text-sm font-semibold text-slate-300 mb-2">ابزارهای حرفه‌ای</h3>
            <p className="text-xs text-slate-400">
              دسترسی به تمام ابزارهای تحلیل و اندیکاتورها
            </p>
          </div>
          <div className="glass-panel rounded-xl p-4">
            <h3 className="text-sm font-semibold text-slate-300 mb-2">پشتیبانی 24/7</h3>
            <p className="text-xs text-slate-400">
              پشتیبانی کامل برای استفاده از پلتفرم
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
