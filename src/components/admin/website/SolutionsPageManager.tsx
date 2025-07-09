import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, Upload, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SolutionsPageManager = () => {
  const { toast } = useToast();
  
  const [solutionsContent, setSolutionsContent] = useState({
    pageTitle: 'Our Solutions',
    pageDescription: 'Comprehensive digital solutions for your business needs',
    heroImage: '',
    solutions: [
      {
        id: 1,
        title: 'Web Development',
        description: 'Custom web applications built with modern technologies',
        image: '',
        features: ['Responsive Design', 'Modern Frameworks', 'SEO Optimized']
      },
      {
        id: 2,
        title: 'Mobile Development',
        description: 'Native and cross-platform mobile applications',
        image: '',
        features: ['iOS & Android', 'Cross-Platform', 'Native Performance']
      }
    ]
  });

  const handleSave = () => {
    toast({
      title: "Solutions Page Updated",
      description: "Solutions page content has been saved successfully."
    });
  };

  const handleImageUpload = (field: string) => {
    toast({
      title: "Image Upload",
      description: `${field} image upload functionality would be implemented here.`
    });
  };

  const addSolution = () => {
    const newSolution = {
      id: Date.now(),
      title: '',
      description: '',
      image: '',
      features: ['']
    };
    setSolutionsContent({
      ...solutionsContent,
      solutions: [...solutionsContent.solutions, newSolution]
    });
  };

  const removeSolution = (id: number) => {
    setSolutionsContent({
      ...solutionsContent,
      solutions: solutionsContent.solutions.filter(solution => solution.id !== id)
    });
  };

  const updateSolution = (id: number, field: string, value: any) => {
    setSolutionsContent({
      ...solutionsContent,
      solutions: solutionsContent.solutions.map(solution =>
        solution.id === id ? { ...solution, [field]: value } : solution
      )
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Solutions Page Content Management</CardTitle>
        <CardDescription>Manage the content displayed on the solutions page</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Page Header */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium mb-4">Page Header</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="page-title">Page Title</Label>
              <Input
                id="page-title"
                value={solutionsContent.pageTitle}
                onChange={(e) => setSolutionsContent({...solutionsContent, pageTitle: e.target.value})}
                placeholder="Enter page title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hero-image">Hero Image</Label>
              <div className="flex gap-2">
                <Input
                  id="hero-image"
                  value={solutionsContent.heroImage}
                  onChange={(e) => setSolutionsContent({...solutionsContent, heroImage: e.target.value})}
                  placeholder="Image URL"
                />
                <Button variant="outline" onClick={() => handleImageUpload('Hero')}>
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2 lg:col-span-2">
              <Label htmlFor="page-description">Page Description</Label>
              <Textarea
                id="page-description"
                value={solutionsContent.pageDescription}
                onChange={(e) => setSolutionsContent({...solutionsContent, pageDescription: e.target.value})}
                placeholder="Enter page description"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Solutions */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Solutions</h3>
            <Button onClick={addSolution} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Solution
            </Button>
          </div>
          
          {solutionsContent.solutions.map((solution, index) => (
            <Card key={solution.id} className="mb-4">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Solution {index + 1}</CardTitle>
                  <Button 
                    onClick={() => removeSolution(solution.id)} 
                    variant="destructive" 
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Solution Title</Label>
                    <Input
                      value={solution.title}
                      onChange={(e) => updateSolution(solution.id, 'title', e.target.value)}
                      placeholder="Enter solution title"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Solution Image</Label>
                    <div className="flex gap-2">
                      <Input
                        value={solution.image}
                        onChange={(e) => updateSolution(solution.id, 'image', e.target.value)}
                        placeholder="Image URL"
                      />
                      <Button variant="outline" onClick={() => handleImageUpload(`Solution ${index + 1}`)}>
                        <Upload className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 lg:col-span-2">
                    <Label>Solution Description</Label>
                    <Textarea
                      value={solution.description}
                      onChange={(e) => updateSolution(solution.id, 'description', e.target.value)}
                      placeholder="Enter solution description"
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2 lg:col-span-2">
                    <Label>Features (one per line)</Label>
                    <Textarea
                      value={solution.features.join('\n')}
                      onChange={(e) => updateSolution(solution.id, 'features', e.target.value.split('\n'))}
                      placeholder="Enter features, one per line"
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-brand-primary hover:bg-brand-primary/90">
            <Save className="w-4 h-4 mr-2" />
            Save Solutions Content
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SolutionsPageManager;