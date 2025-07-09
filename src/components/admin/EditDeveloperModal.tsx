
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface EditDeveloperModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  developer: any;
}

const EditDeveloperModal = ({ open, onOpenChange, developer }: EditDeveloperModalProps) => {
  const [developerData, setDeveloperData] = useState({
    name: developer?.name || '',
    email: developer?.email || '',
    phone: developer?.phone || '',
    location: '',
    hourlyRate: '45',
    status: developer?.status || 'Active',
    bio: '',
    experience: '3',
    specialization: 'Full Stack'
  });

  const [skills, setSkills] = useState(['React', 'Node.js', 'MongoDB', 'AWS']);
  const [newSkill, setNewSkill] = useState('');

  const updateField = (field: string, value: string) => {
    setDeveloperData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  if (!developer) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Developer</DialogTitle>
          <DialogDescription>
            Update {developer.name}'s information
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dev-name">Full Name</Label>
                  <Input 
                    id="dev-name"
                    value={developerData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location"
                    value={developerData.location}
                    onChange={(e) => updateField('location', e.target.value)}
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dev-email">Email Address</Label>
                  <Input 
                    id="dev-email"
                    type="email"
                    value={developerData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="dev-phone">Phone Number</Label>
                  <Input 
                    id="dev-phone"
                    value={developerData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hourly-rate">Hourly Rate ($)</Label>
                  <Input 
                    id="hourly-rate"
                    type="number"
                    value={developerData.hourlyRate}
                    onChange={(e) => updateField('hourlyRate', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="dev-status">Status</Label>
                  <Select value={developerData.status} onValueChange={(value) => updateField('status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Busy">Busy</SelectItem>
                      <SelectItem value="On Leave">On Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Professional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="experience">Experience (years)</Label>
                  <Input 
                    id="experience"
                    type="number"
                    value={developerData.experience}
                    onChange={(e) => updateField('experience', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="specialization">Specialization</Label>
                  <Select value={developerData.specialization} onValueChange={(value) => updateField('specialization', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Frontend">Frontend</SelectItem>
                      <SelectItem value="Backend">Backend</SelectItem>
                      <SelectItem value="Full Stack">Full Stack</SelectItem>
                      <SelectItem value="Mobile">Mobile</SelectItem>
                      <SelectItem value="DevOps">DevOps</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio"
                  value={developerData.bio}
                  onChange={(e) => updateField('bio', e.target.value)}
                  placeholder="Brief professional bio..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="px-3 py-1">
                    {skill}
                    <button 
                      onClick={() => removeSkill(skill)}
                      className="ml-2 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <Input 
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill"
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <Button onClick={addSkill} variant="outline">Add</Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={() => onOpenChange(false)}>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditDeveloperModal;
