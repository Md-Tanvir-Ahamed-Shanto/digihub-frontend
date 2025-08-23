
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import axiosInstance from '@/api/axios';

interface AddLeadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddLeadModal = ({ open, onOpenChange }: AddLeadModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    projectTitle: '',
    clientName: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    description: '',
    budgetRange: '',
    timeline: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.clientName || !formData.email || !formData.description) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post('/lead/submit', formData);
      
      if (response.status === 200 || response.status === 201) {
        toast({
          title: "Lead Added",
          description: `New lead from ${formData.clientName} has been added successfully.`,
        });
        
        onOpenChange(false);
        setFormData({
          projectTitle: '',
          clientName: '',
          email: '',
          phone: '',
          company: '',
          projectType: '',
          description: '',
          budgetRange: '',
          timeline: ''
        });
      }
    } catch (error) {
      console.error('Error adding lead:', error);
      toast({
        title: 'Error',
        description: 'Failed to add lead. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Lead</DialogTitle>
          <DialogDescription>
            Create a new project lead entry
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="clientName">Project name *</Label>
              <Input
                id="projectTitle"
                value={formData.projectTitle}
                onChange={(e) => setFormData({...formData, projectTitle: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="clientName">Client Name *</Label>
              <Input
                id="clientName"
                value={formData.clientName}
                onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="projectType">Project Type</Label>
              <Select value={formData.projectType} onValueChange={(value) => setFormData({...formData, projectType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="mobile-app">Mobile App</SelectItem>
                  <SelectItem value="web-app">Web Application</SelectItem>
                  <SelectItem value="custom">Custom Software</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="budgetRange">budget Range</Label>
              <Select value={formData.budgetRange} onValueChange={(value) => setFormData({...formData, budgetRange: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select budgetRange" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1000">$1,000</SelectItem>
                  <SelectItem value="3000">$3,000</SelectItem>
                  <SelectItem value="5000">$5,000</SelectItem>
                  <SelectItem value="10000">$10,000</SelectItem>
                  <SelectItem value="20000">$20,000</SelectItem>
                  <SelectItem value="30000">$30,000</SelectItem>
                  <SelectItem value="50000+">$50,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="timeline">Timeline</Label>
            <Select value={formData.timeline} onValueChange={(value) => setFormData({...formData, timeline: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select timeline" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-2weeks">1-2 weeks</SelectItem>
                <SelectItem value="2-4weeks">2-4 weeks</SelectItem>
                <SelectItem value="1-2months">1-2 months</SelectItem>
                <SelectItem value="2-3months">2-3 months</SelectItem>
                <SelectItem value="3months+">3+ months</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Project Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe the project requirements..."
              rows={4}
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
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
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Lead'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLeadModal;
