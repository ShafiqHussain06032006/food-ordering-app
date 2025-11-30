import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { UserRole, UserSession } from "../types/auth";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartPageProps {
  onNavigate?: (page: string) => void;
  cartItems?: CartItem[];
  onRemoveItem?: (id: number) => void;
  onUpdateQuantity?: (id: number, quantity: number) => void;
  cartItemCount?: number;
  user?: UserSession | null;
  onSignIn?: (role?: UserRole) => void;
  onSignOut?: () => void;
}

export function CartPage({
  onNavigate,
  cartItems = [],
  onRemoveItem,
  onUpdateQuantity,
  cartItemCount = 0,
  user,
  onSignIn,
  onSignOut,
}: CartPageProps) {
  // Default cart items if none provided
  const defaultCartItems: CartItem[] = [
    {
      id: 1,
      name: "Mix Veg Pulao",
      price: 200,
      quantity: 3,
      image:
        "https://images.unsplash.com/photo-1505216980056-a7b7b1c6e000?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWxhbyUyMHJpY2UlMjBkaXNofGVufDF8fHx8MTc2MzgyNzQ2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 2,
      name: "Garlic Mushroom",
      price: 14,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1683543124242-3a29ea479949?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNocm9vbSUyMGdhcmxpYyUyMGRpc2h8ZW58MXx8fHwxNzYzODI3NDI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 3,
      name: "Creamy Pasta",
      price: 18,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1643283145933-daf46675b96a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMHBsYXRlJTIwaXRhbGlhbnxlbnwxfHx8fDE3NjM4Mjc0MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  const items = cartItems.length > 0 ? cartItems : defaultCartItems;

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  const handleRemove = (id: number) => {
    if (onRemoveItem) {
      onRemoveItem(id);
    }
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (onUpdateQuantity && quantity > 0) {
      onUpdateQuantity(id, quantity);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header
        showCustomerPanel
        currentPage="cart"
        onNavigate={onNavigate}
        showBackButton
        backTo="menu"
        backLabel="Back to Menu"
        cartItemCount={cartItemCount}
        user={user}
        onSignInClick={onSignIn}
        onSignOut={onSignOut}
      />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Cart Items */}
            <div className="lg:col-span-2">
              <h1 className="text-[#333333] mb-6">Cart</h1>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                {/* Table Header */}
                <div className="bg-gray-50 border-b border-gray-200">
                  <div className="grid grid-cols-12 gap-4 px-6 py-4">
                    <div className="col-span-4 text-[#333333]">Items</div>
                    <div className="col-span-2 text-[#333333]">Title</div>
                    <div className="col-span-2 text-[#333333]">Price</div>
                    <div className="col-span-2 text-[#333333]">Quantity</div>
                    <div className="col-span-1 text-[#333333]">Total</div>
                    <div className="col-span-1 text-[#333333]">Remove</div>
                  </div>
                </div>

                {/* Table Rows */}
                <div className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-12 gap-4 px-6 py-4 items-center"
                    >
                      <div className="col-span-4">
                        <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-100">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="col-span-2 text-[#333333]">
                        {item.name}
                      </div>
                      <div className="col-span-2 text-[#666666]">
                        {item.price}Rs
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              parseInt(e.target.value)
                            )
                          }
                          className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-[#333333]"
                        />
                      </div>
                      <div className="col-span-1 text-[#333333]">
                        {item.price * item.quantity}Rs
                      </div>
                      <div className="col-span-1">
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="text-[#FF8C00] hover:text-[#E67E00] transition-colors"
                        >
                          <X className="size-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-300 mt-6 pt-6" />
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-6">
                <h2 className="text-[#333333] mb-6">Cart Totals</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-[#666666]">
                    <span>Subtotal</span>
                    <span>{subtotal}Rs</span>
                  </div>

                  <div className="flex items-center justify-between text-[#666666]">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee}Rs</span>
                  </div>

                  <div className="border-t border-gray-300 pt-4">
                    <div className="flex items-center justify-between text-[#333333]">
                      <span>Total</span>
                      <span className="text-[#FF8C00]">{total}Rs</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-[#FF8C00] hover:bg-[#E67E00] text-white py-6">
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
