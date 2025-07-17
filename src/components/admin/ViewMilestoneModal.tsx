
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DollarSign, Calendar, User, FileText, Clock, CheckCircle, CheckSquare, XCircle } from 'lucide-react';
import { format } from 'date-fns';

interface ViewMilestoneModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  milestone: any;
}

const ViewMilestoneModal = ({ open, onOpenChange, milestone }: ViewMilestoneModalProps) => {
  console.log("view milestone", milestone)
  if (!milestone) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs"><Clock className="w-3 h-3 mr-1" />Pending Approval</Badge>;
      case 'APPROVED':
        return <Badge variant="default" className="bg-green-600 text-white text-xs"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'COMPLETED':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs"><CheckSquare className="w-3 h-3 mr-1" />Completed</Badge>;
      case 'REJECTED':
        return <Badge variant="destructive" className="text-xs"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="secondary" className="text-xs">{status}</Badge>;
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
                  <span className="text-sm">{milestone.partner.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">Cost:</span>
                  <span className="text-sm font-bold">${milestone.cost?.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">Timeline:</span>
                  <span className="text-sm">{milestone.duration} days</span>
                </div>
               
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">Submitted:</span>
                  <span className="text-sm">{format(new Date(milestone.createdAt), 'yyyy-MM-dd')}</span>
                </div>
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
              {milestone.additionalNotes && (
                <div className="mt-4 pt-4 border-t">
                  <h4 className="text-sm font-medium mb-2">Additional Notes</h4>
                  <p className="text-gray-700 text-sm">{milestone.additionalNotes}</p>
                </div>
              )}
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
