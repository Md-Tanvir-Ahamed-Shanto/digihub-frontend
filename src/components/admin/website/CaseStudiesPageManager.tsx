import { useState, useEffect } from 'react';
import axiosInstance from '@/api/axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Save, Upload, Plus, Trash2, Edit, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CaseStudy {
  id: number;
  title: string;
  client: string;
  description: string;
  image: string;
  challenge: string;
  solution: string;
  results: string;
  technologies: string[];
}

const CaseStudiesPageManager = () => {
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudy | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const emptyCase: CaseStudy = {
    id: 0,
    title: '',
    client: '',
    description: '',
    image: '',
    challenge: '',
    solution: '',
    results: '',
    technologies: ['']
  };

  const fetchCaseStudies = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get<CaseStudy[]>('/case-studies');
      setCaseStudies(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch case studies",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const openCreateModal = () => {
    setEditingCaseStudy({ ...emptyCase });
    setSelectedImage(null);
    setIsModalOpen(true);
  };

  const openEditModal = (caseStudy: CaseStudy) => {
    setEditingCaseStudy({ ...caseStudy });
    setSelectedImage(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCaseStudy(null);
    setSelectedImage(null);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSave = async () => {
    if (!editingCaseStudy) return;

    try {
      setIsLoading(true);
      
      const formData = new FormData();
      formData.append('title', editingCaseStudy.title);
      formData.append('client', editingCaseStudy.client);
      formData.append('description', editingCaseStudy.description);
      formData.append('challenge', editingCaseStudy.challenge);
      formData.append('solution', editingCaseStudy.solution);
      formData.append('results', editingCaseStudy.results);
      formData.append('technologies', JSON.stringify(editingCaseStudy.technologies));
      
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      if (editingCaseStudy.id === 0) {
        // Create new case study
        await axiosInstance.post('/case-studies', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast({
          title: "Success",
          description: "Case study created successfully"
        });
      } else {
        // Update existing case study
        await axiosInstance.put(`/case-studies/${editingCaseStudy.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast({
          title: "Success",
          description: "Case study updated successfully"
        });
      }
      
      closeModal();
      await fetchCaseStudies();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save case study",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCaseStudy = async (id: number) => {
    try {
      setIsLoading(true);
      await axiosInstance.delete(`/case-studies/${id}`);
      setCaseStudies(caseStudies.filter(cs => cs.id !== id));
      toast({
        title: "Success",
        description: "Case study deleted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete case study",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: keyof CaseStudy, value: any) => {
    if (!editingCaseStudy) return;
    setEditingCaseStudy({ ...editingCaseStudy, [field]: value });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Case Studies Content Management</CardTitle>
          <CardDescription>Manage case studies displayed on your website</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Case Studies</h3>
              <Button onClick={openCreateModal} variant="outline" disabled={isLoading}>
                <Plus className="w-4 h-4 mr-2" />
                Add Case Study
              </Button>
            </div>

            {isLoading && caseStudies.length === 0 ? (
              <div className="text-center py-8">Loading case studies...</div>
            ) : caseStudies.length === 0 ? (
              <div className="text-center py-8">No case studies found. Add your first case study!</div>
            ) : null}
            
            <div className="grid gap-4">
              {caseStudies.map((caseStudy) => (
                <Card key={caseStudy.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{caseStudy.title || 'Untitled Case Study'}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{caseStudy.client}</p>
                      <p className="text-sm mb-2">{caseStudy.description}</p>
                      {caseStudy.image && (
                        <p className="text-xs text-muted-foreground">Image: {caseStudy.image}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => openEditModal(caseStudy)} 
                        variant="outline"
                        size="sm"
                        disabled={isLoading}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        onClick={() => deleteCaseStudy(caseStudy.id)} 
                        variant="destructive" 
                        size="sm"
                        disabled={isLoading}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingCaseStudy?.id === 0 ? 'Create New Case Study' : 'Edit Case Study'}
            </DialogTitle>
          </DialogHeader>
          
          {editingCaseStudy && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Case Study Title</Label>
                  <Input
                    value={editingCaseStudy.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    placeholder="Enter case study title"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Client Name</Label>
                  <Input
                    value={editingCaseStudy.client}
                    onChange={(e) => updateField('client', e.target.value)}
                    placeholder="Enter client name"
                  />
                </div>
                
                <div className="space-y-2 lg:col-span-2">
                  <Label>Case Study Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="cursor-pointer"
                  />
                  {selectedImage && (
                    <p className="text-sm text-green-600">Selected: {selectedImage.name}</p>
                  )}
                  {editingCaseStudy.image && !selectedImage && (
                    <p className="text-sm text-muted-foreground">Current image: {editingCaseStudy.image}</p>
                  )}
                </div>
                
                <div className="space-y-2 lg:col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    value={editingCaseStudy.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    placeholder="Brief description of the case study"
                    rows={2}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Challenge</Label>
                  <Textarea
                    value={editingCaseStudy.challenge}
                    onChange={(e) => updateField('challenge', e.target.value)}
                    placeholder="What was the challenge?"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Solution</Label>
                  <Textarea
                    value={editingCaseStudy.solution}
                    onChange={(e) => updateField('solution', e.target.value)}
                    placeholder="How did you solve it?"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2 lg:col-span-2">
                  <Label>Results</Label>
                  <Textarea
                    value={editingCaseStudy.results}
                    onChange={(e) => updateField('results', e.target.value)}
                    placeholder="What were the results?"
                    rows={2}
                  />
                </div>
                
                <div className="space-y-2 lg:col-span-2">
                  <Label>Technologies Used (one per line)</Label>
                  <Textarea
                    value={editingCaseStudy.technologies.join('\n')}
                    onChange={(e) => updateField('technologies', e.target.value.split('\n'))}
                    placeholder="Enter technologies used, one per line"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={closeModal} disabled={isLoading}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? (
                <>Loading...</>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {editingCaseStudy?.id === 0 ? 'Create' : 'Update'}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CaseStudiesPageManager;