
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Building2, 
  Calendar, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  FileText,
  MessageSquare,
  Edit
} from 'lucide-react';
import EditRoadmapModal from './EditRoadmapModal';

interface ViewProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: any;
}

const ViewProjectModal = ({ open, onOpenChange, project }: ViewProjectModalProps) => {
  const [editRoadmapOpen, setEditRoadmapOpen] = useState(false);

  if (!project) return null;

  const milestones = [
    { id: 1, title: 'Project Setup & Planning', status: 'completed', amount: 2000, dueDate: '2024-01-15' },
    { id: 2, title: 'Design & Architecture', status: 'completed', amount: 2000, dueDate: '2024-02-01' },
    { id: 3, title: 'Core Development', status: 'in-progress', amount: 2500, dueDate: '2024-02-20' },
    { id: 4, title: 'Testing & Deployment', status: 'pending', amount: 2000, dueDate: '2024-03-05' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>{project.name}</span>
            </DialogTitle>
            <DialogDescription>
              Complete project overview and management
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
              <TabsTrigger value="communication">Communication</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Project Stats */}
              <div className="grid grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <div>
                        <p className="text-sm text-gray-600">Total Value</p>
                        <p className="font-bold">$8,500</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Timeline</p>
                        <p className="font-bold">8 weeks</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-purple-600" />
                      <div>
                        <p className="text-sm text-gray-600">Progress</p>
                        <p className="font-bold">{project.progress}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-orange-600" />
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <Badge className="mt-1">{project.status}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Client Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span>{project.client}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Building2 className="w-4 h-4 text-gray-500" />
                      <span>{project.partner}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Progress Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Progress value={project.progress} className="mb-2" />
                    <p className="text-sm text-gray-600">{project.progress}% Complete</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="milestones" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Project Milestones</h3>
                <Button onClick={() => setEditRoadmapOpen(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Roadmap
                </Button>
              </div>

              <div className="space-y-4">
                {milestones.map((milestone) => (
                  <Card key={milestone.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            milestone.status === 'completed' ? 'bg-green-500' :
                            milestone.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'
                          }`} />
                          <div>
                            <h4 className="font-medium">{milestone.title}</h4>
                            <p className="text-sm text-gray-600">Due: {milestone.dueDate}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${milestone.amount.toLocaleString()}</p>
                          <Badge className={getStatusColor(milestone.status)}>
                            {milestone.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="communication" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5" />
                    <span>Project Communication</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <p className="font-medium">Status Update</p>
                      <p className="text-sm text-gray-600">Core development milestone completed ahead of schedule.</p>
                      <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <p className="font-medium">Payment Received</p>
                      <p className="text-sm text-gray-600">Milestone 2 payment of $2,000 received.</p>
                      <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button>
              Update Status
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <EditRoadmapModal 
        open={editRoadmapOpen}
        onOpenChange={setEditRoadmapOpen}
        project={project}
      />
    </>
  );
};

export default ViewProjectModal;
