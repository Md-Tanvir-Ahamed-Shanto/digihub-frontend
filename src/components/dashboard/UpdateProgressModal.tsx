
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface UpdateProgressModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: any;
}

const UpdateProgressModal = ({ open, onOpenChange, project }: UpdateProgressModalProps) => {
  const [taskStatus, setTaskStatus] = useState('in-progress');
  const [progressUpdate, setProgressUpdate] = useState('');
  const [hoursWorked, setHoursWorked] = useState('');
  const [blockers, setBlockers] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Progress update:', {
      project: project?.name,
      taskStatus,
      progressUpdate,
      hoursWorked,
      blockers
    });
    
    toast({
      title: "Progress Updated",
      description: "Your progress update has been submitted successfully.",
    });
    
    onOpenChange(false);
    // Reset form
    setTaskStatus('in-progress');
    setProgressUpdate('');
    setHoursWorked('');
    setBlockers('');
  };

  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Update Progress - {project.name}</DialogTitle>
          <DialogDescription>
            Update your current task status and progress for {project.client}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="current-milestone">Current Milestone</Label>
              <Input 
                id="current-milestone" 
                value={project.currentMilestone} 
                readOnly 
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="task-status">Task Status</Label>
              <Select value={taskStatus} onValueChange={setTaskStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-progress">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-yellow-600" />
                      <span>In Progress</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="completed">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Completed</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="blocked">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span>Blocked</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="progress-update">Progress Update</Label>
            <Textarea
              id="progress-update"
              value={progressUpdate}
              onChange={(e) => setProgressUpdate(e.target.value)}
              placeholder="Describe what you've accomplished and what you're working on next..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hours-worked">Hours Worked (This Week)</Label>
            <Input
              id="hours-worked"
              type="number"
              value={hoursWorked}
              onChange={(e) => setHoursWorked(e.target.value)}
              placeholder="e.g., 25"
              min="0"
              max="168"
            />
          </div>

          {taskStatus === 'blocked' && (
            <div className="space-y-2">
              <Label htmlFor="blockers">Blockers & Issues</Label>
              <Textarea
                id="blockers"
                value={blockers}
                onChange={(e) => setBlockers(e.target.value)}
                placeholder="Describe what's blocking your progress..."
                rows={3}
                required
              />
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-brand-secondary hover:bg-brand-secondary/90">
              Submit Update
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProgressModal;
