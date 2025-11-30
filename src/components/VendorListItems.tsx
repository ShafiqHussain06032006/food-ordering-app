import { VendorHeader } from "./VendorHeader";
import { Footer } from "./Footer";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Trash2, Edit } from "lucide-react";
import { Button } from "./ui/button";
import { UserRole, UserSession } from "../types/auth";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

interface VendorListItemsProps {
  onNavigate?: (page: string) => void;
  products?: Product[];
  onDeleteProduct?: (id: number) => void;
  user?: UserSession | null;
  onSignIn?: (role?: UserRole) => void;
  onSignOut?: () => void;
}

export function VendorListItems({
  onNavigate,
  products = [],
  onDeleteProduct,
  user,
  onSignIn,
  onSignOut,
}: VendorListItemsProps) {
  // Default products if none provided
  const defaultProducts: Product[] = [
    {
      id: 1,
      name: "Sada Pulao",
      category: "Pulao",
      price: 200,
      image:
        "https://images.unsplash.com/photo-1505216980056-a7b7b1c6e000?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWxhbyUyMHJpY2UlMjBkaXNofGVufDF8fHx8MTc2MzgyNzQ2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 2,
      name: "Chicken Biryani",
      category: "Biryani",
      price: 350,
      image:
        "https://images.unsplash.com/photo-1666190092689-e3968aa0c32c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ5YW5pJTIwcmljZSUyMGRpc2h8ZW58MXx8fHwxNzYzNzkxNjc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 3,
      name: "Club Sandwich",
      category: "Sandwich",
      price: 150,
      image:
        "https://images.unsplash.com/photo-1722178371506-db8321e89401?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW5kd2ljaCUyMGZvb2QlMjBkaXNofGVufDF8fHx8MTc2MzgyNzQyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 4,
      name: "Garlic Mushroom",
      category: "Pasta",
      price: 180,
      image:
        "https://images.unsplash.com/photo-1683543124242-3a29ea479949?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNocm9vbSUyMGdhcmxpYyUyMGRpc2h8ZW58MXx8fHwxNzYzODI3NDI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  const displayProducts = products.length > 0 ? products : defaultProducts;

  const handleDelete = (id: number) => {
    if (onDeleteProduct) {
      onDeleteProduct(id);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <VendorHeader
        currentTab="list"
        onNavigate={onNavigate}
        user={user}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
      />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-[#333333] mb-8">All Food List</h1>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-50 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-4 px-6 py-4">
                <div className="col-span-2 text-[#333333]">Image</div>
                <div className="col-span-4 text-[#333333]">Name</div>
                <div className="col-span-3 text-[#333333]">Category</div>
                <div className="col-span-2 text-[#333333]">Price</div>
                <div className="col-span-1 text-[#333333]">Actions</div>
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-gray-200">
              {displayProducts.map((product) => (
                <div
                  key={product.id}
                  className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors"
                >
                  <div className="col-span-2">
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="col-span-4 text-[#333333]">
                    {product.name}
                  </div>
                  <div className="col-span-3 text-[#666666]">
                    {product.category}
                  </div>
                  <div className="col-span-2 text-[#333333]">
                    {product.price}Rs
                  </div>
                  <div className="col-span-1 flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#FF8C00] hover:text-[#E67E00] hover:bg-orange-50 p-2"
                    >
                      <Edit className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
