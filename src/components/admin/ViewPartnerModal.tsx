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
import {
  DollarSign,
  Clock,
  CheckCircle,
  CreditCard,
  Trash2,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import axiosInstance from "@/api/axios";
import { useState } from "react";

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
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  if (!partner) return null;

  const handleStatusUpdate = async (requestId: string, newStatus: string) => {
    setIsUpdating(true);
    try {
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
      }
    } catch (error) {
      toast({
        title: "Status Update Failed",
        description: `Withdrawal request status update failed`,
      });
      console.error("Error updating status:", error);
    } finally {
      setIsUpdating(false);
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

  const deletePartner = async () => {
    setIsDeleting(true);
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this partner? This action cannot be undone."
    );

    if (isConfirmed) {
      try {
        await axiosInstance.delete(`/partner/${partner.id}`);
        toast({
          title: "Partner Deleted",
          description: `${partner.name} has been successfully deleted.`,
        });
        fetchPartners(); 
        onOpenChange(false); // Close the modal
      } catch (error) {
        toast({
          title: "Deletion Failed",
          description: "An error occurred while deleting the partner.",
          variant: "destructive",
        });
        console.error("Error deleting partner:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Partner Details - {partner?.name}</DialogTitle>
          <DialogDescription>
            View partner information, balance, and manage withdrawal requests
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
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
                      ${partner?.availableBalance}
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
                    <p className="text-xl font-bold text-yellow-600">
                      $
                      {partner.withdrawals
                        .filter((req) => req.status === "PENDING")
                        .reduce((sum, req) => sum + parseFloat(req.amount), 0)}
                    </p>
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

          {partner.paymentDetails && partner.paymentDetails.length > 0 ? (
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
                    <p className="text-sm font-medium text-gray-600">
                      Bank Name
                    </p>
                    <p className="text-sm">{partner.paymentDetails[0].bankName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Account Name
                    </p>
                    <p className="text-sm">{partner.paymentDetails[0].accountName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Account Number
                    </p>
                    <p className="text-sm">{partner.paymentDetails[0].accountNo}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Routing Number
                    </p>
                    <p className="text-sm">{partner.paymentDetails[0].routingNo}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      PayPal Email
                    </p>
                    <p className="text-sm">{partner.paymentDetails[0].paypalEmail}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <p className="text-center text-gray-400">
              No payment details available.
            </p>
          )}

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
                              {format(new Date(request.requestedAt), "yyyy-MM-dd")}
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
                          {isUpdating ? (
                            <div className="flex items-center space-x-2">
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span className="text-sm">Updating...</span>
                            </div>
                          ) : (
                            <Select
                              onValueChange={(value) =>
                                handleStatusUpdate(request.id, value)
                              }
                              disabled={isDeleting}
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
                          )}
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

          <div className="flex justify-between pt-4 border-t">
            
              <Button 
                onClick={deletePartner} 
                variant="destructive" 
                disabled={isDeleting || isUpdating}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Partner
                  </>
                )}
              </Button>
           
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isDeleting || isUpdating}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewPartnerModal;