type StatCardProps = {
  title: string;
  value: string;
  trend?: string;
  icon?: React.ReactNode;
};

export default function StatCard({ title, value, trend, icon }: StatCardProps) {
  return (
    <div className="glass-card p-6 rounded-xl hover:scale-[1.02] transition-transform duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm text-gray-400 mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
      {trend && (
        <p className="text-xs text-green-400 font-medium">{trend}</p>
      )}
    </div>
  );
}





