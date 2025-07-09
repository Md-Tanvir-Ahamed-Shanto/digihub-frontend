
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, User, Mail, Phone, Globe, FileText } from 'lucide-react';

interface ViewLeadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: any;
}

const ViewLeadModal = ({ open, onOpenChange, lead }: ViewLeadModalProps) => {
  if (!lead) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Under Review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Offer Sent': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'Completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Lead Details - {lead.clientName}</span>
          </DialogTitle>
          <DialogDescription>
            Complete information about this project lead
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Status */}
          <div className="flex items-center justify-between">
            <Badge className={getStatusColor(lead.status)}>
              {lead.status}
            </Badge>
            <span className="text-sm text-gray-500">
              Submitted on {lead.dateSubmitted}
            </span>
          </div>

          {/* Client Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Client Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-500" />
                <span className="font-medium">{lead.clientName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <span>sarah.johnson@email.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-gray-500" />
                <span>organicstore.com</span>
              </div>
            </CardContent>
          </Card>

          {/* Project Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-medium mb-2">Project Type</h4>
                <p className="text-gray-600">E-commerce Website</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Brief Description</h4>
                <p className="text-gray-600">{lead.projectSnippet}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Estimated Budget</h4>
                <p className="text-gray-600">$5,000 - $8,000</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Timeline</h4>
                <p className="text-gray-600">4-6 weeks</p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Generate Quote
            </Button>
            <Button>
              Convert to Project
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewLeadModal;
