
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Calculator, Clock, DollarSign, FileText } from 'lucide-react';

interface ApproveMilestoneModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  milestone: any;
}

const ApproveMilestoneModal = ({ open, onOpenChange, milestone }: ApproveMilestoneModalProps) => {
  const { toast } = useToast();
  const [clientCost, setClientCost] = useState('');
  const [notes, setNotes] = useState('');
  const [timeline, setTimeline] = useState('');

  const handleApprove = () => {
    if (!clientCost) {
      toast({
        title: "Error",
        description: "Please set the client cost before approving.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Milestone Approved",
      description: `Milestone has been approved with client cost of $${clientCost}. Client will be notified.`,
    });
    
    onOpenChange(false);
    setClientCost('');
    setNotes('');
    setTimeline('');
  };

  if (!milestone) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-blue-600" />
            Set Client Cost & Approve Milestone
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Milestone Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Milestone Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Project:</span>
                <p className="font-medium">{milestone.project}</p>
              </div>
              <div>
                <span className="text-gray-600">Client:</span>
                <p className="font-medium">{milestone.client}</p>
              </div>
              <div>
                <span className="text-gray-600">Partner:</span>
                <p className="font-medium">{milestone.partner}</p>
              </div>
              <div>
                <span className="text-gray-600">Partner Cost:</span>
                <p className="font-medium text-green-600">${milestone.amount}</p>
              </div>
              <div className="md:col-span-2">
                <span className="text-gray-600">Milestone Title:</span>
                <p className="font-medium">{milestone.title}</p>
              </div>
              <div className="md:col-span-2">
                <span className="text-gray-600">Description:</span>
                <p className="text-gray-700">{milestone.description}</p>
              </div>
            </div>
          </div>

          {/* Cost Configuration */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Set Client Cost
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="partnerCost">Partner Cost (Fixed)</Label>
                <Input
                  id="partnerCost"
                  value={`$${milestone.amount}`}
                  disabled
                  className="bg-gray-100"
                />
              </div>
              <div>
                <Label htmlFor="clientCost">Client Cost *</Label>
                <Input
                  id="clientCost"
                  type="number"
                  placeholder="Enter client cost"
                  value={clientCost}
                  onChange={(e) => setClientCost(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="timeline">Estimated Timeline</Label>
              <Input
                id="timeline"
                placeholder="e.g., 2-3 weeks"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any additional information for the client..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          {/* Profit Calculation */}
          {clientCost && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Profit Calculation</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-blue-700">Client Cost:</span>
                  <p className="font-medium">${parseFloat(clientCost).toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-blue-700">Partner Cost:</span>
                  <p className="font-medium">${milestone.amount.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-blue-700">Gross Profit:</span>
                  <p className="font-medium text-green-600">
                    ${(parseFloat(clientCost) - milestone.amount).toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="text-blue-700">Profit Margin:</span>
                  <p className="font-medium text-green-600">
                    {(((parseFloat(clientCost) - milestone.amount) / parseFloat(clientCost)) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleApprove}
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={!clientCost}
            >
              <FileText className="w-4 h-4 mr-2" />
              Approve & Send to Client
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApproveMilestoneModal;
