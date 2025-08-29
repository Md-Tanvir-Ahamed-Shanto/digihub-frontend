import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Clock, Box, Boxes, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "../ui/checkbox";
import axiosInstance from "@/api/axios";

interface CreateClientOfferModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: any;
  onOfferCreated: () => void;
}

const CreateClientOfferModal = ({
  open,
  onOpenChange,
  lead,
  onOfferCreated,
}: CreateClientOfferModalProps) => {
  const { toast } = useToast();
  const [budgetForClient, setBudgetForClient] = useState("");
  const [timelineForClient, setTimelineForClient] = useState("");
  const [offerNotes, setOfferNotes] = useState("");
  const [gst, setGst] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const handleCreateOffer = async () => {
    setSubmitting(true);
    try {
      const response = await axiosInstance.post(
        `/lead/${lead?.id}/send-offer-to-client`,
        {
          adminMargin: Number(budgetForClient),
          includesGST: gst,
          timeline: timelineForClient,
          notes: offerNotes,
        }
      );
      if (response.status === 200) {
        onOpenChange(false);
        onOfferCreated();
        toast({
          title: "Client Offer Created",
          description: `Offer sent to ${lead?.clientName} with budget ${budgetForClient} and timeline ${timelineForClient}.`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create offer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };
  const GST_RATE = parseFloat(import.meta.env.VITE_PUBLIC_GST_RATE || '0.10');
  const totalWithGst = (parseInt(budgetForClient)  + parseInt(lead?.partnerProposedCost)) * (1 + GST_RATE)
  const totalWithoutGst = parseInt(budgetForClient)  + parseInt(lead?.partnerProposedCost)
  console.log("lead",lead,GST_RATE,parseInt(budgetForClient),parseInt(lead?.partnerProposedCost),totalWithGst)
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Create Client Offer</DialogTitle>
          <DialogDescription>
            Create an offer for {lead?.clientName} based on partner's proposal
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-6">
          {/* Partner's Offer Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Partner's Proposal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="font-medium text-sm">
                    Partner Cost: ${lead?.partnerProposedCost}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="font-medium text-sm">
                    Client Budget: ${lead?.budgetRange}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="font-medium text-sm">
                    Admin Last Offer: ${lead?.offerPrice || "N/A"}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="font-medium text-sm">
                    Client Offer Cost: ${lead?.clientOffer || "N/A"}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3 pt-2">
                <div className="flex items-start space-x-2">
                  <Box className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-sm block">Project Name:</span>
                    <span className="text-sm text-gray-600">{lead?.projectTitle}</span>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Boxes className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-sm block">Project Description:</span>
                    <span className="text-sm text-gray-600">{lead?.description}</span>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Clock className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-sm block">Partner Timeline:</span>
                    <span className="text-sm text-gray-600">{lead?.timeline}</span>
                  </div>
                </div>
                
                {lead?.clientNotes && (
                  <div className="flex items-start space-x-2">
                    <div className="w-4 h-4 mt-0.5 flex-shrink-0"></div>
                    <div>
                      <span className="font-medium text-sm block">Client Notes:</span>
                      <span className="text-sm text-gray-600">{lead?.clientNotes}</span>
                    </div>
                  </div>
                )}
                
                {lead?.partnerNotes && (
                  <div className="flex items-start space-x-2">
                    <div className="w-4 h-4 mt-0.5 flex-shrink-0"></div>
                    <div>
                      <span className="font-medium text-sm block">Partner Notes:</span>
                      <span className="text-sm text-gray-600">{lead?.partnerNotes}</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Client Offer Input */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Create Your Offer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="budgetForClient">Admin Margin ($)</Label>
                  <Input
                    id="budgetForClient"
                    type="number"
                    value={budgetForClient}
                    onChange={(e) => setBudgetForClient(e.target.value)}
                    placeholder="Enter margin amount"
                  />
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
              
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="gst-checkbox"
                    checked={gst} 
                    onCheckedChange={(checked) => setGst(checked === true)}
                  />
                  <Label htmlFor="gst-checkbox" className="text-sm">
                    Include GST ({(GST_RATE * 100).toFixed(0)}%)
                  </Label>
                </div>
                <div className="ml-auto">
                  <span className="font-semibold text-lg">
                    {gst ? `Total with GST: $${totalWithGst.toFixed(2)}` : `Total: $${(totalWithoutGst || 0).toFixed(2)}`}
                  </span>
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
                  rows={4}
                  className="resize-none"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fixed footer with actions */}
        <div className="flex-shrink-0 flex justify-end space-x-3 pt-4 border-t bg-white">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={submitting}>
            Cancel
          </Button>
          <Button disabled={submitting || !budgetForClient || !timelineForClient} onClick={handleCreateOffer}>
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending Offer...
              </>
            ) : (
              "Send Offer to Client"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateClientOfferModal;