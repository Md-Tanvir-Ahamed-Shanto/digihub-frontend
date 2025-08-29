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
      setSubmitting(false);
      onOpenChange(false);
      onOfferCreated();
      toast({
        title: "Client Offer Created",
        description: `Offer sent to ${lead?.clientName} with budget ${budgetForClient} and timeline ${timelineForClient}.`,
      });
      onOfferCreated();
    }
    setSubmitting(false);
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
                <span className="font-medium">
                  Partner Cost: ${lead?.partnerProposedCost}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-gray-500" />
                <span className="font-medium">
                  Client Budget: ${lead?.budgetRange}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-gray-500" />
                <span className="font-medium">
                  Admin Last Offer: ${lead?.offerPrice || "N/A"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-gray-500" />
                <span className="font-medium">
                  Client Offer Cost: ${lead?.clientOffer || "N/A"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">
                  Client Notes: {lead?.clientNotes || "N/A"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">
                  Partner Notes: {lead?.partnerNotes}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Box className="w-4 h-4 text-gray-500" />
                <span className="font-medium">
                  Project Name: {lead?.projectTitle}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Boxes className="w-4 h-4 text-gray-500" />
                <span className="font-medium">
                  Project Description: {lead?.description}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="font-medium">
                  Partner Timeline: {lead?.timeline}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Client Offer Input */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="budgetForClient">Admin Margin</Label>
              <Input
                id="budgetForClient"
                value={budgetForClient}
                onChange={(e) => setBudgetForClient(e.target.value)}
                placeholder="e.g., $5,000 - $8,000"
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
          <div className="flex  gap-2 items-center">
            <Label htmlFor="timelineForClient">Include your margin + GST</Label>
            <p className="">
              <Checkbox checked={gst} onClick={(e) => setGst(!gst)} />
            </p>
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
            {submitting ? (
              <Button disabled={submitting} className="bg-gray-500">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending Offer...{" "}
              </Button>
            ) : (
              <Button disabled={submitting} onClick={handleCreateOffer}>
                Send Offer to Client
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateClientOfferModal;
