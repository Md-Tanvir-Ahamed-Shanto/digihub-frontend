
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import axiosInstance from '@/api/axios';

interface TechnicalPartner {
  id: number;
  name: string;
  email: string;
  specialization: string;
  status: string;
  location: string;
}

interface AssignDeveloperModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: any;
  developers: TechnicalPartner[];
}

const AssignDeveloperModal = ({ open, onOpenChange, project, developers }: AssignDeveloperModalProps) => {
  const [selectedPartner, setSelectedPartner] = useState('');
  const [fixedBudget, setFixedBudget] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPartner) {
      toast({
        title: "Error",
        description: "Please select a technical partner.",
        variant: "destructive",
      });
      return;
    }

    if (!fixedBudget) {
      toast({
        title: "Error",
        description: "Please enter a fixed budget amount.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const partner = developers.find(d => d.id === parseInt(selectedPartner));
      await axiosInstance.post(`/projects/${project.id}/assign`, {
        partnerId: parseInt(selectedPartner),
        fixedBudget: parseFloat(fixedBudget)
      });

      toast({
        title: "Success",
        description: `${partner?.name} has been assigned to ${project?.name} with a fixed budget of $${parseInt(fixedBudget).toLocaleString()}.`,
      });
      
      // Reset form
      setSelectedPartner('');
      setFixedBudget('');
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to assign technical partner. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const availablePartners = developers.filter(dev => dev.status === 'Active' || dev.status === 'Available');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Assign Technical Partner to Project</DialogTitle>
          <DialogDescription>
            Assign a technical partner to "{project?.name}" and set a fixed budget for the project.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Technical Partner Selection */}
          <div className="space-y-2">
            <Label htmlFor="partner">Select Technical Partner</Label>
            <Select value={selectedPartner} onValueChange={setSelectedPartner}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a technical partner" />
              </SelectTrigger>
              <SelectContent>
                {availablePartners.map((partner) => (
                  <SelectItem key={partner.id} value={partner.id.toString()}>
                    <div className="flex flex-col">
                      <span className="font-medium">{partner.name}</span>
                      <span className="text-sm text-gray-500">{partner.specialization} • {partner.location}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {availablePartners.length === 0 && (
              <p className="text-sm text-yellow-600">No technical partners currently available</p>
            )}
          </div>

          {/* Fixed Budget Input */}
          {selectedPartner && (
            <div className="space-y-2">
              <Label htmlFor="fixedBudget">Fixed Project Budget ($)</Label>
              <Input
                id="fixedBudget"
                type="number"
                value={fixedBudget}
                onChange={(e) => setFixedBudget(e.target.value)}
                placeholder="Enter fixed budget amount"
                min="0"
                step="100"
              />
              <p className="text-sm text-gray-600">
                The technical partner will receive this exact amount for completing the entire project, regardless of time spent.
              </p>
            </div>
          )}
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-brand-accent hover:bg-brand-accent/90"
              disabled={!selectedPartner || availablePartners.length === 0 || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Assigning...
                </>
              ) : (
                'Assign Partner'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AssignDeveloperModal;
