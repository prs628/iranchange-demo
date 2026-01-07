export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // No layout wrapper - just render children directly
  // This prevents the admin layout from checking authentication
  return <>{children}</>;
}



