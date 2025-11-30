import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { Button } from "./components/ui/button";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { MenuPage } from "./components/MenuPage";
import { CartPage } from "./components/CartPage";
import { VendorHome } from "./components/VendorHome";
import { VendorAddItems } from "./components/VendorAddItems";
import { VendorListItems } from "./components/VendorListItems";
import { VendorOrders } from "./components/VendorOrders";
import { AdminPanel } from "./components/AdminPanel";
import { toast } from "sonner";
import { Toaster } from "./components/ui/sonner";
import { ShoppingBag, Store, Shield } from "lucide-react";
import { AuthDialog } from "./components/AuthDialog";
import { UserRole, UserSession } from "./types/auth";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description?: string;
}

type Page =
  | "home"
  | "menu"
  | "cart"
  | "vendor-home"
  | "vendor-add"
  | "vendor-list"
  | "vendor-order"
  | "admin";

const PAGE_ROLE_REQUIREMENTS: Partial<Record<Page, UserRole>> = {
  "vendor-home": "vendor",
  "vendor-add": "vendor",
  "vendor-list": "vendor",
  "vendor-order": "vendor",
  admin: "admin",
};

const CART_STORAGE_KEY = "gikibites-cart";
const VENDOR_PRODUCTS_STORAGE_KEY = "gikibites-vendor-products";
const VENDOR_ORDERS_STORAGE_KEY = "gikibites-vendor-orders";
const USER_STORAGE_KEY = "gikibites-user";

type OrderStatus = "Food Processing" | "On the way" | "Delivered";

