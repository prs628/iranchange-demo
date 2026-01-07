"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopBar from "@/components/admin/AdminTopBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed right-0 top-0 bottom-0 w-[280px] z-50 lg:hidden">
            <div className="h-full glass-panel rounded-l-2xl shadow-2xl overflow-hidden">
              <AdminSidebar onLinkClick={() => setSidebarOpen(false)} />
            </div>
          </div>
        </>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="fixed left-0 top-0 bottom-0 w-64 glass-panel border-r border-white/10">
            <AdminSidebar />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:mr-64 min-h-screen">
          <AdminTopBar onMenuClick={() => setSidebarOpen(true)} />
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

