import { useEffect, useState } from "react";
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
import { Star, Users, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axiosInstance from "@/api/axios";

interface ResentOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  offer: any;
  fetchOffer: () => void;
}

const ResentClientOfferModal = ({
  isOpen,
  onClose,
  offer,
  fetchOffer,
}: ResentOfferModalProps) => {
  const { toast } = useToast();
  const [clientOffer, setClientOffer] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitting2, setIsSubmitting2] = useState(false);

  const handleResendOffer = async (offerId: number) => {
    try {
      setIsSubmitting2(true);
      const response = await axiosInstance.put(
        `/lead/${offerId}/client-resend-offer`,
        {
          clientOffer,
          notes,
        }
      );
      if (response.status === 200) {
        toast({
          title: "Offer Resent",
          description: "The project offer has been resent.",
        });
        onClose();
        fetchOffer()
        setIsSubmitting2(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while resending the offer.",
      });
    } finally {
      setIsSubmitting2(false);
    }
  };

  const handleAcceptOffer = async (offerId: number) => {
    try {
      setIsSubmitting(true);
      const response = await axiosInstance.post(
        `/lead/${offerId}/accept-offer`
      );
      if (response.status === 200) {
        toast({
          title: "Offer Accepted",
          description:
            "The project offer has been accepted and work will begin soon.",
        });
        onClose();
        fetchOffer()
        setIsSubmitting(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while accepting the offer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const remainingOfferTime = 2 - (offer?.clientOfferTime || 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Resend Offer</DialogTitle>
          {remainingOfferTime > 0 ? (
            <DialogDescription className="text-blue-600">
              Remaining Send Offer time: {remainingOfferTime}
            </DialogDescription>
          ) : (
            <DialogDescription className="text-red-600">
              No Remaining Change
            </DialogDescription>
          )}
          <DialogDescription className="text-red-600">
            {remainingOfferTime == 1 && "This is your last change"}
          </DialogDescription>
          <DialogDescription>
            Admin Offer: {offer?.offerPrice}
          </DialogDescription>
          <DialogDescription>
            Admin Notes: {offer?.adminNotes}
          </DialogDescription>
          <DialogDescription>
            My Last Offer: {offer?.clientOffer}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Budget and Timeline for Partner */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="budgetForPartner">Your Offer</Label>
              <Input
                id="budgetForPartner"
                value={clientOffer}
                type="number"
                onChange={(e) => setClientOffer(e.target.value)}
                placeholder="e.g., $3,000 - $5,000"
              />
            </div>
          </div>

          {/* Assignment Notes */}
          <div>
            <Label htmlFor="notes">Assignment Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any specific instructions or requirements for the partner..."
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => onClose()}
              disabled={isSubmitting || isSubmitting2}
            >
              Cancel
            </Button>
            {remainingOfferTime > 0 ? (
              <Button
                onClick={() => handleResendOffer(offer.id)}
                disabled={isSubmitting2}
              >
                {isSubmitting2 ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Resending Offer...
                  </>
                ) : (
                  "Resend Offer"
                )}
              </Button>
            ) : (
              <Button
                variant="destructive"
                onClick={() => onClose()}
                disabled={isSubmitting}
              >
                No More Change
              </Button>
            )}
            <Button
              onClick={() => handleAcceptOffer(offer.id)}
              className="bg-green-600 hover:bg-green-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                  Accepting...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Accept
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResentClientOfferModal;
