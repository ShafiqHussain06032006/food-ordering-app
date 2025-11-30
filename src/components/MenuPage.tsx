import { useMemo, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Star, ShoppingCart, SlidersHorizontal } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { UserRole, UserSession } from "../types/auth";

interface MenuPageProps {
  onNavigate?: (page: string) => void;
  onAddToCart?: (dish: any) => void;
  cartItemCount?: number;
  vendorProducts?: VendorProduct[];
  user?: UserSession | null;
  onSignIn?: (role?: UserRole) => void;
  onSignOut?: () => void;
}

interface MenuDish {
  id: number;
  name: string;
  subName: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  isVendorItem?: boolean;
}

interface VendorProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description?: string;
}

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1080&q=80";

const baseDishes: MenuDish[] = [
  {
    id: 1,
    name: "Garlic",
    subName: "Mushroom",
    description:
      "Food provides essential nutrients for overall health and well-being.",
    price: 14,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1683543124242-3a29ea479949?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNocm9vbSUyMGdhcmxpYyUyMGRpc2h8ZW58MXx8fHwxNzYzODI3NDI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Pasta",
  },
  {
    id: 2,
    name: "Club",
    subName: "Sandwich",
    description:
      "Food provides essential nutrients for overall health and well-being.",
    price: 12,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1722178371506-db8321e89401?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW5kd2ljaCUyMGZvb2QlMjBkaXNofGVufDF8fHx8MTc2MzgyNzQyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Sandwich",
  },
  {
    id: 3,
    name: "Creamy",
    subName: "Pasta",
    description:
      "Food provides essential nutrients for overall health and well-being.",
    price: 18,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1643283145933-daf46675b96a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMHBsYXRlJTIwaXRhbGlhbnxlbnwxfHx8fDE3NjM4Mjc0MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Pasta",
  },
  {
    id: 4,
    name: "Spicy",
    subName: "Noodles",
    description:
      "Food provides essential nutrients for overall health and well-being.",
    price: 15,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1635685296916-95acaf58471f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub29kbGVzJTIwYXNpYW4lMjBmb29kfGVufDF8fHx8MTc2MzcxMDU5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Noodles",
  },
  {
    id: 5,
    name: "Fresh Garden",
    subName: "Salad",
    description:
      "Food provides essential nutrients for overall health and well-being.",
    price: 10,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1620019989479-d52fcedd99fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNhbGFkJTIwYm93bHxlbnwxfHx8fDE3NjM3ODA0MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Salad",
  },
  {
    id: 6,
    name: "Veggie",
    subName: "Rolls",
    description:
      "Food provides essential nutrients for overall health and well-being.",
    price: 13,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1761095596588-08a210ec0993?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2xscyUyMGZvb2QlMjB3cmFwfGVufDF8fHx8MTc2MzgyNzQyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Rolls",
  },
];

export function MenuPage({
  onNavigate,
  onAddToCart,
  cartItemCount = 0,
  vendorProducts = [],
  user,
  onSignIn,
  onSignOut,
}: MenuPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showVendorOnly, setShowVendorOnly] = useState(false);

  const vendorDishes = useMemo<MenuDish[]>(
    () =>
      vendorProducts.map((product) => ({
        id: product.id,
        name: product.name,
        subName: product.category,
        description:
          product.description ||
          "Freshly curated by your favorite campus vendors.",
        price: product.price,
        rating: 5,
        image: product.image || PLACEHOLDER_IMAGE,
        category: product.category || "Chef Specials",
        isVendorItem: true,
      })),
    [vendorProducts]
  );

  const allDishes = useMemo<MenuDish[]>(
    () => [...baseDishes, ...vendorDishes],
    [vendorDishes]
  );

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(new Set(allDishes.map((dish) => dish.category))),
    ],
    [allDishes]
  );

  const handleAddToCart = (dish: any) => {
    if (onAddToCart) {
      onAddToCart(dish);
    }
  };

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredDishes = allDishes.filter((dish) => {
    if (showVendorOnly && !dish.isVendorItem) {
      return false;
    }

    if (selectedCategory !== "All" && dish.category !== selectedCategory) {
      return false;
    }

    if (normalizedSearch.length > 0) {
      const haystack =
        `${dish.name} ${dish.subName} ${dish.description}`.toLowerCase();
      if (!haystack.includes(normalizedSearch)) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header
        showCustomerPanel
        currentPage="menu"
        onNavigate={onNavigate}
        showBackButton
        backTo="home"
        backLabel="Back to Home"
        cartItemCount={cartItemCount}
        user={user}
        onSignInClick={onSignIn}
        onSignOut={onSignOut}
      />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-[#333333] mb-12">Explore our menu</h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Column - Categories */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-6 space-y-6">
                <div>
                  <h2 className="text-[#333333] mb-4 flex items-center gap-2">
                    <SlidersHorizontal className="size-4 text-[#FF8C00]" />
                    Filters
                  </h2>
                  <Input
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search dishes..."
                    className="w-full"
                  />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-[#999999] mb-3">
                    Categories
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={
                          selectedCategory === category ? "default" : "outline"
                        }
                        onClick={() => setSelectedCategory(category)}
                        className={
                          selectedCategory === category
                            ? "bg-[#FF8C00] hover:bg-[#E67E00]"
                            : "border-[#FF8C00] text-[#FF8C00] hover:bg-[#FF8C00]/10"
                        }
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <label className="flex items-center gap-3 text-[#333333] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showVendorOnly}
                      onChange={(e) => setShowVendorOnly(e.target.checked)}
                      className="size-4 accent-[#FF8C00]"
                    />
                    Show vendor specials only
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column - Dishes */}
            <div className="lg:col-span-3">
              <h2 className="text-[#333333] mb-6">Top dishes near you</h2>

              {filteredDishes.length === 0 ? (
                <div className="border border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <p className="text-[#666666] mb-3">
                    No dishes match your filters.
                  </p>
                  <Button
                    variant="outline"
                    className="border-[#FF8C00] text-[#FF8C00] hover:bg-[#FF8C00] hover:text-white"
                    onClick={() => {
                      setShowVendorOnly(false);
                      setSelectedCategory("All");
                      setSearchTerm("");
                    }}
                  >
                    Reset filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredDishes.map((dish) => (
                    <div
                      key={`${dish.id}-${
                        dish.isVendorItem ? "vendor" : "base"
                      }`}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="aspect-video bg-gray-100">
                        <ImageWithFallback
                          src={dish.image}
                          alt={`${dish.name} ${dish.subName}`}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="p-4">
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <div>
                            <h3 className="text-[#333333]">{dish.name}</h3>
                            <p className="text-[#FF8C00]">{dish.subName}</p>
                          </div>
                          {dish.isVendorItem && (
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                              New from vendor
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(dish.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="size-4 fill-[#FFD700] text-[#FFD700]"
                            />
                          ))}
                        </div>

                        <p className="text-[#666666] mb-4">
                          {dish.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-[#FF8C00]">{dish.price}Rs</span>
                          <Button
                            onClick={() => handleAddToCart(dish)}
                            className="bg-[#FF8C00] hover:bg-[#E67E00] text-white px-4 py-2 rounded-lg flex items-center gap-2"
                          >
                            <ShoppingCart className="size-4" />
                            <span className="text-sm">Add to Cart</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
