import { VendorHeader } from "./VendorHeader";
import { Footer } from "./Footer";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { User, MapPin, Phone } from "lucide-react";
import { UserRole, UserSession } from "../types/auth";

type OrderStatus = "Food Processing" | "On the way" | "Delivered";

interface Order {
  id: number;
  items: string[];
  itemCount: number;
  total: number;
  status: OrderStatus;
  customer: {
    name: string;
    address: string;
    phone: string;
  };
}

interface VendorOrdersProps {
  onNavigate?: (page: string) => void;
  orders?: Order[];
  onUpdateStatus?: (orderId: number, newStatus: OrderStatus) => void;
  user?: UserSession | null;
  onSignIn?: (role?: UserRole) => void;
  onSignOut?: () => void;
}

export function VendorOrders({
  onNavigate,
  orders = [],
  onUpdateStatus,
  user,
  onSignIn,
  onSignOut,
}: VendorOrdersProps) {
  // Default orders if none provided
  const defaultOrders: Order[] = [
    {
      id: 1,
      items: ["Pulao", "Sandwich"],
      itemCount: 2,
      total: 350,
      status: "Food Processing",
      customer: {
        name: "Shafiq Hussain",
        address: "Hostel 1, GIKI",
        phone: "+92-305-90-13-378",
      },
    },
    {
      id: 2,
      items: ["Biryani", "Pasta", "Salad"],
      itemCount: 3,
      total: 550,
      status: "Food Processing",
      customer: {
        name: "Ahmed Khan",
        address: "Hostel 3, GIKI",
        phone: "+92-300-12-34-567",
      },
    },
    {
      id: 3,
      items: ["Noodles"],
      itemCount: 1,
      total: 150,
      status: "On the way",
      customer: {
        name: "Sara Ali",
        address: "Faculty Colony, GIKI",
        phone: "+92-321-98-76-543",
      },
    },
  ];

  const displayOrders = orders.length > 0 ? orders : defaultOrders;
  const statusOptions: OrderStatus[] = [
    "Food Processing",
    "On the way",
    "Delivered",
  ];

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "Food Processing":
        return "bg-orange-100 text-orange-700 hover:bg-orange-100";
      case "On the way":
        return "bg-blue-100 text-blue-700 hover:bg-blue-100";
      case "Delivered":
        return "bg-green-100 text-green-700 hover:bg-green-100";
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-100";
    }
  };

  const handleUpdateStatus = (orderId: number, status: OrderStatus) => {
    if (onUpdateStatus) {
      onUpdateStatus(orderId, status);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <VendorHeader
        currentTab="order"
        onNavigate={onNavigate}
        user={user}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
      />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-[#333333] mb-8">Order Page</h1>

          <div className="space-y-6">
            {displayOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                {/* Order Summary */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-[#333333]">
                      {order.items.join(", ")}
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-[#666666]"
                    >
                      items: {order.itemCount}
                    </Badge>
                    <span className="text-[#FF8C00]">{order.total}Rs</span>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>

                {/* Customer Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <User className="size-4 text-[#666666]" />
                    <span className="text-[#333333]">
                      {order.customer.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4 text-[#666666]" />
                    <span className="text-[#666666]">
                      {order.customer.address}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="size-4 text-[#666666]" />
                    <span className="text-[#666666]">
                      {order.customer.phone}
                    </span>
                  </div>
                </div>

                {/* Action Controls */}
                <div className="flex flex-col gap-3 sm:flex-row">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleUpdateStatus(
                        order.id,
                        e.target.value as OrderStatus
                      )
                    }
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#FF8C00]"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <Button
                    onClick={() => handleUpdateStatus(order.id, "Delivered")}
                    disabled={order.status === "Delivered"}
                    className="w-full sm:w-auto bg-[#FF8C00] hover:bg-[#E67E00] disabled:bg-gray-300 disabled:text-gray-600"
                  >
                    Mark Delivered
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
