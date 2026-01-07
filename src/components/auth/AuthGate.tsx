"use client";

import { useEffect, useState } from "react";
import { getAuthFromCookie } from "@/lib/auth";
import AuthModal from "./AuthModal";

type AuthGateProps = {
  children: React.ReactNode;
};

export default function AuthGate({ children }: AuthGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check auth status on mount and when cookies change
    const checkAuth = () => {
      const auth = getAuthFromCookie();
      setIsAuthenticated(auth);
      setIsChecking(false);
    };

    checkAuth();

    // Check periodically for cookie changes (simple polling)
    const interval = setInterval(checkAuth, 500);

    return () => clearInterval(interval);
  }, []);

  // Show nothing while checking (prevents flash)
  if (isChecking) {
    return null;
  }

  // If not authenticated, show blurred content + modal
  if (!isAuthenticated) {
    return (
      <>
        {/* Blurred/disabled content */}
        <div className="blur-sm pointer-events-none select-none opacity-50">
          {children}
        </div>

        {/* Overlay and modal */}
        <AuthModal isOpen={true} onClose={() => {}} />
      </>
    );
  }

  // If authenticated, show normal content
  return <>{children}</>;
}


