import { useState } from "react";
import { VendorHeader } from "./VendorHeader";
import { Footer } from "./Footer";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Upload } from "lucide-react";
import { UserRole, UserSession } from "../types/auth";

interface VendorAddItemsProps {
  onNavigate?: (page: string) => void;
  onAddProduct?: (product: any) => void;
  user?: UserSession | null;
  onSignIn?: (role?: UserRole) => void;
  onSignOut?: () => void;
}

export function VendorAddItems({
  onNavigate,
  onAddProduct,
  user,
  onSignIn,
  onSignOut,
}: VendorAddItemsProps) {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Pulao");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      name: productName,
      description,
      category,
      price: parseFloat(price),
      image: image ? URL.createObjectURL(image) : "",
    };

    if (onAddProduct) {
      onAddProduct(newProduct);
    }

    // Reset form
    setProductName("");
    setDescription("");
    setCategory("Pulao");
    setPrice("");
    setImage(null);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <VendorHeader
        currentTab="add"
        onNavigate={onNavigate}
        user={user}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
      />

      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <h1 className="text-[#333333] mb-8">Add New Product</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Upload Image */}
            <div>
              <Label htmlFor="image" className="text-[#333333] mb-2 block">
                Upload Image
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-[#FF8C00] transition-colors cursor-pointer">
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label htmlFor="image" className="cursor-pointer">
                  <Upload className="size-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-[#666666]">
                    {image ? image.name : "Click to upload or drag & drop"}
                  </p>
                </label>
              </div>
            </div>

            {/* Product Name */}
            <div>
              <Label
                htmlFor="productName"
                className="text-[#333333] mb-2 block"
              >
                Product Name
              </Label>
              <Input
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g., Chicken Biryani"
                required
                className="w-full"
              />
            </div>

            {/* Product Description */}
            <div>
              <Label
                htmlFor="description"
                className="text-[#333333] mb-2 block"
              >
                Product Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your product..."
                rows={4}
                required
                className="w-full"
              />
            </div>

            {/* Category */}
            <div>
              <Label htmlFor="category" className="text-[#333333] mb-2 block">
                Category
              </Label>
              <Input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g., Pulao"
                required
                className="w-full"
              />
            </div>

            {/* Product Price */}
            <div>
              <Label htmlFor="price" className="text-[#333333] mb-2 block">
                Product Price
              </Label>
              <div className="relative">
                <Input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="200"
                  required
                  className="w-full pr-12"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666666]">
                  Rs
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#FF8C00] hover:bg-[#E67E00] text-white py-6"
            >
              ADD
            </Button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
