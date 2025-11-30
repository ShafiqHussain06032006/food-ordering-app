import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { UserRole, UserSession } from "../types/auth";

interface AdminHeaderProps {
  onNavigate?: (page: string) => void;
  user?: UserSession | null;
  onSignIn?: (role?: UserRole) => void;
  onSignOut?: () => void;
}

export function AdminHeader({
  onNavigate,
  user,
  onSignIn,
  onSignOut,
}: AdminHeaderProps) {
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
            {onNavigate && (
              <Button
                variant="ghost"
                onClick={() => onNavigate("home")}
                className="text-[#FF8C00] hover:text-[#E67E00] hover:bg-orange-50 gap-2 px-3"
              >
                <ArrowLeft className="size-5" />
                <span>Back to Home</span>
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
              className="text-[#333333] hover:text-[#FF8C00] transition-colors"
            >
              home
            </button>
            <button
              onClick={() => handleNavClick("menu")}
              className="text-[#333333] hover:text-[#FF8C00] transition-colors"
            >
              menu
            </button>
            <a
              href="#mobile-app"
              className="text-[#333333] hover:text-[#FF8C00] transition-colors"
            >
              mobile app
            </a>
          </nav>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-[#666666]">
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
              onClick={() => onSignIn?.("admin")}
            >
              Sign in
            </Button>
          )}
        </div>
      </div>

      <div className="bg-[#FF8C00] text-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h2 className="text-white">Admin's Panel</h2>
        </div>
      </div>
    </header>
  );
}
