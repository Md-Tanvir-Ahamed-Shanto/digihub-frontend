
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Mail, Phone, MapPin, Calendar, DollarSign, Star, Code, FolderOpen } from 'lucide-react';

interface ViewDeveloperModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  developer: any;
}

const ViewDeveloperModal = ({ open, onOpenChange, developer }: ViewDeveloperModalProps) => {
  const developerProjects = [
    { id: 1, name: 'E-commerce Platform', client: 'TechStore Ltd', status: 'In Progress', earned: 4250 },
    { id: 2, name: 'Booking System', client: 'Wellness Clinic', status: 'Completed', earned: 3120 },
  ];

  const skills = ['React', 'Node.js', 'MongoDB', 'AWS', 'TypeScript', 'Next.js', 'Docker', 'GraphQL'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Planning': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!developer) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Developer Details</DialogTitle>
          <DialogDescription>
            Complete information about {developer.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Developer Overview */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-6">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="bg-brand-primary text-white text-2xl">
                    {developer.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-brand-gray-900">{developer.name}</h3>
                    <Badge className={getStatusColor(developer.status)}>{developer.status}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-brand-gray-500" />
                      <span>{developer.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-brand-gray-500" />
                      <span>{developer.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-brand-gray-500" />
                      <span>Joined Mar 2023</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-brand-gray-500" />
                      <span>Dhaka, Bangladesh</span>
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
                <div className="text-2xl font-bold text-brand-primary">{developer.projects}</div>
                <div className="text-sm text-brand-gray-600">Total Projects</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">${developer.totalEarned.toLocaleString()}</div>
                <div className="text-sm text-brand-gray-600">Total Earned</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center space-x-1">
                  <Star className="w-6 h-6 text-yellow-500" />
                  <span className="text-2xl font-bold text-yellow-600">{developer.rating}</span>
                </div>
                <div className="text-sm text-brand-gray-600">Rating</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">$45</div>
                <div className="text-sm text-brand-gray-600">Hourly Rate</div>
              </CardContent>
            </Card>
          </div>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="w-5 h-5 mr-2" />
                Technical Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="px-3 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

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
                {developerProjects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 border border-brand-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold">{project.name}</h4>
                      <p className="text-sm text-brand-gray-600">Client: {project.client}</p>
                      <Badge className={`${getStatusColor(project.status)} mt-2`}>{project.status}</Badge>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-green-600">${project.earned.toLocaleString()}</div>
                      <div className="text-sm text-brand-gray-600">Earned</div>
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
                  <span>Milestone 3 - E-commerce Platform</span>
                  <span className="font-semibold text-green-600">+$1,500</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-brand-gray-50 rounded-lg">
                  <span>Final Payment - Booking System</span>
                  <span className="font-semibold text-green-600">+$1,200</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-brand-gray-50 rounded-lg">
                  <span>Milestone 2 - E-commerce Platform</span>
                  <span className="font-semibold text-green-600">+$1,500</span>
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

export default ViewDeveloperModal;
