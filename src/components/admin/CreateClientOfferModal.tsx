
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CreateClientOfferModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: any;
}

const CreateClientOfferModal = ({ open, onOpenChange, lead }: CreateClientOfferModalProps) => {
  const { toast } = useToast();
  const [budgetForClient, setBudgetForClient] = useState('');
  const [timelineForClient, setTimelineForClient] = useState('');
  const [offerNotes, setOfferNotes] = useState('');

  const handleCreateOffer = () => {
    toast({
      title: "Client Offer Created",
      description: `Offer sent to ${lead?.clientName} with budget ${budgetForClient} and timeline ${timelineForClient}.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Client Offer</DialogTitle>
          <DialogDescription>
            Create an offer for {lead?.clientName} based on partner's proposal
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Partner's Offer Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Partner's Proposal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-gray-500" />
                <span className="font-medium">Partner Cost: $4,000</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="font-medium">Partner Timeline: 3-4 weeks</span>
              </div>
            </CardContent>
          </Card>

          {/* Client Offer Input */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="budgetForClient">Budget for Client</Label>
              <Input
                id="budgetForClient"
                value={budgetForClient}
                onChange={(e) => setBudgetForClient(e.target.value)}
                placeholder="e.g., $5,000 - $8,000"
              />
              <p className="text-xs text-gray-500 mt-1">Include your margin + GST</p>
            </div>
            <div>
              <Label htmlFor="timelineForClient">Timeline for Client</Label>
              <Input
                id="timelineForClient"
                value={timelineForClient}
                onChange={(e) => setTimelineForClient(e.target.value)}
                placeholder="e.g., 4-6 weeks"
              />
            </div>
          </div>

          {/* Offer Notes */}
          <div>
            <Label htmlFor="offerNotes">Offer Notes (Optional)</Label>
            <Textarea
              id="offerNotes"
              value={offerNotes}
              onChange={(e) => setOfferNotes(e.target.value)}
              placeholder="Add any additional details for the client..."
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateOffer}>
              Send Offer to Client
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateClientOfferModal;
