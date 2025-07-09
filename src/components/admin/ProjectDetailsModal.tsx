
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  DollarSign, 
  User, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  FileText,
  MessageSquare,
  Download
} from 'lucide-react';

interface Project {
  id: number;
  name: string;
  client: string;
  developer: string;
  status: string;
  progress: number;
  totalBudget: number;
  clientPaid: number;
  developerPaid: number;
  remainingBalance: number;
  developerRemaining: number;
}

interface ProjectDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project | null;
}

const ProjectDetailsModal = ({ open, onOpenChange, project }: ProjectDetailsModalProps) => {
  if (!project) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Review': return 'bg-yellow-100 text-yellow-800';
      case 'Planning': return 'bg-gray-100 text-gray-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const mockMilestones = [
    { title: 'Project Setup & Planning', status: 'completed', date: '2024-01-15' },
    { title: 'UI/UX Design', status: 'completed', date: '2024-02-01' },
    { title: 'Frontend Development', status: 'in-progress', date: '2024-02-15' },
    { title: 'Backend Integration', status: 'pending', date: '2024-03-01' },
    { title: 'Testing & QA', status: 'pending', date: '2024-03-15' },
    { title: 'Deployment', status: 'pending', date: '2024-03-30' }
  ];

  const mockMessages = [
    { from: 'Client', message: 'Looking forward to the next milestone delivery.', date: '2024-02-10' },
    { from: 'Technical Partner', message: 'Frontend components are 80% complete. On track for delivery.', date: '2024-02-09' },
    { from: 'Admin', message: 'Milestone payment processed successfully.', date: '2024-02-08' }
  ];

  // Safe getter functions with fallbacks
  const safeToLocaleString = (value: number | undefined | null): string => {
    return (value || 0).toLocaleString();
  };

  const totalBudget = project.totalBudget || 0;
  const clientPaid = project.clientPaid || 0;
  const developerPaid = project.developerPaid || 0;
  const remainingBalance = project.remainingBalance || 0;
  const currentProfit = clientPaid - developerPaid;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{project.name}</DialogTitle>
          <DialogDescription className="text-lg">
            Complete project overview and management
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Client</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="font-semibold">{project.client}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Technical Partner</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="font-semibold">{project.developer}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
              </CardContent>
            </Card>
          </div>

          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Project Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span className="font-semibold">{project.progress || 0}% Complete</span>
                </div>
                <Progress value={project.progress || 0} className="h-3" />
              </div>
            </CardContent>
          </Card>

          {/* Financial Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5" />
                <span>Financial Breakdown</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Total Budget</p>
                  <p className="text-lg font-bold">${safeToLocaleString(totalBudget)}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Client Paid</p>
                  <p className="text-lg font-bold text-green-600">${safeToLocaleString(clientPaid)}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Partner Paid</p>
                  <p className="text-lg font-bold text-blue-600">${safeToLocaleString(developerPaid)}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Remaining</p>
                  <p className="text-lg font-bold text-yellow-600">${safeToLocaleString(remainingBalance)}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Current Profit</p>
                  <p className="text-lg font-bold text-emerald-600">${safeToLocaleString(currentProfit)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Milestones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Project Milestones</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockMilestones.map((milestone, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      milestone.status === 'completed' ? 'bg-green-500' :
                      milestone.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'
                    }`}>
                      {milestone.status === 'completed' && <CheckCircle className="w-3 h-3 text-white" />}
                      {milestone.status === 'in-progress' && <Clock className="w-3 h-3 text-white" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{milestone.title}</p>
                      <p className="text-sm text-gray-600">{milestone.date}</p>
                    </div>
                    <Badge variant={milestone.status === 'completed' ? 'default' : 'secondary'}>
                      {milestone.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Communication Log */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Recent Communication</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockMessages.map((msg, index) => (
                  <div key={index} className="border-l-4 border-blue-200 pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm">{msg.from}</p>
                        <p className="text-gray-700">{msg.message}</p>
                      </div>
                      <span className="text-xs text-gray-500">{msg.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            <div className="space-x-2">
              <Button variant="outline" className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>View Contract</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Download Report</span>
              </Button>
            </div>
            <Button onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailsModal;
