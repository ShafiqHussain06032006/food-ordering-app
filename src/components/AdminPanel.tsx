import { useState } from "react";
import { AdminHeader } from "./AdminHeader";
import { Footer } from "./Footer";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Search,
  Clock,
  DollarSign,
  UserPlus,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { UserRole, UserSession } from "../types/auth";

interface Vendor {
  id: number;
  name: string;
  cuisines: string;
  estimatedTime: string;
  minOrder: number;
  type: "Veg" | "Non-veg";
  status?: "active" | "pending";
}

interface AdminPanelProps {
  onNavigate?: (page: string) => void;
  user?: UserSession | null;
  onSignIn?: (role?: UserRole) => void;
  onSignOut?: () => void;
}

const initialVendors: Vendor[] = [
  {
    id: 1,
    name: "Spice Garden Restaurant",
    cuisines: "Pakistani, Indian, Continental",
    estimatedTime: "20 min",
    minOrder: 150,
    type: "Veg",
    status: "active",
  },
  {
    id: 2,
    name: "Hostel Canteen",
    cuisines: "Fast Food, Desi",
    estimatedTime: "15 min",
    minOrder: 100,
    type: "Non-veg",
    status: "active",
  },
  {
    id: 3,
    name: "Campus Cafe",
    cuisines: "Cafe, Snacks, Beverages",
    estimatedTime: "10 min",
    minOrder: 80,
    type: "Veg",
    status: "active",
  },
  {
    id: 4,
    name: "Tandoor House",
    cuisines: "BBQ, Grilled, Pakistani",
    estimatedTime: "25 min",
    minOrder: 200,
    type: "Non-veg",
    status: "active",
  },
  {
    id: 5,
    name: "Green Leaf Kitchen",
    cuisines: "Vegan, Healthy, Salads",
    estimatedTime: "18 min",
    minOrder: 120,
    type: "Veg",
    status: "active",
  },
  {
    id: 6,
    name: "Biryani Palace",
    cuisines: "Biryani, Pulao, Rice Dishes",
    estimatedTime: "30 min",
    minOrder: 250,
    type: "Non-veg",
    status: "active",
  },
];

const initialPendingVendors: Vendor[] = [
  {
    id: 101,
    name: "Pizza Corner",
    cuisines: "Italian, Pizza, Pasta",
    estimatedTime: "22 min",
    minOrder: 180,
    type: "Non-veg",
    status: "pending",
  },
  {
    id: 102,
    name: "Healthy Bites",
    cuisines: "Salads, Smoothies, Wraps",
    estimatedTime: "12 min",
    minOrder: 90,
    type: "Veg",
    status: "pending",
  },
];

