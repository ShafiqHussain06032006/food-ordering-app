import { Button } from "./ui/button";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { UserRole, UserSession } from "../types/auth";

interface HeaderProps {
  showCustomerPanel?: boolean;
  currentPage?: "home" | "menu" | "cart";
  onNavigate?: (page: string) => void;
  showBackButton?: boolean;
  backTo?: string;
  backLabel?: string;
  cartItemCount?: number;
  user?: UserSession | null;
  onSignInClick?: (role?: UserRole) => void;
  onSignOut?: () => void;
}

export function Header({
  showCustomerPanel = false,
  currentPage = "home",
  onNavigate,
  showBackButton = false,
  backTo = "home",
  backLabel = "Back",
  cartItemCount = 0,
  user,
  onSignInClick,
  onSignOut,
}: HeaderProps) {
  const handleNavClick = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBackButton && onNavigate && (
            <Button
              variant="ghost"
              onClick={() => onNavigate(backTo)}
              className="text-[#FF8C00] hover:text-[#E67E00] hover:bg-orange-50 gap-2 px-3"
            >
              <ArrowLeft className="size-5" />
              <span>{backLabel}</span>
            </Button>
          )}
          <button
            onClick={() => handleNavClick("home")}
            className="text-[#FF8C00] cursor-pointer"
          >
            GIKIBITES
          </button>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => handleNavClick("home")}
            className={`transition-colors ${
              currentPage === "home"
                ? "text-[#FF8C00]"
                : "text-[#333333] hover:text-[#FF8C00]"
            }`}
          >
            home
          </button>
          <button
            onClick={() => handleNavClick("menu")}
            className={`transition-colors ${
              currentPage === "menu"
                ? "text-[#FF8C00]"
                : "text-[#333333] hover:text-[#FF8C00]"
            }`}
          >
            menu
          </button>
          <a
            href="#mobile-app"
            className="text-[#333333] hover:text-[#FF8C00] transition-colors"
          >
            mobile app
          </a>
          <a
            href="#contact"
            className="text-[#333333] hover:text-[#FF8C00] transition-colors"
          >
            contact us
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {showCustomerPanel && onNavigate && (
            <Button
              variant="ghost"
              onClick={() => handleNavClick("cart")}
              className="relative text-[#FF8C00] hover:text-[#E67E00] hover:bg-orange-50"
            >
              <ShoppingCart className="size-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF8C00] text-white text-xs size-5 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Button>
          )}
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
              onClick={() => onSignInClick?.("customer")}
            >
              Sign in
            </Button>
          )}
        </div>
      </div>

      {showCustomerPanel && (
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <p className="text-[#666666]">Customer's Panel</p>
          </div>
        </div>
      )}
    </header>
  );
}
