import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { UserRole, UserSession } from "../types/auth";

interface VendorHeaderProps {
  currentTab?: "add" | "list" | "order";
  onNavigate?: (page: string) => void;
  user?: UserSession | null;
  onSignIn?: (role?: UserRole) => void;
  onSignOut?: () => void;
}

export function VendorHeader({
  currentTab,
  onNavigate,
  user,
  onSignIn,
  onSignOut,
}: VendorHeaderProps) {
  const handleNavClick = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            {onNavigate && currentTab && (
              <Button
                variant="ghost"
                onClick={() => onNavigate("vendor-home")}
                className="text-[#FF8C00] hover:text-[#E67E00] hover:bg-orange-50 gap-2 px-3"
              >
                <ArrowLeft className="size-5" />
                <span>Back to Vendor Home</span>
              </Button>
            )}
            <button
              onClick={() => handleNavClick("vendor-home")}
              className="text-[#FF8C00] cursor-pointer"
            >
              GIKIBITES
            </button>
          </div>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden md:inline text-sm text-[#666666]">
                {user.name} · {user.role}
              </span>
              <Button
                variant="outline"
                className="border-[#FF8C00] text-[#FF8C00] hover:bg-[#FF8C00] hover:text-white"
                onClick={onSignOut}
              >
                Sign out
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              className="border-[#FF8C00] text-[#FF8C00] hover:bg-[#FF8C00] hover:text-white"
              onClick={() => onSignIn?.("vendor")}
            >
              Sign in
            </Button>
          )}
        </div>

        <p className="text-[#666666] mb-4">Vendor's Panel</p>

        <nav className="flex items-center gap-8 border-b border-gray-200">
          <button
            onClick={() => handleNavClick("vendor-add")}
            className={`pb-3 transition-colors border-b-2 ${
              currentTab === "add"
                ? "border-[#FF8C00] text-[#FF8C00]"
                : "border-transparent text-[#666666] hover:text-[#FF8C00]"
            }`}
          >
            Add items
          </button>
          <button
            onClick={() => handleNavClick("vendor-list")}
            className={`pb-3 transition-colors border-b-2 ${
              currentTab === "list"
                ? "border-[#FF8C00] text-[#FF8C00]"
                : "border-transparent text-[#666666] hover:text-[#FF8C00]"
            }`}
          >
            List items
          </button>
          <button
            onClick={() => handleNavClick("vendor-order")}
            className={`pb-3 transition-colors border-b-2 ${
              currentTab === "order"
                ? "border-[#FF8C00] text-[#FF8C00]"
                : "border-transparent text-[#666666] hover:text-[#FF8C00]"
            }`}
          >
            Order
          </button>
        </nav>
      </div>
    </header>
  );
}
