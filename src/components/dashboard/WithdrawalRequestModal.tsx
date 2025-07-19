import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast'; // Corrected import for toast directly
import axiosInstance from '@/api/axios';

interface WithdrawalRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  fetchWithdrawals: () => void;
  availableBalance: number;
}

const WithdrawalRequestModal = ({ isOpen, onClose, fetchWithdrawals, availableBalance }: WithdrawalRequestModalProps) => {
  // Removed specific payment credential fields from state as they are not in the schema
  const [formData, setFormData] = useState({
    amount: '',
    type: 'PAYPAL', // Default type
    note: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const requestedAmount = parseFloat(formData.amount);
    
    if (isNaN(requestedAmount) || requestedAmount <= 0) {
        toast({
            title: "Invalid Amount",
            description: "Please enter a valid positive amount.",
            variant: "destructive"
        });
        return;
    }

    if (requestedAmount > availableBalance) {
      toast({
        title: "Invalid Amount",
        description: "Requested amount exceeds available balance.",
        variant: "destructive"
      });
      return;
    }

    try {
        // Only send fields that are part of your current Withdrawal model schema
        const payload = {
            amount: requestedAmount,
            type: formData.type,
            note: formData.note || undefined // Send null or undefined if note is empty
        };

        // You might want to add client-side validation for payment method details here,
        // even if they aren't stored in the Withdrawal model.
        // For example, if 'PAYPAL' is selected, ensure a PayPal email is collected
        // and sent to a *different* endpoint that manages partner payment profiles,
        // or ensure the partner has a default payment method on file.
        // As per the current schema, specific details are not part of the Withdrawal request.

        const response = await axiosInstance.post('/withdrawal/request', payload);

        if (response.status === 201) {
            toast({
                title: "Withdrawal Requested",
                description: "Your withdrawal request has been submitted.",
            });
            setFormData({
                amount: '',
                type: '',
                note: ''
            });
            onClose();
            fetchWithdrawals();
        } else {
            // This else block might not be reached if axiosInstance throws for non-2xx status
            toast({
                title: "Withdrawal Request Failed",
                description: "An unexpected error occurred. Please try again.",
                variant: "destructive"
            });
        }
    } catch (error: any) {
        console.error("Withdrawal request error:", error);
        toast({
            title: "Withdrawal Request Failed",
            description: error.response?.data?.message || "An error occurred while processing your request.",
            variant: "destructive"
        });
    }
  };

  // Removed renderPaymentMethodFields as specific details are no longer part of the Withdrawal payload
  // If you need to collect these details for other purposes (e.g., updating partner's payment methods),
  // you would handle that separately, or update your Withdrawal schema to include them again.

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Request Withdrawal</DialogTitle>
          <DialogDescription>
            Request to withdraw funds from your available balance
          </DialogDescription>
        </DialogHeader>
        
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600">Available Balance</p>
          <p className="text-2xl font-bold text-green-600">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(availableBalance)}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="amount">Withdrawal Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              placeholder="Enter amount"
              max={availableBalance}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="type">Payment Method</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleInputChange('type', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PAYPAL">PayPal</SelectItem>
                <SelectItem value="BANK_ACCOUNT">Bank Account</SelectItem>
                {/* As per your backend validation, CREDIT_CARD is not a typical partner withdrawal method */}
                {/* <SelectItem value="CREDIT_CARD">Credit Card (Refund)</SelectItem> */}
              </SelectContent>
            </Select>
          </div>
          
          {/* Removed specific payment method fields (PayPal email, bank details) */}
          {/* as they are not part of the Withdrawal model in your current schema */}
          {/* If you need these, you must add them back to your schema.prisma first */}
          
          <div>
            <Label htmlFor="note">Additional Notes (Optional)</Label>
            <Textarea
              id="note"
              value={formData.note}
              onChange={(e) => handleInputChange('note', e.target.value)}
              placeholder="Any special instructions..."
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Submit Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawalRequestModal;