
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Calendar, AlertTriangle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import axiosInstance from '@/api/axios';
import { useState } from 'react';

interface ManageSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ManageSubscriptionModal = ({ isOpen, onClose }: ManageSubscriptionModalProps) => {
  const { toast } = useToast();
  const [isUpdatingPayment, setIsUpdatingPayment] = useState(false);
  const [isViewingHistory, setIsViewingHistory] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const handleUpdatePayment = async () => {
    setIsUpdatingPayment(true);
    try {
      const response = await axiosInstance.post('/subscription/update-payment');
      toast({
        title: "Payment Method Updated",
        description: "Your payment method has been updated successfully."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update payment method.",
        variant: "destructive"
      });
    } finally {
      setIsUpdatingPayment(false);
    }
  };

  const handleViewHistory = async () => {
    setIsViewingHistory(true);
    try {
      const response = await axiosInstance.get('/subscription/billing-history');
      toast({
        title: "Billing History",
        description: "Redirecting to billing history..."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to fetch billing history.",
        variant: "destructive"
      });
    } finally {
      setIsViewingHistory(false);
    }
  };

  const handleCancelSubscription = async () => {
    setIsCancelling(true);
    try {
      const response = await axiosInstance.post('/subscription/cancel');
      toast({
        title: "Subscription Cancelled",
        description: "Your subscription has been cancelled successfully."
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to cancel subscription.",
        variant: "destructive"
      });
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Manage Subscription</DialogTitle>
          <DialogDescription>
            Manage your maintenance subscription settings
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Current Plan
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Monthly Maintenance Plan</p>
                    <p className="text-sm text-gray-600">$75/month - Next billing: August 15, 2025</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Payment Method</p>
                    <p className="text-sm text-gray-600">**** **** **** 4242</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              onClick={handleUpdatePayment}
              className="flex items-center gap-2"
              disabled={isUpdatingPayment}
            >
              {isUpdatingPayment ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  Update Payment Method
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleViewHistory}
              className="flex items-center gap-2"
              disabled={isViewingHistory}
            >
              {isViewingHistory ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4" />
                  View Billing History
                </>
              )}
            </Button>
          </div>
          
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <div>
                  <p className="font-medium text-red-900">Cancel Subscription</p>
                  <p className="text-sm text-red-700">This will cancel your maintenance plan</p>
                </div>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={handleCancelSubscription}
                  disabled={isCancelling}
                >
                  {isCancelling ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Cancelling...
                    </>
                  ) : (
                    'Cancel'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageSubscriptionModal;
