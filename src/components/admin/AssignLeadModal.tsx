
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AssignLeadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: any;
}

const AssignLeadModal = ({ open, onOpenChange, lead }: AssignLeadModalProps) => {
  const { toast } = useToast();
  const [selectedPartner, setSelectedPartner] = useState('');
  const [budgetForPartner, setBudgetForPartner] = useState('');
  const [timelineForPartner, setTimelineForPartner] = useState('');
  const [notes, setNotes] = useState('');

  const partners = [
    { id: '1', name: 'TechPro Solutions', rating: 4.8, projects: 12, expertise: ['React', 'Node.js', 'E-commerce'], availability: 'Available' },
    { id: '2', name: 'WebCraft Studio', rating: 4.6, projects: 8, expertise: ['Vue.js', 'Design', 'UX/UI'], availability: 'Busy' },
    { id: '3', name: 'AppDev Team', rating: 4.9, projects: 15, expertise: ['React Native', 'Flutter', 'Mobile'], availability: 'Available' }
  ];

  const handleAssign = () => {
    if (!selectedPartner) return;
    
    const partner = partners.find(p => p.id === selectedPartner);
    toast({
      title: "Lead Assigned",
      description: `Lead has been assigned to ${partner?.name} with budget ${budgetForPartner} and timeline ${timelineForPartner}.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Assign Lead to Partner</DialogTitle>
          <DialogDescription>
            Select a technical partner to handle this project: {lead?.clientName}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Available Partners */}
          <div>
            <Label className="text-base font-medium mb-4 block">Available Partners</Label>
            <div className="space-y-3">
              {partners.map((partner) => (
                <Card 
                  key={partner.id} 
                  className={`cursor-pointer transition-colors ${
                    selectedPartner === partner.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedPartner(partner.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <Avatar>
                          <AvatarFallback>{partner.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{partner.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm ml-1">{partner.rating}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Users className="w-4 h-4 mr-1" />
                              {partner.projects} projects
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {partner.expertise.map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Badge variant={partner.availability === 'Available' ? 'default' : 'secondary'}>
                        {partner.availability}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Budget and Timeline for Partner */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="budgetForPartner">Budget for Partner</Label>
              <Input
                id="budgetForPartner"
                value={budgetForPartner}
                onChange={(e) => setBudgetForPartner(e.target.value)}
                placeholder="e.g., $3,000 - $5,000"
              />
            </div>
            <div>
              <Label htmlFor="timelineForPartner">Timeline for Partner</Label>
              <Input
                id="timelineForPartner"
                value={timelineForPartner}
                onChange={(e) => setTimelineForPartner(e.target.value)}
                placeholder="e.g., 3-4 weeks"
              />
            </div>
          </div>

          {/* Assignment Notes */}
          <div>
            <Label htmlFor="notes">Assignment Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any specific instructions or requirements for the partner..."
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssign} disabled={!selectedPartner}>
              Assign Partner
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignLeadModal;
