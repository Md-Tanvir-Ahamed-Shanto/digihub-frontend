import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Calculator, FileText, Loader2 } from 'lucide-react';
import  axiosInstance  from '@/api/axios';

interface Client {
  id: string;
  name: string;
}

interface Project {
  title: string;
  id: string;
  name: string;
  milestones: Milestone[];
}

interface Milestone {
  id: string;
  title: string;
  clientCost: number;
}

interface CreateInvoiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (invoice: any) => void;
}

const CreateInvoiceModal = ({ open, onOpenChange, onSuccess }: CreateInvoiceModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const [formData, setFormData] = useState({
    clientId: '',
    projectId: '',
    milestoneId: '',
    amount: '',
    gstEnabled: true,
    description: '',
    dueDate: '',
  });

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axiosInstance.get('/client');
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch clients. Please try again.',
          variant: 'destructive',
        });
      }
    };

    if (open) {
      fetchClients();
    }
  }, [open, toast]);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!formData.clientId) return;
      
      try {
        const response = await axiosInstance.get(`/project/client/${formData.clientId}`);
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch projects. Please try again.',
          variant: 'destructive',
        });
      }
    };

    fetchProjects();
  }, [formData.clientId, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axiosInstance.post('/invoice', {
        clientId: formData.clientId,
        projectId: formData.projectId,
        milestoneId: formData.milestoneId || undefined,
        amount: parseFloat(formData.amount),
        gstEnabled: formData.gstEnabled,
        dueDate: formData.dueDate,
      });
      
      toast({
        title: 'Success',
        description: 'Invoice created successfully.',
      });
      
      onSuccess(response.data.invoice);
      onOpenChange(false);
      
      // Reset form
      setFormData({
        clientId: '',
        projectId: '',
        milestoneId: '',
        amount: '',
        gstEnabled: true,
        description: '',
        dueDate: '',
      });
    } catch (error) {
      console.error('Error creating invoice:', error);
      toast({
        title: 'Error',
        description: 'Failed to create invoice. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
  setFormData(prev => {
    let newValue: string | boolean = value;

    if (field === 'gstEnabled') {
      newValue = value === 'true'; // Convert 'true' string to boolean true
    }
    
    const newData = { ...prev, [field]: newValue };

    // When project changes, update milestone and amount if available
    if (field === 'projectId') {
      const project = projects.find(p => p.id === value);
      setSelectedProject(project || null);
      
      // Reset milestone-related fields
      newData.milestoneId = '';
      newData.amount = '';
    }
    
    // When milestone changes, update amount
    if (field === 'milestoneId' && selectedProject) {
      const milestone = selectedProject.milestones.find(m => m.id === value);
      if (milestone) {
        newData.amount = milestone.clientCost?.toString();
      }
    }
    
    return newData;
  });
};

  const amount = parseFloat(formData.amount) || 0;
  const gstAmount = formData.gstEnabled ? amount * 0.1 : 0;
  const totalAmount = amount + gstAmount;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Create New Invoice
          </DialogTitle>
          <DialogDescription>
            Create a manual invoice for client payments and milestone tracking.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientId">Client</Label>
              <Select value={formData.clientId} onValueChange={(value) => handleInputChange('clientId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="projectId">Project</Label>
              <Select 
                value={formData.projectId} 
                onValueChange={(value) => handleInputChange('projectId', value)}
                disabled={!formData.clientId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedProject?.milestones && selectedProject.milestones.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="milestoneId">Milestone</Label>
              <Select 
                value={formData.milestoneId} 
                onValueChange={(value) => handleInputChange('milestoneId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select milestone" />
                </SelectTrigger>
                <SelectContent>
                  {selectedProject.milestones.map((milestone) => (
                    <SelectItem key={milestone.id} value={milestone.id}>
                      {milestone.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                placeholder="0.00"
                step="0.01"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gstEnabled">GST</Label>
              <Select 
                value={formData.gstEnabled ? 'true' : 'false'}
                onValueChange={(value) => handleInputChange('gstEnabled', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Enabled (10%)</SelectItem>
                  <SelectItem value="false">Disabled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter invoice description or milestone details"
              rows={3}
            />
          </div>

          {/* Invoice Summary */}
          <Card className="bg-gray-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center">
                <Calculator className="w-4 h-4 mr-2" />
                Invoice Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              <div className="flex justify-between text-sm">
                <span>Amount:</span>
                <span>${amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>GST (10%):</span>
                <span>${gstAmount.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-bold">
                  <span>Total Amount:</span>
                  <span className="text-green-600">${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Invoice'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateInvoiceModal;
