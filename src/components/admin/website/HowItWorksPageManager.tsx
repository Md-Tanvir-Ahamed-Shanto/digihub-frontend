import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, Upload, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const HowItWorksPageManager = () => {
  const { toast } = useToast();
  
  const [howItWorksContent, setHowItWorksContent] = useState({
    pageTitle: 'How It Works',
    pageDescription: 'Discover our simple and efficient process',
    heroImage: '',
    steps: [
      {
        id: 1,
        stepNumber: 1,
        title: 'Submit Your Project',
        description: 'Tell us about your project requirements and goals',
        icon: 'Upload',
        image: ''
      },
      {
        id: 2,
        stepNumber: 2,
        title: 'Get Matched',
        description: 'We match you with the perfect developer for your needs',
        icon: 'Users',
        image: ''
      },
      {
        id: 3,
        stepNumber: 3,
        title: 'Start Building',
        description: 'Begin working with your developer to bring your vision to life',
        icon: 'Code',
        image: ''
      }
    ]
  });

  const handleSave = () => {
    toast({
      title: "How It Works Updated",
      description: "How It Works page content has been saved successfully."
    });
  };

  const handleImageUpload = (field: string) => {
    toast({
      title: "Image Upload",
      description: `${field} image upload functionality would be implemented here.`
    });
  };

  const addStep = () => {
    const newStep = {
      id: Date.now(),
      stepNumber: howItWorksContent.steps.length + 1,
      title: '',
      description: '',
      icon: '',
      image: ''
    };
    setHowItWorksContent({
      ...howItWorksContent,
      steps: [...howItWorksContent.steps, newStep]
    });
  };

  const removeStep = (id: number) => {
    const updatedSteps = howItWorksContent.steps
      .filter(step => step.id !== id)
      .map((step, index) => ({ ...step, stepNumber: index + 1 }));
    
    setHowItWorksContent({
      ...howItWorksContent,
      steps: updatedSteps
    });
  };

  const updateStep = (id: number, field: string, value: any) => {
    setHowItWorksContent({
      ...howItWorksContent,
      steps: howItWorksContent.steps.map(step =>
        step.id === id ? { ...step, [field]: value } : step
      )
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>How It Works Content Management</CardTitle>
        <CardDescription>Manage the process steps displayed on your website</CardDescription>
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
                value={howItWorksContent.pageTitle}
                onChange={(e) => setHowItWorksContent({...howItWorksContent, pageTitle: e.target.value})}
                placeholder="Enter page title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hero-image">Hero Image</Label>
              <div className="flex gap-2">
                <Input
                  id="hero-image"
                  value={howItWorksContent.heroImage}
                  onChange={(e) => setHowItWorksContent({...howItWorksContent, heroImage: e.target.value})}
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
                value={howItWorksContent.pageDescription}
                onChange={(e) => setHowItWorksContent({...howItWorksContent, pageDescription: e.target.value})}
                placeholder="Enter page description"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Process Steps</h3>
            <Button onClick={addStep} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Step
            </Button>
          </div>
          
          {howItWorksContent.steps.map((step, index) => (
            <Card key={step.id} className="mb-4">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Step {step.stepNumber}</CardTitle>
                  <Button 
                    onClick={() => removeStep(step.id)} 
                    variant="destructive" 
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Step Title</Label>
                    <Input
                      value={step.title}
                      onChange={(e) => updateStep(step.id, 'title', e.target.value)}
                      placeholder="Enter step title"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Icon Name</Label>
                    <Input
                      value={step.icon}
                      onChange={(e) => updateStep(step.id, 'icon', e.target.value)}
                      placeholder="e.g., Upload, Users, Code"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Step Image</Label>
                    <div className="flex gap-2">
                      <Input
                        value={step.image}
                        onChange={(e) => updateStep(step.id, 'image', e.target.value)}
                        placeholder="Image URL"
                      />
                      <Button variant="outline" onClick={() => handleImageUpload(`Step ${index + 1}`)}>
                        <Upload className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 lg:col-span-3">
                    <Label>Step Description</Label>
                    <Textarea
                      value={step.description}
                      onChange={(e) => updateStep(step.id, 'description', e.target.value)}
                      placeholder="Describe what happens in this step"
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
            Save How It Works
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HowItWorksPageManager;