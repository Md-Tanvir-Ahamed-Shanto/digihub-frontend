import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// Separator is imported but not used in the provided snippet, keeping for completeness
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  Mail, // Mail icon is imported but not used, keeping for completeness
  Lock, // Lock icon is imported but not used, keeping for completeness
  Plus,
  Trash2,
  Edit, // Edit icon is imported but not used, keeping for completeness
  Shield,
  Save,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axiosInstance from "@/api/axios";
import { useAuth } from "@/hooks/useAuth";

const ClientSettings = () => {
  // Destructure user from the authentication hook
  const { user } = useAuth();

  // State for email and password management
  const [email, setEmail] = useState(user?.email || ""); // Initialize with user email or empty string
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State for payment methods
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [showAddPayment, setShowAddPayment] = useState(false);

  // Hook for displaying toast notifications
  const { toast } = useToast();

  // State for new payment method form
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    holderName: "",
  });

  // Function to fetch payment methods from the API
  const fetchPaymentMethods = async () => {
    // Ensure user and user.id exist before making the API call
    if (!user || !user.id) {
      console.warn("User ID not available, skipping payment methods fetch.");
      return;
    }
    try {
      const response = await axiosInstance.get(`/card/${user.id}`);
      if (response.status === 200) {
        setPaymentMethods(response.data);
      }
    } catch (error) {
      // Handle errors during fetching payment methods
      console.error("Failed to fetch payment methods:", error);
      toast({
        title: "Error",
        description: "Failed to load payment methods.",
        variant: "destructive",
      });
    }
  };

  // Effect hook to fetch payment methods on component mount
  useEffect(() => {
    fetchPaymentMethods();
  }, [user]); // Re-run if user object changes (e.g., after initial load)

  // Handler for updating user credentials (email and password)
  const handleUpdateCredentials = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)

    // Validate password fields
    if (!currentPassword || !newPassword) {
      toast({
        title: "Error",
        description: "Please fill in all password fields.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Make API call to update credentials
      const response = await axiosInstance.post("/client/update-credentials", {
        email: email,
        currentPassword: currentPassword,
        password: newPassword,
      });

      // Check for successful response
      if (response.status === 200) {
        toast({
          title: "Credentials Updated",
          description: `${response.data.message}`,
        });
        // Clear password fields on successful update
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      // Handle API errors
      if (error.response) {
        // Server responded with a status other than 2xx
        toast({
          title: "Error",
          description: error.response.data.message || "An error occurred while updating credentials.",
          variant: "destructive",
        });
      } else if (error.request) {
        // Request was made but no response received
        toast({
          title: "Network Error",
          description: "No response from server. Please check your internet connection.",
          variant: "destructive",
        });
      } else {
        // Something else happened while setting up the request
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  // Handler for adding a new payment method
  const handleAddPaymentMethod = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const { cardNumber, expiryDate, cvv, holderName } = newPaymentMethod;

    // Basic validation for all fields
    if (!cardNumber || !expiryDate || !cvv || !holderName) {
      toast({
        title: "Error",
        description: "All fields are required.",
        variant: "destructive",
      });
      return;
    }

    // Validate card number (basic Luhn check pattern)
    const isValidCardNumber = /^[0-9]{13,19}$/.test(cardNumber);
    if (!isValidCardNumber) {
      toast({
        title: "Invalid Card",
        description: "Enter a valid card number (13-19 digits).",
        variant: "destructive",
      });
      return;
    }

    // Validate expiry format MM/YY
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      toast({
        title: "Invalid Expiry Date",
        description: "Use MM/YY format (e.g., 12/25).",
        variant: "destructive",
      });
      return;
    }

    // Validate CVV (3 or 4 digits)
    if (!/^\d{3,4}$/.test(cvv)) {
      toast({
        title: "Invalid CVV",
        description: "Enter a valid 3 or 4-digit CVV.",
        variant: "destructive",
      });
      return;
    }

    // Ensure user and user.id exist before making the API call
    if (!user || !user.id) {
      toast({
        title: "Error",
        description: "User not authenticated. Cannot add payment method.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Make API call to add payment method
      const response = await axiosInstance.post(`/card/${user.id}`, {
        cardNumber,
        cardName: holderName,
        expiryDate,
        cvv,
      });

      // Check for successful response
      if (response.status === 201) {
        // Reset form, hide add payment section, and refetch payment methods
        setNewPaymentMethod({
          cardNumber: "",
          expiryDate: "",
          cvv: "",
          holderName: "",
        });
        setShowAddPayment(false);
        fetchPaymentMethods();
        toast({
          title: "Payment Method Added",
          description: "Your payment method has been saved successfully.",
        });
      }
    } catch (error) {
      // Handle API errors
      if (error.response) {
        toast({
          title: "Error",
          description: error.response.data.message || "Failed to add payment method.",
          variant: "destructive",
        });
      } else if (error.request) {
        toast({
          title: "Network Error",
          description: "No response from server. Please check your internet connection.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  // Handler for removing a payment method
  const handleRemovePaymentMethod = async (id) => {
    try {
      // Make API call to delete payment method
      const response = await axiosInstance.delete(`/card/payment-cards/${id}`);
      // Check for successful response (204 No Content is common for successful deletion)
      if (response.status === 204) {
        toast({
          title: "Payment Method Removed",
          description: "Payment method has been removed successfully.",
        });
        // Filter out the removed method from the state to update UI
        setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
      }
    } catch (error) {
      // Handle API errors
      if (error.response) {
        toast({
          title: "Error",
          description: error.response.data.message || "Failed to remove payment method.",
          variant: "destructive",
        });
      } else if (error.request) {
        toast({
          title: "Network Error",
          description: "No response from server. Please check your internet connection.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8 font-inter">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Settings</h2>

      {/* Account Settings Card */}
      <Card className="rounded-xl shadow-lg border border-gray-200">
        <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 rounded-t-xl py-4 px-6">
          <CardTitle className="flex items-center gap-3 text-green-700 text-xl font-semibold">
            <Shield className="w-6 h-6" />
            Client Account Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Email Section */}
          <div>
            <Label htmlFor="client-email" className="text-sm font-medium text-gray-700 mb-1 block">Client Email</Label>
            <Input
              id="client-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="client@DIGIHUB AUST.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
            />
          </div>

          {/* Change Password Section */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="font-semibold text-lg text-gray-800 mb-4">Change Password</h4>
            <div className="space-y-4">
              <div>
                <Label htmlFor="current-password" className="text-sm font-medium text-gray-700 mb-1 block">Current Password <span className="text-red-500">*</span></Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="new-password" className="text-sm font-medium text-gray-700 mb-1 block">New Password <span className="text-red-500">*</span></Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="confirm-password" className="text-sm font-medium text-gray-700 mb-1 block">
                    Confirm New Password <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Update Credentials Button */}
          <Button
            onClick={handleUpdateCredentials}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-200 flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Update Credentials
          </Button>
        </CardContent>
      </Card>

      {/* Payment Methods Card */}
      <Card className="rounded-xl shadow-lg border border-gray-200">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-xl py-4 px-6">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-blue-700 text-xl font-semibold">
              <CreditCard className="w-6 h-6" />
              Payment Methods
            </CardTitle>
            <Button
              onClick={() => setShowAddPayment(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Payment Method
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {/* Display existing payment methods */}
          {paymentMethods.length === 0 && !showAddPayment ? (
            <p className="text-gray-600 text-center py-4">No payment methods added yet.</p>
          ) : (
            paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition duration-200"
              >
                <div className="flex items-center gap-4">
                  <CreditCard className="w-7 h-7 text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-800 text-lg">
                      **** **** **** {method.cardNumber.slice(-4)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Expires {method.expiryDate}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemovePaymentMethod(method.id)}
                  className="text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700 transition duration-200 px-3 py-2 rounded-lg flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </Button>
              </div>
            ))
          )}


          {/* Add New Payment Method Form */}
          {showAddPayment && (
            <div className="p-6 border border-blue-200 rounded-xl bg-blue-50 space-y-5 shadow-inner">
              <h4 className="font-bold text-lg text-blue-800">Add New Payment Method</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cardNumber" className="text-sm font-medium text-gray-700 mb-1 block">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={newPaymentMethod.cardNumber}
                    onChange={(e) =>
                      setNewPaymentMethod({
                        ...newPaymentMethod,
                        cardNumber: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="holderName" className="text-sm font-medium text-gray-700 mb-1 block">Cardholder Name</Label>
                  <Input
                    id="holderName"
                    placeholder="John Doe"
                    value={newPaymentMethod.holderName}
                    onChange={(e) =>
                      setNewPaymentMethod({
                        ...newPaymentMethod,
                        holderName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="expiryDate" className="text-sm font-medium text-gray-700 mb-1 block">Expiry Date (MM/YY)</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    value={newPaymentMethod.expiryDate}
                    onChange={(e) =>
                      setNewPaymentMethod({
                        ...newPaymentMethod,
                        expiryDate: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="cvv" className="text-sm font-medium text-gray-700 mb-1 block">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={newPaymentMethod.cvv}
                    onChange={(e) =>
                      setNewPaymentMethod({
                        ...newPaymentMethod,
                        cvv: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleAddPaymentMethod}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Payment Method
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowAddPayment(false)}
                  className="border-gray-300 text-gray-700 hover:bg-gray-100 transition duration-200 px-4 py-2 rounded-lg"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientSettings;
