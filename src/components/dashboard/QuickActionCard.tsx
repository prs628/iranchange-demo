import Link from "next/link";

type QuickActionCardProps = {
  title: string;
  href: string;
  icon?: React.ReactNode;
  description?: string;
};

export default function QuickActionCard({
  title,
  href,
  icon,
  description,
}: QuickActionCardProps) {
  return (
    <Link
      href={href}
      className="glass-card p-5 rounded-xl hover:scale-[1.02] hover:border-white/20 transition-all duration-200 block group"
    >
      <div className="flex items-center gap-4">
        {icon && (
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-base font-semibold text-white mb-1">{title}</h3>
          {description && (
            <p className="text-xs text-gray-400">{description}</p>
          )}
        </div>
      </div>
    </Link>
  );
}





