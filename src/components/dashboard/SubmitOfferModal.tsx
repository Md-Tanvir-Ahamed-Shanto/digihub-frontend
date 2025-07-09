
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface Project {
  id: number;
  briefSnippet: string;
  status: string;
  submissionDate: string;
  estimatedCost: string;
  timeline: string;  
}

interface SubmitOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

const SubmitOfferModal = ({ isOpen, onClose, project }: SubmitOfferModalProps) => {
  const [cost, setCost] = useState('');
  const [timeline, setTimeline] = useState('');
  const [description, setDescription] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Offer Submitted",
      description: "Your project offer has been submitted successfully."
    });
    setCost('');
    setTimeline('');
    setDescription('');
    onClose();
  };

  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Submit Offer</DialogTitle>
          <DialogDescription>
            Submit your cost estimate and timeline for this project
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Project Brief:</p>
            <p className="text-gray-900">{project.briefSnippet}</p>
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
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Submit Offer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitOfferModal;
