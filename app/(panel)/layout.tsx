import Sidebar from "@/components/panel/Sidebar";
import TopBar from "@/components/panel/TopBar";
import Footer from "@/components/panel/Footer";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-900">
      {/* Top Bar */}
      <TopBar />
      
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 hidden lg:block border-r border-white/10">
          <Sidebar />
        </aside>
        
        {/* Main content */}
        <main className="flex-1 overflow-auto min-w-0">
          {children}
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