export function AdminPanel({
  onNavigate,
  user,
  onSignIn,
  onSignOut,
}: AdminPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"All" | "Veg" | "Non-veg">(
    "All"
  );
  const [activeTab, setActiveTab] = useState<"active" | "pending">("active");
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors);
  const [pendingVendors, setPendingVendors] = useState<Vendor[]>(
    initialPendingVendors
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newVendorForm, setNewVendorForm] = useState({
    name: "",
    cuisines: "",
    estimatedTime: "",
    minOrder: "",
    type: "Veg" as "Veg" | "Non-veg",
  });

  const handleApproveVendor = (vendorId: number) => {
    const vendor = pendingVendors.find((v) => v.id === vendorId);
    if (vendor) {
      setVendors([...vendors, { ...vendor, status: "active" }]);
      setPendingVendors(pendingVendors.filter((v) => v.id !== vendorId));
      toast.success(`${vendor.name} has been approved!`);
    }
  };

  const handleRejectVendor = (vendorId: number) => {
    const vendor = pendingVendors.find((v) => v.id === vendorId);
    setPendingVendors(pendingVendors.filter((v) => v.id !== vendorId));
    toast.error(`${vendor?.name} application has been rejected.`);
  };

  const handleAddVendor = () => {
    if (
      !newVendorForm.name ||
      !newVendorForm.cuisines ||
      !newVendorForm.estimatedTime ||
      !newVendorForm.minOrder
    ) {
      toast.error("Please fill all fields");
      return;
    }

    const newVendor: Vendor = {
      id: Date.now(),
      name: newVendorForm.name,
      cuisines: newVendorForm.cuisines,
      estimatedTime: newVendorForm.estimatedTime,
      minOrder: parseInt(newVendorForm.minOrder),
      type: newVendorForm.type,
      status: "active",
    };

    setVendors([...vendors, newVendor]);
    setIsAddDialogOpen(false);
    setNewVendorForm({
      name: "",
      cuisines: "",
      estimatedTime: "",
      minOrder: "",
      type: "Veg",
    });
    toast.success("Vendor added successfully!");
  };

  const displayVendors = activeTab === "active" ? vendors : pendingVendors;
  const filteredVendors = displayVendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.cuisines.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "All" || vendor.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AdminHeader
        onNavigate={onNavigate}
        user={user}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
      />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Header with Tabs and Add Button */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Button
                variant={activeTab === "active" ? "default" : "outline"}
                onClick={() => setActiveTab("active")}
                className={
                  activeTab === "active"
                    ? "bg-[#FF8C00] hover:bg-[#E67E00] text-white"
                    : "border-[#FF8C00] text-[#FF8C00] hover:bg-[#FF8C00] hover:text-white"
                }
              >
                Active Vendors ({vendors.length})
              </Button>
              <Button
                variant={activeTab === "pending" ? "default" : "outline"}
                onClick={() => setActiveTab("pending")}
                className={
                  activeTab === "pending"
                    ? "bg-[#FF8C00] hover:bg-[#E67E00] text-white"
                    : "border-[#FF8C00] text-[#FF8C00] hover:bg-[#FF8C00] hover:text-white"
                }
              >
                Pending Approvals ({pendingVendors.length})
              </Button>
            </div>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#FF8C00] hover:bg-[#E67E00] text-white flex items-center gap-2">
                  <UserPlus className="size-4" />
                  Add New Vendor
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Vendor</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label htmlFor="name">Restaurant Name</Label>
                    <Input
                      id="name"
                      value={newVendorForm.name}
                      onChange={(e) =>
                        setNewVendorForm({
                          ...newVendorForm,
                          name: e.target.value,
                        })
                      }
                      placeholder="Enter restaurant name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cuisines">Cuisines</Label>
                    <Input
                      id="cuisines"
                      value={newVendorForm.cuisines}
                      onChange={(e) =>
                        setNewVendorForm({
                          ...newVendorForm,
                          cuisines: e.target.value,
                        })
                      }
                      placeholder="e.g., Italian, Chinese, Fast Food"
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Estimated Delivery Time</Label>
                    <Input
                      id="time"
                      value={newVendorForm.estimatedTime}
                      onChange={(e) =>
                        setNewVendorForm({
                          ...newVendorForm,
                          estimatedTime: e.target.value,
                        })
                      }
                      placeholder="e.g., 20 min"
                    />
                  </div>
                  <div>
                    <Label htmlFor="minOrder">Minimum Order (Rs.)</Label>
                    <Input
                      id="minOrder"
                      type="number"
                      value={newVendorForm.minOrder}
                      onChange={(e) =>
                        setNewVendorForm({
                          ...newVendorForm,
                          minOrder: e.target.value,
                        })
                      }
                      placeholder="e.g., 150"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <select
                      id="type"
                      value={newVendorForm.type}
                      onChange={(e) =>
                        setNewVendorForm({
                          ...newVendorForm,
                          type: e.target.value as "Veg" | "Non-veg",
                        })
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      <option value="Veg">Veg</option>
                      <option value="Non-veg">Non-veg</option>
                    </select>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleAddVendor}
                      className="flex-1 bg-[#FF8C00] hover:bg-[#E67E00] text-white"
                    >
                      Add Vendor
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search and Filter Bar */}
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#666666]" />
              <Input
                type="text"
                placeholder="Searching Vendors ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-6"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-3 flex-wrap">
              <Button
                variant={activeFilter === "All" ? "default" : "outline"}
                onClick={() => setActiveFilter("All")}
                className={
                  activeFilter === "All"
                    ? "bg-[#FF8C00] hover:bg-[#E67E00] text-white"
                    : "border-[#FF8C00] text-[#FF8C00] hover:bg-[#FF8C00] hover:text-white"
                }
              >
                All
              </Button>
              <Button
                variant={activeFilter === "Veg" ? "default" : "outline"}
                onClick={() => setActiveFilter("Veg")}
                className={
                  activeFilter === "Veg"
                    ? "bg-[#FF8C00] hover:bg-[#E67E00] text-white"
                    : "border-[#FF8C00] text-[#FF8C00] hover:bg-[#FF8C00] hover:text-white"
                }
              >
                Veg
              </Button>
              <Button
                variant={activeFilter === "Non-veg" ? "default" : "outline"}
                onClick={() => setActiveFilter("Non-veg")}
                className={
                  activeFilter === "Non-veg"
                    ? "bg-[#FF8C00] hover:bg-[#E67E00] text-white"
                    : "border-[#FF8C00] text-[#FF8C00] hover:bg-[#FF8C00] hover:text-white"
                }
              >
                Non-veg
              </Button>
              <Button
                variant="outline"
                className="border-[#FF8C00] text-[#FF8C00] hover:bg-[#FF8C00] hover:text-white"
              >
                Filters
              </Button>
            </div>
          </div>

          {/* Vendor's List */}
          <div className="mt-8">
            <h2 className="text-[#333333] mb-6">
              {activeTab === "active"
                ? "Active Vendor's List"
                : "Pending Vendor Applications"}
            </h2>

            <div className="space-y-4">
              {filteredVendors.map((vendor) => (
                <div
                  key={vendor.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-[#333333] mb-2">{vendor.name}</h3>
                  <p className="text-[#666666] mb-3">
                    <span className="text-[#333333]">Cuisines:</span>{" "}
                    {vendor.cuisines}
                  </p>
                  <div className="flex items-center gap-6 text-[#666666] flex-wrap">
                    <div className="flex items-center gap-2">
                      <Clock className="size-4" />
                      <span>Est: {vendor.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="size-4" />
                      <span>Min. Order: Rs. {vendor.minOrder}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          vendor.type === "Veg"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {vendor.type}
                      </span>
                    </div>
                    {activeTab === "pending" && (
                      <div className="ml-auto flex gap-2">
                        <Button
                          onClick={() => handleApproveVendor(vendor.id)}
                          className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 px-4 py-2"
                        >
                          <CheckCircle className="size-4" />
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleRejectVendor(vendor.id)}
                          variant="outline"
                          className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white flex items-center gap-2 px-4 py-2"
                        >
                          <XCircle className="size-4" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {filteredVendors.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-[#666666]">
                    {activeTab === "pending"
                      ? "No pending vendor applications."
                      : "No vendors found matching your criteria."}
                  </p>
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
