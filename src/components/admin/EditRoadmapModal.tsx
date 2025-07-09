
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Calendar, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EditRoadmapModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: any;
}

const EditRoadmapModal = ({ open, onOpenChange, project }: EditRoadmapModalProps) => {
  const { toast } = useToast();
  const [milestones, setMilestones] = useState([
    { id: 1, title: 'Project Setup & Planning', description: 'Initial setup and requirements gathering', status: 'completed', dueDate: '2024-01-15', payment: 2000 },
    { id: 2, title: 'Design & Architecture', description: 'UI/UX design and system architecture', status: 'completed', dueDate: '2024-02-01', payment: 2000 },
    { id: 3, title: 'Core Development', description: 'Main functionality implementation', status: 'in-progress', dueDate: '2024-02-20', payment: 2500 },
    { id: 4, title: 'Testing & Deployment', description: 'Quality assurance and production deployment', status: 'pending', dueDate: '2024-03-05', payment: 2000 }
  ]);

  const addMilestone = () => {
    const newMilestone = {
      id: milestones.length + 1,
      title: '',
      description: '',
      status: 'pending',
      dueDate: '',
      payment: 0
    };
    setMilestones([...milestones, newMilestone]);
  };

  const updateMilestone = (id: number, field: string, value: any) => {
    setMilestones(milestones.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    ));
  };

  const deleteMilestone = (id: number) => {
    setMilestones(milestones.filter(m => m.id !== id));
  };

  const handleSave = () => {
    toast({
      title: "Roadmap Updated",
      description: `Roadmap for ${project?.name} has been successfully updated.`,
    });
    onOpenChange(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Project Roadmap</DialogTitle>
          <DialogDescription>
            Manage milestones and deliverables for {project?.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Project Milestones</h3>
            <Button onClick={addMilestone} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add New Roadmap Item
            </Button>
          </div>

          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <Card key={milestone.id} className="border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="font-semibold text-sm text-gray-500">#{index + 1}</span>
                      <Badge className={getStatusColor(milestone.status)}>
                        {milestone.status}
                      </Badge>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => deleteMilestone(milestone.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Milestone Title</Label>
                      <Input 
                        value={milestone.title}
                        onChange={(e) => updateMilestone(milestone.id, 'title', e.target.value)}
                        placeholder="Enter milestone title"
                      />
                    </div>
                    <div>
                      <Label>Status</Label>
                      <Select 
                        value={milestone.status} 
                        onValueChange={(value) => updateMilestone(milestone.id, 'status', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Description</Label>
                    <Textarea 
                      value={milestone.description}
                      onChange={(e) => updateMilestone(milestone.id, 'description', e.target.value)}
                      placeholder="Describe what will be delivered in this milestone"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Due Date</Label>
                      <Input 
                        type="date"
                        value={milestone.dueDate}
                        onChange={(e) => updateMilestone(milestone.id, 'dueDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Payment Amount ($)</Label>
                      <Input 
                        type="number"
                        value={milestone.payment}
                        onChange={(e) => updateMilestone(milestone.id, 'payment', parseInt(e.target.value))}
                        placeholder="0"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Roadmap
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditRoadmapModal;
