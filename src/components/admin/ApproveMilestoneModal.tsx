import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Calculator, Clock, DollarSign, FileText, Loader2 } from "lucide-react";
import axiosInstance from "@/api/axios";
import { Switch } from "@/components/ui/switch";

interface ApproveMilestoneModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  milestone: any;
  onSuccess?: () => void;
}

const ApproveMilestoneModal = ({
  open,
  onOpenChange,
  milestone,
  onSuccess,
}: ApproveMilestoneModalProps) => {
  console.log("view milestone", milestone);
  const { toast } = useToast();
  const [clientCost, setClientCost] = useState("");
  const [notes, setNotes] = useState("");
  const [timeline, setTimeline] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [includesGST, setIncludesGST] = useState(false);

  const GST_RATE = parseFloat(import.meta.env.VITE_PUBLIC_GST_RATE || "0.10");

  const calculateAmounts = () => {
    if (!clientCost) return null;
    const costBeforeGST = parseFloat(clientCost);
    const gstAmount = includesGST ? costBeforeGST * GST_RATE : 0;
    const totalAmount = costBeforeGST + gstAmount;
    const grossProfit = costBeforeGST - milestone.cost;
    const profitMargin = (grossProfit / costBeforeGST) * 100;

    return {
      costBeforeGST,
      gstAmount,
      totalAmount,
      grossProfit,
      profitMargin,
    };
  };

  const handleApprove = async () => {
    if (!clientCost) {
      toast({
        title: "Error",
        description: "Please set the client cost before approving.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await axiosInstance.put(
        `/milestone/admin/milestones/${milestone.id}/approve`,
        {
          clientCost: parseFloat(clientCost),
          estimatedTimeline: timeline || `${milestone.timeline} days`,
          additionalNotes: notes,
          includesGST,
        }
      );

      const amounts = calculateAmounts();
      toast({
        title: "Success",
        description: `Milestone has been approved with total cost of $${amounts?.totalAmount.toLocaleString()} ${
          includesGST ? "(including GST)" : ""
        }.`,
      });

      onSuccess?.();
      onOpenChange(false);
      setClientCost("");
      setNotes("");
      setTimeline("");
      setIncludesGST(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve milestone. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!milestone) return null;

  const amounts = calculateAmounts();

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
            <h3 className="font-semibold text-gray-900 mb-3">
              Milestone Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Project:</span>
                <p className="font-medium">{milestone.projectName}</p>
              </div>
              <div>
                <span className="text-gray-600">Partner:</span>
                <p className="font-medium">{milestone.partner.name}</p>
              </div>
              <div>
                <span className="text-gray-600">Partner Milestone Cost:</span>
                <p className="font-medium text-green-600">
                  ${milestone.cost.toLocaleString()}
                </p>
              </div>
              <div>
                <span className="text-gray-600">Timeline:</span>
                <p className="font-medium">{milestone.duration} days</p>
              </div>
              <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-600">Milestone Title:</span>
                  <p className="font-medium">{milestone.title}</p>
                </div>
                <div>
                  <span className="text-gray-600">Description:</span>
                  <p className="text-gray-700">{milestone.description}</p>
                </div>
                <div>
                  <span className="text-gray-600">Total Project Price</span>
                  <p className="text-gray-700">{milestone?.project?.offerPrice}</p>
                </div>
                <div>
                  <span className="text-gray-600">Partner Budget</span>
                  <p className="text-gray-700">{milestone?.project?.partnerCost}</p>
                </div>
                <div>
                  <span className="text-gray-600">Admin Budget</span>
                  <p className="text-gray-700">{milestone?.project?.adminMargin}</p>
                </div>
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
                  value={`$${milestone.cost.toLocaleString()}`}
                  disabled
                  className="bg-gray-100"
                />
              </div>
              <div>
                <Label htmlFor="clientCost">Client Cost (Before GST) *</Label>
                <Input
                  id="clientCost"
                  type="number"
                  placeholder="Enter client cost"
                  value={clientCost}
                  onChange={(e) => setClientCost(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="gst-toggle"
                checked={includesGST}
                onCheckedChange={setIncludesGST}
              />
              <Label htmlFor="gst-toggle">Include GST (10%)</Label>
            </div>

            <div>
              <Label htmlFor="timeline">
                Estimated Timeline (days) (Optional)
              </Label>
              <Input
                id="timeline"
                placeholder={`Default: ${milestone.duration} days`}
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
          {amounts && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">
                Cost Breakdown
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-blue-700">Base Cost:</span>
                  <p className="font-medium">
                    ${amounts.costBeforeGST.toLocaleString()}
                  </p>
                </div>
                {includesGST && (
                  <div>
                    <span className="text-blue-700">GST (10%):</span>
                    <p className="font-medium">
                      ${amounts.gstAmount.toLocaleString()}
                    </p>
                  </div>
                )}
                <div>
                  <span className="text-blue-700">
                    Total {includesGST ? "(inc. GST)" : ""}:
                  </span>
                  <p className="font-medium">
                    ${amounts.totalAmount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="text-blue-700">Partner Cost:</span>
                  <p className="font-medium">
                    ${milestone.cost.toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="text-blue-700">Admin Profit:</span>
                  <p className="font-medium text-green-600">
                    ${amounts.grossProfit.toLocaleString()}
                  </p>
                </div>
                {/* <div>
                  <span className="text-blue-700">Profit Margin:</span>
                  <p className="font-medium text-green-600">
                    {amounts.profitMargin.toFixed(1)}%
                  </p>
                </div> */}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleApprove}
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={!clientCost || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Approving...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 mr-2" />
                  Approve & Send to Client
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={isSubmitting}
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
