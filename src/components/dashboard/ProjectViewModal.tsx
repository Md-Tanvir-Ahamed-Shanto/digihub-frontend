
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';

interface Project {
  id: number;
  briefSnippet: string;
  status: string;
  updatedAt: string;
  partnerCost: string;
  timeline: string;
}

interface ProjectViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

const ProjectViewModal = ({ isOpen, onClose, project }: ProjectViewModalProps) => {
  if (!project) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ASSIGNED':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">{status}</Badge>;
      case 'OFFER_SUBMITTED':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-700">{status}</Badge>;
      case 'ACTIVE':
        return <Badge variant="default" className="bg-green-600 text-white">{status}</Badge>;
      case 'COMPLETE':
        return <Badge variant="default" className="bg-gray-100 text-gray-800">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Project Details</DialogTitle>
          <DialogDescription>
            Detailed information about the project
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Project Brief</h3>
                  {getStatusBadge(project.status)}
                </div>
                <p className="text-gray-600">{project.briefSnippet}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-gray-600">Submission Date</p>
                    <p className="font-semibold">{format(new Date(project.updatedAt), 'yyyy-MM-dd HH:mm')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Estimated Cost</p>
                    <p className="font-semibold">{project.partnerCost || 'Pending'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Timeline</p>
                    <p className="font-semibold">{project.timeline || 'To be determined'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-semibold">{project.status}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectViewModal;
