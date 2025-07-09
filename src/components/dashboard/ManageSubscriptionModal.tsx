
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Calendar, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ManageSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ManageSubscriptionModal = ({ isOpen, onClose }: ManageSubscriptionModalProps) => {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: "Action Processed",
      description: `Your ${action} request has been processed successfully.`
    });
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
              onClick={() => handleAction('update payment method')}
              className="flex items-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              Update Payment Method
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => handleAction('billing history')}
              className="flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              View Billing History
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
                  onClick={() => handleAction('cancel subscription')}
                >
                  Cancel
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
