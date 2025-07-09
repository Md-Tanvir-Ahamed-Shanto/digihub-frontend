
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Calculator, FileText } from 'lucide-react';

interface CreateInvoiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateInvoiceModal = ({ open, onOpenChange }: CreateInvoiceModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    clientName: '',
    projectName: '',
    milestoneTitle: '',
    amount: '',
    gstRate: '10',
    description: '',
    dueDate: '',
    status: 'Draft'
  });

  const clients = [
    'Alex Thompson',
    'Sarah Johnson', 
    'Mike Chen',
    'David Wilson',
    'Lisa Anderson'
  ];

  const projects = [
    'Health Coach CRM',
    'E-commerce Platform',
    'Mobile Fitness App',
    'Restaurant POS',
    'Corporate Website'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amount = parseFloat(formData.amount) || 0;
    const gstAmount = amount * (parseFloat(formData.gstRate) / 100);
    const totalAmount = amount + gstAmount;
    
    console.log('Creating invoice:', {
      ...formData,
      amount,
      gstAmount,
      totalAmount,
      invoiceId: `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`
    });
    
    toast({
      title: "Invoice Created",
      description: `Invoice for ${formData.clientName} has been created successfully with total amount $${totalAmount.toFixed(2)}.`,
    });
    
    // Reset form
    setFormData({
      clientName: '',
      projectName: '',
      milestoneTitle: '',
      amount: '',
      gstRate: '10',
      description: '',
      dueDate: '',
      status: 'Draft'
    });
    
    onOpenChange(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const amount = parseFloat(formData.amount) || 0;
  const gstAmount = amount * (parseFloat(formData.gstRate) / 100);
  const totalAmount = amount + gstAmount;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Create New Invoice
          </DialogTitle>
          <DialogDescription>
            Create a manual invoice for client payments and milestone tracking.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Select onValueChange={(value) => handleInputChange('clientName', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client} value={client}>
                      {client}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Select onValueChange={(value) => handleInputChange('projectName', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project} value={project}>
                      {project}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="milestoneTitle">Milestone Title</Label>
            <Input
              id="milestoneTitle"
              value={formData.milestoneTitle}
              onChange={(e) => handleInputChange('milestoneTitle', e.target.value)}
              placeholder="Enter milestone title"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                placeholder="0.00"
                step="0.01"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gstRate">GST Rate (%)</Label>
              <Input
                id="gstRate"
                type="number"
                value={formData.gstRate}
                onChange={(e) => handleInputChange('gstRate', e.target.value)}
                placeholder="10"
                step="0.1"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter invoice description or milestone details"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Sent">Sent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Invoice Summary */}
          <Card className="bg-gray-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center">
                <Calculator className="w-4 h-4 mr-2" />
                Invoice Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              <div className="flex justify-between text-sm">
                <span>Amount:</span>
                <span>${amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>GST ({formData.gstRate}%):</span>
                <span>${gstAmount.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-bold">
                  <span>Total Amount:</span>
                  <span className="text-green-600">${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Create Invoice
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateInvoiceModal;
