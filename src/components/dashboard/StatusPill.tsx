type StatusPillProps = {
  status: "pending" | "processing" | "done" | "failed";
  children: React.ReactNode;
};

export default function StatusPill({ status, children }: StatusPillProps) {
  const statusStyles = {
    pending: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    processing: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    done: "bg-green-500/20 text-green-300 border-green-500/30",
    failed: "bg-red-500/20 text-red-300 border-red-500/30",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles[status]}`}
    >
      {children}
    </span>
  );
}





