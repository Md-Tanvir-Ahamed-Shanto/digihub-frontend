
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import axiosInstance from '@/api/axios';
import { Loader2 } from 'lucide-react';

interface Project {
  projectTitle: string;
  partnerProposedCost: string;
  id: number;
  description: string;
  status: string;
  updatedAt: string;
  budgetRange: string;
  timeline: string;  
}

interface SubmitOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  fetchLead: () => void;
}

const SubmitOfferModal = ({ isOpen, onClose, project,fetchLead }: SubmitOfferModalProps) => {
  const [cost, setCost] = useState('');
  const [timeline, setTimeline] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await axiosInstance.post(`/partner/leads/${project.id}/submit-offer`, {
        proposedCost: Number(cost),
        timeline: timeline,
        notes: description
      });
      if (response.status === 200) {
        toast({
          title: "Offer Submitted",
          description: "Your project offer has been submitted successfully."
        });
        fetchLead()
        setCost('');
        setTimeline('');
        setDescription('');
        onClose();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to submit offer",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!project) return null;
  console.log("orject" , project)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Submit Offer</DialogTitle>
          <DialogDescription>
            Submit your cost estimate and timeline for this project: {project.projectTitle}
          </DialogDescription>
          <DialogDescription>
            Budget Offer: {project.partnerProposedCost}
          </DialogDescription>
          <DialogDescription>
            TimeLine: {project.timeline}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Project Description:</p>
            <p className="text-gray-900">{project.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cost">Estimated Cost ($)</Label>
              <Input
                id="cost"
                type="number"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                placeholder="Enter cost estimate"
                required
              />
            </div>
            <div>
              <Label htmlFor="timeline">Timeline</Label>
              <Input
                id="timeline"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                placeholder="e.g., 2 weeks"
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Offer Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your approach and what's included in your offer..."
              rows={4}
              required
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Offer'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitOfferModal;
