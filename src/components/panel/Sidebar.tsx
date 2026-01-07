"use client";

import { panelMenu } from "@/lib/panelMenu";
import SidebarItem from "./SidebarItem";

type SidebarProps = {
  variant?: "dark" | "light";
  onLinkClick?: () => void;
};

export default function Sidebar({ variant = "dark", onLinkClick }: SidebarProps) {
  const isLight = variant === "light";

  return (
    <div className="flex flex-col h-full">
      <div className={`p-4 sm:p-6 border-b ${isLight ? "border-slate-200" : "border-white/10"}`}>
        <h2 className={`text-base font-semibold ${isLight ? "text-slate-900" : "text-slate-100"}`}>
          منوی کاربری
        </h2>
      </div>
      <nav className="py-2 sm:py-4 flex-1 overflow-y-auto">
        {panelMenu.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {section.title && (
              <div
                className={`px-4 sm:px-6 py-2 sm:py-3 text-xs font-medium uppercase tracking-wider ${
                  isLight ? "text-slate-500" : "text-slate-500"
                }`}
              >
                {section.title}
              </div>
            )}
            {section.items.map((item) => (
              <SidebarItem key={item.key} item={item} variant={variant} onLinkClick={onLinkClick} />
            ))}
          </div>
        ))}
      </nav>
    </div>
  );
}
