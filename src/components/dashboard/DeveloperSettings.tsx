import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  Shield,
  CreditCard,
  Save,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import axiosInstance from "@/api/axios";

const DeveloperSettings = () => {
  const { toast } = useToast();
  const { user } = useAuth();

  const [developerCredentials, setDeveloperCredentials] = useState({
    email: user?.email,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [paymentDetails, setPaymentDetails] = useState({
    bankName: "",
    accountName: "",
    accountNo: "",
    routingNo: "",
    paypalEmail: "",
  });
  const [hasPaymentDetails, setHasPaymentDetails] = useState(false);
  const [isLoadingPayment, setIsLoadingPayment] = useState(true);

  // Fetch payment details on component load
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      if (!user?.id) {
        setIsLoadingPayment(false);
        return;
      }
      try {
        const response = await axiosInstance.get(
          `/payment-details/${user.id}`
        );
        if (response.data && response.data.data) {
          setPaymentDetails(response.data.data);
          setHasPaymentDetails(true);
        }
      } catch (error) {
        console.error("No existing payment details found:", error);
        setHasPaymentDetails(false);
      } finally {
        setIsLoadingPayment(false);
      }
    };

    fetchPaymentDetails();
  }, [user]);

  const handleUpdateCredentials = async () => {
    // Existing credentials update logic
    if (
      !developerCredentials.currentPassword ||
      !developerCredentials.newPassword
    ) {
      toast({
        title: "Error",
        description: "Please fill in all password fields.",
        variant: "destructive",
      });
      return;
    }

    if (
      developerCredentials.newPassword !== developerCredentials.confirmPassword
    ) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await axiosInstance.post("/partner/update-credentials", {
        email: developerCredentials.email,
        currentPassword: developerCredentials.currentPassword,
        password: developerCredentials.newPassword,
      });

      if (response.status === 200) {
        toast({
          title: "Credentials Updated",
          description: `${response.data.message}`,
        });
        setDeveloperCredentials((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
      }
    } catch (error) {
      if (error.response) {
        toast({
          title: "Error",
          description:
            error.response.data.message ||
            "An error occurred while updating credentials.",
          variant: "destructive",
        });
      } else if (error.request) {
        toast({
          title: "Network Error",
          description:
            "No response from server. Please check your internet connection.",
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

  const handleUpdatePaymentDetails = async (e) => {
    e.preventDefault();

    if (!paymentDetails.accountNo) {
      return toast({
        title: "Error",
        description: "Account number is a required field.",
        variant: "destructive",
      });
    }

    try {
      if (hasPaymentDetails) {
        // Update existing details (PUT)
        await axiosInstance.put(
          `/payment-details/${user.id}`,
          paymentDetails
        );
        toast({
          title: "Payment Details Updated",
          description: "Your payment information has been successfully updated.",
        });
      } else {
        // Create new details (POST)
        await axiosInstance.post(
          `/payment-details/${user.id}`,
          paymentDetails
        );
        toast({
          title: "Payment Details Saved",
          description: "Your payment information has been successfully saved.",
        });
        setHasPaymentDetails(true); // Now we know details exist
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          "An error occurred while saving payment details.",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          System Settings
        </h2>
      </div>

      <Tabs defaultValue="credentials" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-auto">
          <TabsTrigger value="credentials" className="text-xs sm:text-sm">
            Partner Account
          </TabsTrigger>
          <TabsTrigger value="payment" className="text-xs sm:text-sm">
            Payment Details
          </TabsTrigger>
        </TabsList>

        {/* Partner Credentials Tab Content */}
        <TabsContent value="credentials" className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                Partner Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="developer-email">Developer Email</Label>
                <Input
                  id="developer-email"
                  type="email"
                  value={developerCredentials.email}
                  onChange={(e) =>
                    setDeveloperCredentials((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  placeholder="developer@DIGIHUB AUST.com"
                />
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3">
                  Change Password
                </h4>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="current-password">Current Password *</Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={developerCredentials.currentPassword}
                      onChange={(e) =>
                        setDeveloperCredentials((prev) => ({
                          ...prev,
                          currentPassword: e.target.value,
                        }))
                      }
                      placeholder="Enter current password"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="new-password">New Password *</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={developerCredentials.newPassword}
                        onChange={(e) =>
                          setDeveloperCredentials((prev) => ({
                            ...prev,
                            newPassword: e.target.value,
                          }))
                        }
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
                        value={developerCredentials.confirmPassword}
                        onChange={(e) =>
                          setDeveloperCredentials((prev) => ({
                            ...prev,
                            confirmPassword: e.target.value,
                          }))
                        }
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
        </TabsContent>

        {/* Payment Details Tab Content */}
        <TabsContent value="payment" className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-600" />
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingPayment ? (
                <div className="flex justify-center items-center h-48">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                </div>
              ) : (
                <form onSubmit={handleUpdatePaymentDetails} className="space-y-4">
                  <div>
                    <Label htmlFor="accountNo">Account Number *</Label>
                    <Input
                      id="accountNo"
                      name="accountNo"
                      value={paymentDetails.accountNo}
                      onChange={(e) =>
                        setPaymentDetails((prev) => ({ ...prev, accountNo: e.target.value }))
                      }
                      placeholder="Enter bank account number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="accountName">Account Name</Label>
                    <Input
                      id="accountName"
                      name="accountName"
                      value={paymentDetails.accountName}
                      onChange={(e) =>
                        setPaymentDetails((prev) => ({ ...prev, accountName: e.target.value }))
                      }
                      placeholder="Enter account holder's name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                      id="bankName"
                      name="bankName"
                      value={paymentDetails.bankName}
                      onChange={(e) =>
                        setPaymentDetails((prev) => ({ ...prev, bankName: e.target.value }))
                      }
                      placeholder="e.g., Chase Bank"
                    />
                  </div>
                  <div>
                    <Label htmlFor="routingNo">Routing Number</Label>
                    <Input
                      id="routingNo"
                      name="routingNo"
                      value={paymentDetails.routingNo}
                      onChange={(e) =>
                        setPaymentDetails((prev) => ({ ...prev, routingNo: e.target.value }))
                      }
                      placeholder="e.g., 021000021"
                    />
                  </div>
                  <div>
                    <Label htmlFor="paypalEmail">PayPal Email</Label>
                    <Input
                      id="paypalEmail"
                      name="paypalEmail"
                      type="email"
                      value={paymentDetails.paypalEmail}
                      onChange={(e) =>
                        setPaymentDetails((prev) => ({ ...prev, paypalEmail: e.target.value }))
                      }
                      placeholder="your.email@paypal.com"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    {hasPaymentDetails ? "Update Payment Details" : "Save Payment Details"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DeveloperSettings;