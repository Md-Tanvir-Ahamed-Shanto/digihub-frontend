
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import axiosInstance from '@/api/axios';
import { Loader2 } from 'lucide-react';

interface AddMilestoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const AddMilestoneModal = ({ isOpen, onClose, onSuccess }: AddMilestoneModalProps) => {
  const [selectedProject, setSelectedProject] = useState('');
  const [title, setTitle] = useState('');
  const [cost, setCost] = useState('');
  const [timeline, setTimeline] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeProjects, setActiveProjects] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      fetchActiveProjects();
    }
  }, [isOpen]);

  const fetchActiveProjects = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get('/project/partner');
      const projects = response.data.filter(project => project.status === 'ACTIVE');
      setActiveProjects(projects);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch active projects',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const milestoneData = [{
        title,
        cost: parseFloat(cost),
        timeline: parseInt(timeline),
        description
      }];

      await axiosInstance.post(
        `/milestone/partner/projects/${selectedProject}/milestones`,
        milestoneData
      );

      toast({
        title: 'Success',
        description: 'Milestone has been created successfully',
      });

      setSelectedProject('');
      setTitle('');
      setCost('');
      setTimeline('');
      setDescription('');
      
      if (onSuccess) {
        onSuccess();
      }
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to create milestone',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedPorductDetails = activeProjects.find((p)=> p.id == selectedProject)


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Milestone</DialogTitle>
          <DialogDescription>
            Create a new milestone for one of your active projects
          </DialogDescription>
          <DialogDescription>
            Total Budget: {selectedPorductDetails && selectedPorductDetails?.partnerCost}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="project">Select Project</Label>
            <Select value={selectedProject} onValueChange={setSelectedProject} required>
              <SelectTrigger>
                <SelectValue placeholder="Choose a project" />
              </SelectTrigger>
              <SelectContent>
                {isLoading ? (
                  <SelectItem value="loading" disabled>
                    Loading projects...
                  </SelectItem>
                ) : activeProjects.length === 0 ? (
                  <SelectItem value="none" disabled>
                    No active projects found
                  </SelectItem>
                ) : (
                  activeProjects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name || project.title}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="title">Milestone Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter milestone title"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cost">Cost ($)</Label>
              <Input
                id="cost"
                type="number"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                placeholder="Enter cost"
                required
              />
            </div>
            <div>
              <Label htmlFor="timeline">Timeline (days)</Label>
              <Input
                id="timeline"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                placeholder="e.g., 3 days"
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this milestone includes..."
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || !selectedProject}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Add Milestone'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMilestoneModal;