interface VendorOrder {
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

const initialVendorOrders: VendorOrder[] = [
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

const hasWindow = () => typeof window !== "undefined";

const readFromStorage = <T,>(key: string, fallback: T): T => {
  if (!hasWindow()) {
    return fallback;
  }

  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch (error) {
    console.warn(`Failed to parse localStorage key "${key}"`, error);
    return fallback;
  }
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [cartItems, setCartItems] = useState<CartItem[]>(() =>
    readFromStorage(CART_STORAGE_KEY, [])
  );
  const [vendorProducts, setVendorProducts] = useState<Product[]>(() =>
    readFromStorage(VENDOR_PRODUCTS_STORAGE_KEY, [])
  );
  const [vendorOrders, setVendorOrders] = useState<VendorOrder[]>(() =>
    readFromStorage(VENDOR_ORDERS_STORAGE_KEY, initialVendorOrders)
  );
  const [user, setUser] = useState<UserSession | null>(() =>
    readFromStorage(USER_STORAGE_KEY, null)
  );
  const [isAuthDialogOpen, setAuthDialogOpen] = useState(false);
  const [pendingPage, setPendingPage] = useState<Page | null>(null);
  const [authRoleHint, setAuthRoleHint] = useState<UserRole>("customer");
  const [authAllowedRoles, setAuthAllowedRoles] = useState<UserRole[] | undefined>();

  useEffect(() => {
    if (!hasWindow()) return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (!hasWindow()) return;
    window.localStorage.setItem(
      VENDOR_PRODUCTS_STORAGE_KEY,
      JSON.stringify(vendorProducts)
    );
  }, [vendorProducts]);

  useEffect(() => {
    if (!hasWindow()) return;
    window.localStorage.setItem(
      VENDOR_ORDERS_STORAGE_KEY,
      JSON.stringify(vendorOrders)
    );
  }, [vendorOrders]);

  useEffect(() => {
    if (!hasWindow()) return;
    if (user) {
      window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  const requestAuth = (
    role: UserRole = "customer",
    page: Page | null = null,
    allowedRoles?: UserRole[]
  ) => {
    setAuthRoleHint(role);
    setPendingPage(page);
    setAuthAllowedRoles(allowedRoles);
    setAuthDialogOpen(true);
  };

  const handleNavigate = (page: string) => {
    const targetPage = page as Page;
    const requiredRole = PAGE_ROLE_REQUIREMENTS[targetPage];

    if (requiredRole && user?.role !== requiredRole) {
      toast.error(`Please sign in as a ${requiredRole} to access this area.`);
      requestAuth(requiredRole, targetPage, [requiredRole]);
      return;
    }

    setCurrentPage(targetPage);
  };

  const handleSignInClick = (role: UserRole = "customer") => {
    requestAuth(role, null);
  };

  const handleAuthSubmit = (session: UserSession) => {
    setUser(session);
    toast.success(`Signed in as ${session.role}.`);
    setAuthDialogOpen(false);

    if (pendingPage) {
      const requiredRole = PAGE_ROLE_REQUIREMENTS[pendingPage];
      if (!requiredRole || requiredRole === session.role) {
        setCurrentPage(pendingPage);
        setPendingPage(null);
      } else {
        toast.error(`That area requires a ${requiredRole}.`);
      }
    }
  };

  const handleSignOut = () => {
    setUser(null);
    toast.success("Signed out successfully.");
    const requiredRole = PAGE_ROLE_REQUIREMENTS[currentPage];
    if (requiredRole) {
      setCurrentPage("home");
    }
  };

  const handleAddToCart = (dish: any) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === dish.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
    setCurrentPage("cart");
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleAddProduct = (product: Product) => {
    setVendorProducts((prev) => [...prev, product]);
    toast.success("Product added successfully!");
  };

  const handleDeleteProduct = (id: number) => {
    setVendorProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const handleUpdateOrderStatus = (orderId: number, newStatus: OrderStatus) => {
    setVendorOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast.success(`Order #${orderId} marked as ${newStatus}.`);
  };

  let pageContent: ReactNode;

  if (currentPage === "admin") {
    pageContent = (
      <AdminPanel
        onNavigate={handleNavigate}
        user={user}
        onSignIn={handleSignInClick}
        onSignOut={handleSignOut}
      />
    );
  } else if (currentPage === "vendor-home") {
    pageContent = (
      <VendorHome
        onNavigate={handleNavigate}
        user={user}
        onSignIn={handleSignInClick}
        onSignOut={handleSignOut}
      />
    );
  } else if (currentPage === "vendor-add") {
    pageContent = (
      <VendorAddItems
        onNavigate={handleNavigate}
        onAddProduct={handleAddProduct}
        user={user}
        onSignIn={handleSignInClick}
        onSignOut={handleSignOut}
      />
    );
  } else if (currentPage === "vendor-list") {
    pageContent = (
      <VendorListItems
        onNavigate={handleNavigate}
        products={vendorProducts}
        onDeleteProduct={handleDeleteProduct}
        user={user}
        onSignIn={handleSignInClick}
        onSignOut={handleSignOut}
      />
    );
  } else if (currentPage === "vendor-order") {
    pageContent = (
      <VendorOrders
        onNavigate={handleNavigate}
        orders={vendorOrders}
        onUpdateStatus={handleUpdateOrderStatus}
        user={user}
        onSignIn={handleSignInClick}
        onSignOut={handleSignOut}
      />
    );
  } else if (currentPage === "menu") {
    pageContent = (
      <MenuPage
        onNavigate={handleNavigate}
        onAddToCart={handleAddToCart}
        cartItemCount={cartItems.length}
        vendorProducts={vendorProducts}
        user={user}
        onSignIn={handleSignInClick}
        onSignOut={handleSignOut}
      />
    );
  } else if (currentPage === "cart") {
    pageContent = (
      <CartPage
        onNavigate={handleNavigate}
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
        cartItemCount={cartItems.length}
        user={user}
        onSignIn={handleSignInClick}
        onSignOut={handleSignOut}
      />
    );
  } else {
    pageContent = (
      <div className="min-h-screen bg-white">
        <Header
          currentPage="home"
          onNavigate={handleNavigate}
          user={user}
          onSignInClick={handleSignInClick}
          onSignOut={handleSignOut}
        />

        <section className="relative h-[600px] flex items-center justify-center">
          <div className="absolute inset-0">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1663861623497-2151b2bb21fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpY2lvdXMlMjBmb29kJTIwcGxhdGUlMjByZXN0YXVyYW50fGVufDF8fHx8MTc2MzgyNzA3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Delicious food"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
            <h1 className="mb-6">Order your favourite food here</h1>
            <p className="text-white/90 mb-8 max-w-3xl mx-auto">
              Choice from a diverse menu featuring a delectable array of dishes
              crafted with the finest ingredients and culinary expertise. We
              satisfy your cravings and elevate your dining experience, one
              delicious meal at a time.
            </p>

            <div className="mb-8">
              <Button
                onClick={() => handleNavigate("menu")}
                className="bg-[#FF8C00] hover:bg-[#E67E00] text-white px-10 py-7 rounded-lg shadow-lg flex items-center gap-3 mx-auto"
              >
                <ShoppingBag className="w-5 h-5" />
                View Menu & Order Now
              </Button>
            </div>

            {(user?.role === "vendor" || user?.role === "admin") && (
              <div className="pt-6 border-t border-white/20">
                <p className="text-sm text-white/70 mb-4">Access Portal For:</p>
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  {user?.role === "vendor" && (
                    <Button
                      onClick={() => handleNavigate("vendor-home")}
                      variant="outline"
                      className="border-white/60 text-white hover:bg-white hover:text-[#FF8C00] px-6 py-6 rounded-lg backdrop-blur-sm bg-white/10 flex items-center gap-2"
                    >
                      <Store className="w-5 h-5" />
                      <div className="flex flex-col items-start">
                        <span>Vendor Dashboard</span>
                        <span className="text-xs text-white/80">
                          Manage your restaurant
                        </span>
                      </div>
                    </Button>
                  )}
                  {user?.role === "admin" && (
                    <Button
                      onClick={() => handleNavigate("admin")}
                      variant="outline"
                      className="border-white/60 text-white hover:bg-white hover:text-[#FF8C00] px-6 py-6 rounded-lg backdrop-blur-sm bg-white/10 flex items-center gap-2"
                    >
                      <Shield className="w-5 h-5" />
                      <div className="flex flex-col items-start">
                        <span>Admin Dashboard</span>
                        <span className="text-xs text-white/80">
                          Platform management
                        </span>
                      </div>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-[#333333] mb-12">
              For Better Experience Download
              <br />
              GIKIBITES
            </h2>

            <div className="flex items-center justify-center gap-6 flex-wrap">
              <Button
                variant="outline"
                className="border-[#FF8C00] text-[#333333] hover:bg-[#FF8C00] hover:text-white px-8 py-6 rounded-lg"
              >
                Play Store
              </Button>
              <Button
                variant="outline"
                className="border-[#FF8C00] text-[#333333] hover:bg-[#FF8C00] hover:text-white px-8 py-6 rounded-lg"
              >
                App Store
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <>
      {pageContent}
      <Toaster />
      <AuthDialog
        open={isAuthDialogOpen}
        onOpenChange={setAuthDialogOpen}
        defaultRole={authRoleHint}
        onSubmit={handleAuthSubmit}
        allowedRoles={authAllowedRoles}
      />
    </>
  );
}
