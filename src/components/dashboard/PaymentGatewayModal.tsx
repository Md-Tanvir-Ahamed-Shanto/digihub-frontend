
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Wallet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: string;
  description: string;
}

const PaymentGatewayModal = ({ isOpen, onClose, amount, description }: PaymentGatewayModalProps) => {
  const [selectedGateway, setSelectedGateway] = useState<string>('');
  const { toast } = useToast();

  const handlePayment = (gateway: string) => {
    setSelectedGateway(gateway);
    toast({
      title: "Payment Initiated",
      description: `Redirecting to ${gateway} payment gateway...`
    });
    
    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Payment Successful",
        description: `Payment of ${amount} has been processed successfully.`
      });
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Payment Gateway</DialogTitle>
          <DialogDescription>
            Choose your preferred payment method
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Amount to pay</p>
            <p className="text-2xl font-bold text-brand-primary">{amount}</p>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          </div>
          
          <div className="space-y-3">
            <Card className="cursor-pointer hover:border-brand-primary transition-colors" onClick={() => handlePayment('Stripe')}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                  Stripe
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Secure payment with credit/debit cards</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:border-brand-primary transition-colors" onClick={() => handlePayment('PayPal')}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Wallet className="w-6 h-6 text-blue-500" />
                  PayPal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Pay with your PayPal account</p>
              </CardContent>
            </Card>
          </div>
          
          <Button variant="outline" onClick={onClose} className="w-full">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentGatewayModal;
