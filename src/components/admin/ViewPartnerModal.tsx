import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
  DollarSign,
  Calendar,
  User,
  CreditCard,
  Clock,
  CheckCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import axiosInstance from "@/api/axios";

interface ViewPartnerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  partner: any;
  fetchPartners: () => void;
}

const ViewPartnerModal = ({
  open,
  onOpenChange,
  partner,
  fetchPartners,
}: ViewPartnerModalProps) => {
  const { toast } = useToast();
  console.log("partner view", partner);
  if (!partner) return null;

  const paymentDetails = {
    bankName: "Chase Bank",
    accountNumber: "****-****-****-1234",
    routingNumber: "021000021",
    paypalEmail: "partner@techpro.com",
    preferredMethod: "Bank Transfer",
  };

  const handleStatusUpdate = async (requestId: number, newStatus: string) => {
    const response = await axiosInstance.put(
      `/withdrawal/admin/${requestId}/process`,
      { status: newStatus }
    );

    if (response.status === 200) {
      toast({
        title: "Status Updated",
        description: `Withdrawal request status updated to ${newStatus}`,
      });
      fetchPartners();
      onOpenChange(false);
    } else {
      toast({
        title: "Status Update Failed",
        description: `Withdrawal request status update failed`,
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            {status}
          </Badge>
        );
      case "COMPLETED":
        return (
          <Badge variant="default" className="bg-green-600 text-white">
            {status}
          </Badge>
        );
      case "CANCELED":
        return <Badge variant="destructive">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Partner Details - {partner.name}</DialogTitle>
          <DialogDescription>
            View partner information, balance, and manage withdrawal requests
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Partner Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Current Balance
                    </p>
                    <p className="text-xl font-bold text-green-600">
                      {partner.availableBalance}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Pending Withdrawals
                    </p>
                    <p className="text-xl font-bold text-yellow-600">$1,700</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Rating</p>
                    <p className="text-xl font-bold text-purple-600">
                      ⭐ {partner.rating}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Bank Name</p>
                  <p className="text-sm">{paymentDetails.bankName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Account Number
                  </p>
                  <p className="text-sm">{paymentDetails.accountNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Routing Number
                  </p>
                  <p className="text-sm">{paymentDetails.routingNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    PayPal Email
                  </p>
                  <p className="text-sm">{paymentDetails.paypalEmail}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Preferred Payment Method
                </p>
                <p className="text-sm font-semibold text-blue-600">
                  {paymentDetails.preferredMethod}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Withdrawal Requests */}
          {partner.withdrawals.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Withdrawal Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {partner.withdrawals.map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="font-medium">${request.amount}</p>
                            <p className="text-sm text-gray-600">
                              {format(request.requestedAt, "yyyy-MM-dd")}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              Method: {request.type}
                            </p>
                            {getStatusBadge(request.status)}
                          </div>
                        </div>
                      </div>

                      {request.status === "PENDING" && (
                        <div className="flex items-center space-x-2">
                          <Select
                            onValueChange={(value) =>
                              handleStatusUpdate(request.id, value)
                            }
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Update Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="COMPLETED">
                                Mark Paid
                              </SelectItem>
                              <SelectItem value="CANCELED">Reject</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <p className="text-center text-gray-400">
              No withdrawal requests available.
            </p>
          )}

          {/* Actions */}
          <div className="flex justify-end pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewPartnerModal;
