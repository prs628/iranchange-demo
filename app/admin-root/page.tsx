"use client";

import { useEffect } from "react";

export default function AdminRootPage() {
  useEffect(() => {
    // Redirect to admin login
    window.location.href = "/admin/login";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
        <p className="text-slate-400">در حال هدایت به پنل ادمین...</p>
      </div>
    </div>
  );
}



