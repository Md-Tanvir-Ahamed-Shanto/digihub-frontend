import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Mail, Lock, Plus, Trash2, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
const ClientSettings = () => {
  const [email, setEmail] = useState('client@example.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [paymentMethods, setPaymentMethods] = useState([{
    id: 1,
    type: 'Visa',
    last4: '4242',
    expiryDate: '12/25'
  }, {
    id: 2,
    type: 'Mastercard',
    last4: '1234',
    expiryDate: '08/26'
  }]);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    holderName: ''
  });
  const {
    toast
  } = useToast();
  const handleEmailChange = () => {
    toast({
      title: "Email Updated",
      description: "Your email address has been updated successfully."
    });
  };
  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Password Error",
        description: "New passwords do not match.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully."
    });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };
  const handleAddPaymentMethod = () => {
    const newMethod = {
      id: paymentMethods.length + 1,
      type: newPaymentMethod.cardNumber.startsWith('4') ? 'Visa' : 'Mastercard',
      last4: newPaymentMethod.cardNumber.slice(-4),
      expiryDate: newPaymentMethod.expiryDate
    };
    setPaymentMethods([...paymentMethods, newMethod]);
    setNewPaymentMethod({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      holderName: ''
    });
    setShowAddPayment(false);
    toast({
      title: "Payment Method Added",
      description: "Your payment method has been saved successfully."
    });
  };
  const handleRemovePaymentMethod = (id: number) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
    toast({
      title: "Payment Method Removed",
      description: "Payment method has been removed successfully."
    });
  };
  return <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>

      {/* Account Settings */}
      <Card className="border-brand-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-brand-primary">
            <Mail className="w-5 h-5" />
            Account Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="flex gap-2 mt-1">
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="flex-1" />
                <Button onClick={handleEmailChange} className="bg-brand-primary hover:bg-brand-primary/90">
                  Update
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Change Password
            </h3>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
              </div>
              <Button onClick={handlePasswordChange} className="bg-brand-primary hover:bg-brand-primary/90 w-fit">
                Change Password
              </Button>
            </div>
          </div>
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
            <Button onClick={() => setShowAddPayment(true)} className="bg-brand-primary hover:bg-brand-primary/90 text-sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Payment Method
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentMethods.map(method => <div key={method.id} className="flex items-center justify-between p-4 border border-brand-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-gray-600" />
                <div>
                  <p className="font-medium">{method.type} ending in {method.last4}</p>
                  <p className="text-sm text-gray-600">Expires {method.expiryDate}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleRemovePaymentMethod(method.id)} className="text-red-600 border-red-300 hover:bg-red-50">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>)}

          {showAddPayment && <div className="p-4 border border-brand-gray-200 rounded-lg bg-gray-50 space-y-4">
              <h4 className="font-semibold">Add New Payment Method</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" value={newPaymentMethod.cardNumber} onChange={e => setNewPaymentMethod({
                ...newPaymentMethod,
                cardNumber: e.target.value
              })} />
                </div>
                <div>
                  <Label htmlFor="holderName">Cardholder Name</Label>
                  <Input id="holderName" placeholder="John Doe" value={newPaymentMethod.holderName} onChange={e => setNewPaymentMethod({
                ...newPaymentMethod,
                holderName: e.target.value
              })} />
                </div>
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input id="expiryDate" placeholder="MM/YY" value={newPaymentMethod.expiryDate} onChange={e => setNewPaymentMethod({
                ...newPaymentMethod,
                expiryDate: e.target.value
              })} />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" value={newPaymentMethod.cvv} onChange={e => setNewPaymentMethod({
                ...newPaymentMethod,
                cvv: e.target.value
              })} />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddPaymentMethod} className="bg-brand-primary hover:bg-brand-primary/90">
                  Save Payment Method
                </Button>
                <Button variant="outline" onClick={() => setShowAddPayment(false)}>
                  Cancel
                </Button>
              </div>
            </div>}
        </CardContent>
      </Card>
    </div>;
};
export default ClientSettings;