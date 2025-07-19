
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast, useToast } from '@/hooks/use-toast';
import axiosInstance from '@/api/axios';

interface WithdrawalRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  fetchWithdrawals: () => void;
  availableBalance: number;
}

const WithdrawalRequestModal = ({ isOpen, onClose, fetchWithdrawals, availableBalance }: WithdrawalRequestModalProps) => {
  const [formData, setFormData] = useState({
    amount: '',
    type: 'PAYPAL',
    paypalEmail: '',
    bankName: '',
    accountHolderName: '',
    accountNumber: '',
    routingNumber: '',
    swiftCode: '',
    iban: '',
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
    
    if (requestedAmount > availableBalance) {
      toast({
        title: "Invalid Amount",
        description: "Requested amount exceeds available balance.",
        variant: "destructive"
      });
      return;
    }

    const response = await axiosInstance.post('/withdrawal/request', formData);

    if (response.status === 201) {
      toast({
        title: "Withdrawal Requested",
        description: "Your withdrawal request has been submitted.",
      });
      onClose();
      fetchWithdrawals();
    } else {
      toast({
        title: "Withdrawal Request Failed",
        description: "An error occurred while processing your request.",
        variant: "destructive"
      });
    }
  };

  const renderPaymentMethodFields = () => {
    switch (formData.type) {
      case 'PAYPAL':
        return (
          <div>
            <Label htmlFor="paypalEmail">PayPal Email</Label>
            <Input
              id="paypalEmail"
              value={formData.paypalEmail}
              onChange={(e) => handleInputChange('paypalEmail', e.target.value)}
              placeholder="Enter PayPal email"
              type="email"
              required
            />
          </div>
        );
      case 'BANK_ACCOUNT':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="bankName">Bank Name</Label>
              <Input
                id="bankName"
                value={formData.bankName}
                onChange={(e) => handleInputChange('bankName', e.target.value)}
                placeholder="Enter bank name"
                required
              />
            </div>
            <div>
              <Label htmlFor="accountHolderName">Account Holder Name</Label>
              <Input
                id="accountHolderName"
                value={formData.accountHolderName}
                onChange={(e) => handleInputChange('accountHolderName', e.target.value)}
                placeholder="Enter account holder name"
                required
              />
            </div>
            <div>
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                value={formData.accountNumber}
                onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                placeholder="Enter account number"
                required
              />
            </div>
            <div>
              <Label htmlFor="routingNumber">Routing Number</Label>
              <Input
                id="routingNumber"
                value={formData.routingNumber}
                onChange={(e) => handleInputChange('routingNumber', e.target.value)}
                placeholder="Enter routing number"
                required
              />
            </div>
            <div>
              <Label htmlFor="swiftCode">SWIFT Code (International)</Label>
              <Input
                id="swiftCode"
                value={formData.swiftCode}
                onChange={(e) => handleInputChange('swiftCode', e.target.value)}
                placeholder="Enter SWIFT code"
              />
            </div>
            <div>
              <Label htmlFor="iban">IBAN (International)</Label>
              <Input
                id="iban"
                value={formData.iban}
                onChange={(e) => handleInputChange('iban', e.target.value)}
                placeholder="Enter IBAN"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

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
              </SelectContent>
            </Select>
          </div>
          
          {renderPaymentMethodFields()}
          
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
