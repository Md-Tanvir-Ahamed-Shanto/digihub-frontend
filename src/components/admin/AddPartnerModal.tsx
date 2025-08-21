
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import axiosInstance from '@/api/axios';
import { Loader2 } from 'lucide-react';

interface AddPartnerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPartnerAdded?: () => void;
}

const AddPartnerModal = ({ open, onOpenChange, onPartnerAdded }: AddPartnerModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    skillSet: [] as string[],
    industryExp: [] as string[]
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const skillOptions = [
    'HTML/CSS',
    'JavaScript',
    'React',
    'Node.js',
    'Next.js',
    'Vue.js',
    'Angular',
    'TypeScript',
    'laravel',
    'django',
    'Python',
    'Java',
    'PHP',
    'Mobile Development',
    'DevOps',
    'UI/UX Design'
  ];

  const industryOptions = [
    'E-commerce',
    'Healthcare',
    'Finance',
    'Education',
    'Real Estate',
    'Manufacturing',
    'Technology',
    'Entertainment',
    'Travel',
    'Sports',
    'agency',
    'Non-profit',
    'Government',
    'Hospitality',
    'custom website',
    'e-learning',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axiosInstance.post('/partner', formData);
      
      toast({
        title: "Success",
        description: `Partner "${formData.name}" has been added successfully.`
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        skillSet: [],
        industryExp: []
      });
      
      onPartnerAdded?.();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to add partner. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Partner</DialogTitle>
          <DialogDescription>
            Add a new technical partner to work on client projects.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Company/Partner Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="TechForge Solutions"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="partner@example.com"
              required
            />
          </div>

          {/* <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Enter temporary password"
              required
            />
          </div> */}
          
          <div className="space-y-2">
            <Label htmlFor="skillSet">Skills</Label>
            <Select
              onValueChange={(value) => {
                const skills = formData.skillSet.includes(value) 
                  ? formData.skillSet.filter(skill => skill !== value)
                  : [...formData.skillSet, value];
                handleInputChange('skillSet', skills);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select skills" />
              </SelectTrigger>
              <SelectContent>
                {skillOptions.map((skill) => (
                  <SelectItem key={skill} value={skill}>
                    {skill}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formData.skillSet.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.skillSet.map((skill) => (
                  <Badge key={skill} variant="secondary" className="cursor-pointer"
                    onClick={() => handleInputChange('skillSet', formData.skillSet.filter(s => s !== skill))}>
                    {skill} ×
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="industryExp">Industry Experience</Label>
            <Select
              onValueChange={(value) => {
                const industries = formData.industryExp.includes(value)
                  ? formData.industryExp.filter(ind => ind !== value)
                  : [...formData.industryExp, value];
                handleInputChange('industryExp', industries);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select industries" />
              </SelectTrigger>
              <SelectContent>
                {industryOptions.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formData.industryExp.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.industryExp.map((industry) => (
                  <Badge key={industry} variant="secondary" className="cursor-pointer"
                    onClick={() => handleInputChange('industryExp', formData.industryExp.filter(i => i !== industry))}>
                    {industry} ×
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Partner'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPartnerModal;
