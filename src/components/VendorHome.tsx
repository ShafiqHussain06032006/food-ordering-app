import { VendorHeader } from "./VendorHeader";
import { Footer } from "./Footer";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Package,
  ClipboardList,
  PlusCircle,
  TrendingUp,
  DollarSign,
  ShoppingBag,
} from "lucide-react";
import { UserRole, UserSession } from "../types/auth";

interface VendorHomeProps {
  onNavigate?: (page: string) => void;
  user?: UserSession | null;
  onSignIn?: (role?: UserRole) => void;
  onSignOut?: () => void;
}

export function VendorHome({
  onNavigate,
  user,
  onSignIn,
  onSignOut,
}: VendorHomeProps) {
  const handleNavClick = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <VendorHeader
        onNavigate={onNavigate}
        user={user}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
      />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-[#333333] mb-3">Welcome to Vendor Dashboard</h1>
            <p className="text-[#666666]">
              Manage your restaurant, products, and orders all in one place
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-[#666666] flex items-center gap-2">
                  <TrendingUp className="size-4 text-[#FF8C00]" />
                  Total Sales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#333333]">Rs. 45,230</p>
                <p className="text-xs text-green-600 mt-1">
                  +12% from last week
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-[#666666] flex items-center gap-2">
                  <ShoppingBag className="size-4 text-[#FF8C00]" />
                  Total Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#333333]">248</p>
                <p className="text-xs text-green-600 mt-1">
                  +8% from last week
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-[#666666] flex items-center gap-2">
                  <DollarSign className="size-4 text-[#FF8C00]" />
                  Average Order
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#333333]">Rs. 182</p>
                <p className="text-xs text-gray-500 mt-1">Per order value</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-[#333333] mb-6">Quick Actions</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Add Items Card */}
              <Card
                className="border-gray-200 hover:border-[#FF8C00] hover:shadow-lg transition-all cursor-pointer"
                onClick={() => handleNavClick("vendor-add")}
              >
                <CardHeader>
                  <div className="size-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <PlusCircle className="size-6 text-[#FF8C00]" />
                  </div>
                  <CardTitle className="text-[#333333]">
                    Add New Items
                  </CardTitle>
                  <CardDescription className="text-[#666666]">
                    Add new food items to your menu and start selling
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavClick("vendor-add");
                    }}
                    className="w-full bg-[#FF8C00] hover:bg-[#E67E00] text-white"
                  >
                    Go to Add Items
                  </Button>
                </CardContent>
              </Card>

              {/* List Items Card */}
              <Card
                className="border-gray-200 hover:border-[#FF8C00] hover:shadow-lg transition-all cursor-pointer"
                onClick={() => handleNavClick("vendor-list")}
              >
                <CardHeader>
                  <div className="size-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <Package className="size-6 text-[#FF8C00]" />
                  </div>
                  <CardTitle className="text-[#333333]">
                    Manage Inventory
                  </CardTitle>
                  <CardDescription className="text-[#666666]">
                    View and manage your existing products and inventory
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavClick("vendor-list");
                    }}
                    variant="outline"
                    className="w-full border-[#FF8C00] text-[#FF8C00] hover:bg-[#FF8C00] hover:text-white"
                  >
                    View Inventory
                  </Button>
                </CardContent>
              </Card>

              {/* Orders Card */}
              <Card
                className="border-gray-200 hover:border-[#FF8C00] hover:shadow-lg transition-all cursor-pointer"
                onClick={() => handleNavClick("vendor-order")}
              >
                <CardHeader>
                  <div className="size-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <ClipboardList className="size-6 text-[#FF8C00]" />
                  </div>
                  <CardTitle className="text-[#333333]">
                    Manage Orders
                  </CardTitle>
                  <CardDescription className="text-[#666666]">
                    Track and manage customer orders in real-time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavClick("vendor-order");
                    }}
                    variant="outline"
                    className="w-full border-[#FF8C00] text-[#FF8C00] hover:bg-[#FF8C00] hover:text-white"
                  >
                    View Orders
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-12">
            <h2 className="text-[#333333] mb-6">Recent Activity</h2>
            <Card className="border-gray-200">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <p className="text-[#333333]">New order received</p>
                      <p className="text-sm text-[#666666]">
                        Order #1234 - Rs. 320
                      </p>
                    </div>
                    <span className="text-xs text-[#666666]">5 min ago</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <p className="text-[#333333]">
                        Product added successfully
                      </p>
                      <p className="text-sm text-[#666666]">
                        Chicken Biryani added to menu
                      </p>
                    </div>
                    <span className="text-xs text-[#666666]">1 hour ago</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-[#333333]">Order completed</p>
                      <p className="text-sm text-[#666666]">
                        Order #1233 - Rs. 280
                      </p>
                    </div>
                    <span className="text-xs text-[#666666]">2 hours ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
