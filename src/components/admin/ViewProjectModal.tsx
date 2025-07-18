import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import axiosInstance from '@/api/axios';
import { toast } from '@/hooks/use-toast';

interface ViewProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: any;
  fetchProject: () => void;
}

const ViewProjectModal = ({ open, onOpenChange, project, fetchProject }: ViewProjectModalProps) => {
  if (!project) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'IN-PROGRESS': return 'bg-blue-100 text-blue-800';
      case 'PENDING': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const onMarkComplete = async (projectId: string) => {
    try {
     const response =  await axiosInstance.put(`/project/${projectId}/complete`);
      if(response.status === 200) {
        toast({
          title: 'Project marked as complete',
          description: 'Project status has been updated to completed'
        })
        fetchProject();
      }
    } catch (error) {
      toast({
        title: 'Error marking project as complete',
        description: 'Project status could not be updated'
      })
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>{project.title}</span>
            </DialogTitle>
            <DialogDescription>
              Complete project overview and management
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
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
                        <p className="font-bold">{project.offerPrice}</p>
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
                        <p className="font-bold">{project.timeline}</p>
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
                    <CardTitle className="text-lg">Project Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-gray-600">Project Name</p>
                      <span>{project.title}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-gray-600">Client</p>
                      <span>{project.client.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-gray-600">Partner</p>
                      <span>{project.partner.name}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="milestones" className="space-y-4">
              

              <div className="space-y-4">
                {project.milestones.map((milestone) => (
                  <Card key={milestone.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            milestone.status === 'COMPLETE' ? 'bg-green-500' :
                            milestone.status === 'IN-PROGRESS' ? 'bg-blue-500' : 'bg-gray-300'
                          }`} />
                          <div>
                            <h4 className="font-medium">{milestone.title}</h4>
                            <p className="text-sm text-gray-600">Duration: {milestone.duration}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${milestone.cost.toLocaleString()}</p>
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
          </Tabs>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button onClick={() => {
              onOpenChange(false);
              onMarkComplete(project.id);
            }}>
              Mark as Complete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewProjectModal;
