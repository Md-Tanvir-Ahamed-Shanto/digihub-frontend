
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { DollarSign, Calendar, User, CreditCard, Clock, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ViewPartnerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  partner: any;
}

const ViewPartnerModal = ({ open, onOpenChange, partner }: ViewPartnerModalProps) => {
  const [withdrawalStatus, setWithdrawalStatus] = useState('');
  const { toast } = useToast();

  if (!partner) return null;

  const withdrawalRequests = [
    { id: 1, amount: 1200, requestDate: '2024-01-10', status: 'Pending', method: 'Bank Transfer' },
    { id: 2, amount: 800, requestDate: '2024-01-05', status: 'Completed', method: 'PayPal' },
    { id: 3, amount: 500, requestDate: '2023-12-28', status: 'Pending', method: 'Bank Transfer' }
  ];

  const paymentDetails = {
    bankName: 'Chase Bank',
    accountNumber: '****-****-****-1234',
    routingNumber: '021000021',
    paypalEmail: 'partner@techpro.com',
    preferredMethod: 'Bank Transfer'
  };

  const handleStatusUpdate = (requestId: number, newStatus: string) => {
    console.log('Updating withdrawal request:', requestId, 'to status:', newStatus);
    
    toast({
      title: "Status Updated",
      description: `Withdrawal request status updated to ${newStatus}`
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">{status}</Badge>;
      case 'Completed':
        return <Badge variant="default" className="bg-green-600 text-white">{status}</Badge>;
      case 'Rejected':
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
                    <p className="text-sm font-medium text-gray-600">Current Balance</p>
                    <p className="text-xl font-bold text-green-600">{partner.balance}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Withdrawals</p>
                    <p className="text-xl font-bold text-yellow-600">$1,700</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Projects</p>
                    <p className="text-xl font-bold text-blue-600">{partner.projectsHandled}</p>
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
                    <p className="text-xl font-bold text-purple-600">⭐ {partner.rating}</p>
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
                  <p className="text-sm font-medium text-gray-600">Account Number</p>
                  <p className="text-sm">{paymentDetails.accountNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Routing Number</p>
                  <p className="text-sm">{paymentDetails.routingNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">PayPal Email</p>
                  <p className="text-sm">{paymentDetails.paypalEmail}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Preferred Payment Method</p>
                <p className="text-sm font-semibold text-blue-600">{paymentDetails.preferredMethod}</p>
              </div>
            </CardContent>
          </Card>

          {/* Withdrawal Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Withdrawal Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {withdrawalRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium">${request.amount}</p>
                          <p className="text-sm text-gray-600">{request.requestDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Method: {request.method}</p>
                          {getStatusBadge(request.status)}
                        </div>
                      </div>
                    </div>
                    
                    {request.status === 'Pending' && (
                      <div className="flex items-center space-x-2">
                        <Select onValueChange={(value) => handleStatusUpdate(request.id, value)}>
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Update Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Completed">Mark Paid</SelectItem>
                            <SelectItem value="Rejected">Reject</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

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
