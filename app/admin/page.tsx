"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSessionUser, isLoggedIn } from "@/lib/auth";

export default function AdminPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkAndRedirect = () => {
      const user = getSessionUser();
      const loggedIn = isLoggedIn();
      
      if (loggedIn && user?.role === "admin") {
        // User is admin, redirect to dashboard
        router.push("/admin/dashboard");
      } else {
        // Not logged in or not admin, redirect to login
        router.push("/admin/login");
      }
      setIsChecking(false);
    };

    checkAndRedirect();
  }, [router]);

  // Show loading while checking and redirecting
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
        <p className="text-slate-400">در حال هدایت...</p>
      </div>
    </div>
  );
}

