import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  Mail,
  Lock,
  Plus,
  Trash2,
  Edit,
  Shield,
  Save,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axiosInstance from "@/api/axios";
import { TabsContent } from "../ui/tabs";
import { useAuth } from "@/hooks/useAuth";
const ClientSettings = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "Visa",
      last4: "4242",
      expiryDate: "12/25",
    },
    {
      id: 2,
      type: "Mastercard",
      last4: "1234",
      expiryDate: "08/26",
    },
  ]);
  const [showAddPayment, setShowAddPayment] = useState(false);

  const { toast } = useToast();

  const [newPaymentMethod, setNewPaymentMethod] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    holderName: "",
  });

  const handleUpdateCredentials = async () => {
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

    const response = await axiosInstance.post("/client/update-credentials", {
      email: email,
      currentPassword: currentPassword,
      password: newPassword,
    });

    if (response.status === 200) {
      toast({
        title: "Credentials Updated",
        description: `${response.data.message}`,
      });
      setEmail("");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      return;
    } else {
      toast({
        title: "Error",
        description: `${response.data.message}`,
      });
      return;
    }
  };

  const handleAddPaymentMethod = () => {
    const newMethod = {
      id: paymentMethods.length + 1,
      type: newPaymentMethod.cardNumber.startsWith("4") ? "Visa" : "Mastercard",
      last4: newPaymentMethod.cardNumber.slice(-4),
      expiryDate: newPaymentMethod.expiryDate,
    };
    setPaymentMethods([...paymentMethods, newMethod]);
    setNewPaymentMethod({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      holderName: "",
    });
    setShowAddPayment(false);
    toast({
      title: "Payment Method Added",
      description: "Your payment method has been saved successfully.",
    });
  };
  const handleRemovePaymentMethod = (id: number) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
    toast({
      title: "Payment Method Removed",
      description: "Payment method has been removed successfully.",
    });
  };
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>

      {/* Account Settings */}
      <Card className="border-brand-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-brand-primary">
            <Mail className="w-5 h-5" />
            Account Settings
          </CardTitle>
        </CardHeader>

        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            Client Account Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="client-email">Client Email</Label>
            <Input
              id="client-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="client@DIGIHUB AUST.com"
            />
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3">Change Password</h4>
            <div className="space-y-3">
              <div>
                <Label htmlFor="current-password">Current Password *</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="new-password">New Password *</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <Label htmlFor="confirm-password">
                    Confirm New Password *
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
            </div>
          </div>

          <Button onClick={handleUpdateCredentials} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            Update Credentials
          </Button>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card className="border-brand-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-brand-primary px-0 font-semibold text-base">
              <CreditCard className="w-5 h-5" />
              Payment Methods
            </CardTitle>
            <Button
              onClick={() => setShowAddPayment(true)}
              className="bg-brand-primary hover:bg-brand-primary/90 text-sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Payment Method
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between p-4 border border-brand-gray-200 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-gray-600" />
                <div>
                  <p className="font-medium">
                    {method.type} ending in {method.last4}
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
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}

          {showAddPayment && (
            <div className="p-4 border border-brand-gray-200 rounded-lg bg-gray-50 space-y-4">
              <h4 className="font-semibold">Add New Payment Method</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
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
                  />
                </div>
                <div>
                  <Label htmlFor="holderName">Cardholder Name</Label>
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
                  />
                </div>
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
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
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
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
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleAddPaymentMethod}
                  className="bg-brand-primary hover:bg-brand-primary/90"
                >
                  Save Payment Method
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowAddPayment(false)}
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
