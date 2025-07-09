
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Mail, Phone, MapPin, Calendar, DollarSign, FolderOpen } from 'lucide-react';

interface ViewClientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: any;
}

const ViewClientModal = ({ open, onOpenChange, client }: ViewClientModalProps) => {
  const clientProjects = [
    { id: 1, name: 'E-commerce Platform', status: 'In Progress', budget: 8500, completion: 75 },
    { id: 2, name: 'Mobile App', status: 'Completed', budget: 12000, completion: 100 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Planning': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!client) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Client Details</DialogTitle>
          <DialogDescription>
            Complete information about {client.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Client Overview */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-6">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="bg-brand-primary text-white text-2xl">
                    {client.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-brand-gray-900">{client.name}</h3>
                    <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-brand-gray-500" />
                      <span>{client.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-brand-gray-500" />
                      <span>{client.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-brand-gray-500" />
                      <span>Joined Jan 2024</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-brand-gray-500" />
                      <span>New York, USA</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-brand-primary">{client.projects}</div>
                <div className="text-sm text-brand-gray-600">Total Projects</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">${client.totalSpent.toLocaleString()}</div>
                <div className="text-sm text-brand-gray-600">Total Spent</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">4.8</div>
                <div className="text-sm text-brand-gray-600">Rating</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">18</div>
                <div className="text-sm text-brand-gray-600">Months Client</div>
              </CardContent>
            </Card>
          </div>

          {/* Project History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FolderOpen className="w-5 h-5 mr-2" />
                Project History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clientProjects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 border border-brand-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold">{project.name}</h4>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                        <span className="text-sm text-brand-gray-600">
                          {project.completion}% Complete
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">${project.budget.toLocaleString()}</div>
                      <div className="text-sm text-brand-gray-600">Budget</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Recent Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-brand-gray-50 rounded-lg">
                  <span>Milestone 3 Payment</span>
                  <span className="font-semibold text-green-600">+$2,500</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-brand-gray-50 rounded-lg">
                  <span>Milestone 2 Payment</span>
                  <span className="font-semibold text-green-600">+$2,000</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-brand-gray-50 rounded-lg">
                  <span>Initial Payment</span>
                  <span className="font-semibold text-green-600">+$2,000</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button>
              Send Message
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewClientModal;
