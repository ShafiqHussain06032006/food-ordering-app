import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { UserRole, UserSession } from "../types/auth";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultRole?: UserRole;
  onSubmit: (session: UserSession) => void;
  allowedRoles?: UserRole[];
}

const roleCopy: Record<UserRole, string> = {
  customer: "Browse and order meals",
  vendor: "Manage menus, inventory, and orders",
  admin: "Oversee vendors and approvals",
};

export function AuthDialog({
  open,
  onOpenChange,
  defaultRole = "customer",
  onSubmit,
  allowedRoles,
}: AuthDialogProps) {
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>(defaultRole);

  useEffect(() => {
    setRole(defaultRole);
  }, [defaultRole]);

  useEffect(() => {
    if (!open) {
      setName("");
      setRole(defaultRole);
    }
  }, [open, defaultRole]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim()) {
      return;
    }

    onSubmit({
      name: name.trim(),
      role,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Sign in to continue</DialogTitle>
          <DialogDescription>
            Choose how you want to explore GIKIBITES and we'll tailor the
            experience for you.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div>
            <Label htmlFor="auth-name" className="text-[#333333]">
              Name
            </Label>
            <Input
              id="auth-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g., Ayesha Khan"
              required
            />
          </div>
          <div>
            <Label htmlFor="auth-role" className="text-[#333333]">
              Sign in as
            </Label>
            {allowedRoles && allowedRoles.length === 1 ? (
              <div className="mt-2 p-3 rounded-md bg-gray-100 text-[#333333]">
                <p className="font-medium">{allowedRoles[0].charAt(0).toUpperCase() + allowedRoles[0].slice(1)}</p>
                <p className="mt-2 text-sm text-[#666666]">{roleCopy[allowedRoles[0]]}</p>
              </div>
            ) : (
              <>
                <select
                  id="auth-role"
                  value={role}
                  onChange={(event) => setRole(event.target.value as UserRole)}
                  className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
                >
                  {(!allowedRoles || allowedRoles.includes("customer")) && <option value="customer">Customer</option>}
                  {(!allowedRoles || allowedRoles.includes("vendor")) && <option value="vendor">Vendor</option>}
                  {(!allowedRoles || allowedRoles.includes("admin")) && <option value="admin">Admin</option>}
                </select>
                <p className="mt-2 text-sm text-[#666666]">{roleCopy[role]}</p>
              </>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-[#FF8C00] hover:bg-[#E67E00] text-white"
          >
            Continue as {role}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
