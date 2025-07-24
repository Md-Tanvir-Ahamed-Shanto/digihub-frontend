import { useState, useEffect } from 'react';
import axiosInstance from '@/api/axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Save, Plus, Trash2, Edit, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Solution {
  id: number;
  title: string;
  description: string;
  image: string;
  features: string[];
}

const SolutionsPageManager = () => {
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSolution, setEditingSolution] = useState<Solution | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const emptySolution: Solution = {
    id: 0,
    title: '',
    description: '',
    image: '',
    features: ['']
  };

  const fetchSolutions = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get<Solution[]>('/solutions');
      setSolutions(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch solutions",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSolutions();
  }, []);

  const openCreateModal = () => {
    setEditingSolution({ ...emptySolution });
    setSelectedImage(null);
    setIsModalOpen(true);
  };

  const openEditModal = (solution: Solution) => {
    setEditingSolution({ ...solution });
    setSelectedImage(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSolution(null);
    setSelectedImage(null);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSave = async () => {
    if (!editingSolution) return;

    try {
      setIsLoading(true);
      
      const formData = new FormData();
      formData.append('title', editingSolution.title);
      formData.append('description', editingSolution.description);
      formData.append('features', JSON.stringify(editingSolution.features));
      
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      if (editingSolution.id === 0) {
        // Create new solution
        await axiosInstance.post('/solutions', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast({
          title: "Success",
          description: "Solution created successfully"
        });
      } else {
        // Update existing solution
        await axiosInstance.put(`/solutions/${editingSolution.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast({
          title: "Success",
          description: "Solution updated successfully"
        });
      }
      
      closeModal();
      await fetchSolutions();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save solution",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSolution = async (id: number) => {
    try {
      setIsLoading(true);
      await axiosInstance.delete(`/solutions/${id}`);
      setSolutions(solutions.filter(s => s.id !== id));
      toast({
        title: "Success",
        description: "Solution deleted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete solution",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: keyof Solution, value: any) => {
    if (!editingSolution) return;
    setEditingSolution({ ...editingSolution, [field]: value });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Solutions Page Content Management</CardTitle>
          <CardDescription>Manage the content displayed on the solutions page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Solutions</h3>
              <Button onClick={openCreateModal} variant="outline" disabled={isLoading}>
                <Plus className="w-4 h-4 mr-2" />
                Add Solution
              </Button>
            </div>

            {isLoading && solutions.length === 0 ? (
              <div className="text-center py-8">Loading solutions...</div>
            ) : solutions.length === 0 ? (
              <div className="text-center py-8">No solutions found. Add your first solution!</div>
            ) : null}
            
            <div className="grid gap-4">
              {solutions.map((solution) => (
                <Card key={solution.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{solution.title || 'Untitled Solution'}</h4>
                      <p className="text-sm mb-2">{solution.description}</p>
                      {solution.features && solution.features.length > 0 && (
                        <div className="text-xs text-muted-foreground">
                          Features: {solution.features.filter(f => f.trim()).length} items
                        </div>
                      )}
                      {solution.image && (
                        <p className="text-xs text-muted-foreground mt-1">Image: {solution.image}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => openEditModal(solution)} 
                        variant="outline"
                        size="sm"
                        disabled={isLoading}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        onClick={() => deleteSolution(solution.id)} 
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
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingSolution?.id === 0 ? 'Create New Solution' : 'Edit Solution'}
            </DialogTitle>
          </DialogHeader>
          
          {editingSolution && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Solution Title</Label>
                  <Input
                    value={editingSolution.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    placeholder="Enter solution title"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Solution Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="cursor-pointer"
                  />
                  {selectedImage && (
                    <p className="text-sm text-green-600">Selected: {selectedImage.name}</p>
                  )}
                  {editingSolution.image && !selectedImage && (
                    <p className="text-sm text-muted-foreground">Current image: {editingSolution.image}</p>
                  )}
                </div>
                
                <div className="space-y-2 lg:col-span-2">
                  <Label>Solution Description</Label>
                  <Textarea
                    value={editingSolution.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    placeholder="Enter solution description"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2 lg:col-span-2">
                  <Label>Features (one per line)</Label>
                  <Textarea
                    value={editingSolution.features.join('\n')}
                    onChange={(e) => updateField('features', e.target.value.split('\n'))}
                    placeholder="Enter features, one per line"
                    rows={4}
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
                  {editingSolution?.id === 0 ? 'Create' : 'Update'}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SolutionsPageManager;