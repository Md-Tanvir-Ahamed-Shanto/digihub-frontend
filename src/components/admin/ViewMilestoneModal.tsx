
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DollarSign, Calendar, User, FileText } from 'lucide-react';

interface ViewMilestoneModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  milestone: any;
}

const ViewMilestoneModal = ({ open, onOpenChange, milestone }: ViewMilestoneModalProps) => {
  if (!milestone) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending Approval':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">{status}</Badge>;
      case 'Approved':
        return <Badge variant="default" className="bg-green-600 text-white">{status}</Badge>;
      case 'Completed':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">{status}</Badge>;
      case 'Rejected':
        return <Badge variant="destructive">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Milestone Details</DialogTitle>
          <DialogDescription>
            Complete milestone information and submission details
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Milestone Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{milestone.title}</span>
                {getStatusBadge(milestone.status)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">Partner:</span>
                  <span className="text-sm">{milestone.partner}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">Amount:</span>
                  <span className="text-sm font-bold">${milestone.amount}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">Due Date:</span>
                  <span className="text-sm">{milestone.dueDate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">Submitted:</span>
                  <span className="text-sm">{milestone.submittedDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <span className="text-sm font-medium">Project:</span>
                <span className="text-sm ml-2">{milestone.project}</span>
              </div>
              <div>
                <span className="text-sm font-medium">Client:</span>
                <span className="text-sm ml-2">{milestone.client}</span>
              </div>
              <div>
                <span className="text-sm font-medium">Client Budget:</span>
                <span className="text-sm ml-2 font-bold text-blue-600">
                  ${milestone.clientBudget?.toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Milestone Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{milestone.description}</p>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewMilestoneModal;
