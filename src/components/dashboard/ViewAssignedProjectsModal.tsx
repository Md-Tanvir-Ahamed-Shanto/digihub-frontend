
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Send } from 'lucide-react';
import ProjectViewModal from './ProjectViewModal';
import SubmitOfferModal from './SubmitOfferModal';

interface ViewAssignedProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ViewAssignedProjectsModal = ({ isOpen, onClose }: ViewAssignedProjectsModalProps) => {
  const [projectViewOpen, setProjectViewOpen] = useState(false);
  const [submitOfferOpen, setSubmitOfferOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const assignedProjects = [
    { id: 4, name: 'Restaurant POS System', status: 'Assigned', briefSnippet: 'Restaurant management system with POS integration...', assignedDate: '2024-07-08', submissionDate: '2024-07-08', estimatedCost: '', timeline: '' },
    { id: 5, name: 'Healthcare Portal', status: 'Assigned', briefSnippet: 'Patient management system with appointment scheduling...', assignedDate: '2024-07-07', submissionDate: '2024-07-07', estimatedCost: '', timeline: '' }
  ];

  const getStatusBadge = (status: string) => {
    return <Badge variant="secondary" className="bg-blue-100 text-blue-800">{status}</Badge>;
  };

  const handleViewProject = (project: any) => {
    setSelectedProject(project);
    setProjectViewOpen(true);
  };

  const handleSubmitOffer = (project: any) => {
    setSelectedProject(project);
    setSubmitOfferOpen(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Assigned Projects</DialogTitle>
            <DialogDescription>
              Projects that have been assigned to you for development
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {assignedProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    {getStatusBadge(project.status)}
                  </div>
                  <CardDescription>Assigned on {project.assignedDate}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{project.briefSnippet}</p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleViewProject(project)}>
                      <Eye className="w-3 h-3 mr-1" />
                      View Details
                    </Button>
                    <Button size="sm" onClick={() => handleSubmitOffer(project)}>
                      <Send className="w-3 h-3 mr-1" />
                      Submit Offer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <ProjectViewModal 
        isOpen={projectViewOpen} 
        onClose={() => setProjectViewOpen(false)} 
        project={selectedProject}
      />
      <SubmitOfferModal 
        isOpen={submitOfferOpen} 
        onClose={() => setSubmitOfferOpen(false)} 
        project={selectedProject}
      />
    </>
  );
};

export default ViewAssignedProjectsModal;
