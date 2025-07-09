import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, Upload, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CaseStudiesPageManager = () => {
  const { toast } = useToast();
  
  const [caseStudiesContent, setCaseStudiesContent] = useState({
    pageTitle: 'Case Studies',
    pageDescription: 'Discover how we have helped businesses achieve their goals',
    heroImage: '',
    caseStudies: [
      {
        id: 1,
        title: 'E-commerce Platform Redesign',
        client: 'TechCorp Inc.',
        description: 'Complete redesign of an e-commerce platform resulting in 150% increase in conversions',
        image: '',
        challenge: 'Low conversion rates and poor user experience',
        solution: 'Modern UI/UX design with improved checkout flow',
        results: '150% increase in conversions, 40% reduction in bounce rate',
        technologies: ['React', 'Node.js', 'MongoDB']
      }
    ]
  });

  const handleSave = () => {
    toast({
      title: "Case Studies Updated",
      description: "Case studies content has been saved successfully."
    });
  };

  const handleImageUpload = (field: string) => {
    toast({
      title: "Image Upload",
      description: `${field} image upload functionality would be implemented here.`
    });
  };

  const addCaseStudy = () => {
    const newCaseStudy = {
      id: Date.now(),
      title: '',
      client: '',
      description: '',
      image: '',
      challenge: '',
      solution: '',
      results: '',
      technologies: ['']
    };
    setCaseStudiesContent({
      ...caseStudiesContent,
      caseStudies: [...caseStudiesContent.caseStudies, newCaseStudy]
    });
  };

  const removeCaseStudy = (id: number) => {
    setCaseStudiesContent({
      ...caseStudiesContent,
      caseStudies: caseStudiesContent.caseStudies.filter(cs => cs.id !== id)
    });
  };

  const updateCaseStudy = (id: number, field: string, value: any) => {
    setCaseStudiesContent({
      ...caseStudiesContent,
      caseStudies: caseStudiesContent.caseStudies.map(cs =>
        cs.id === id ? { ...cs, [field]: value } : cs
      )
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Case Studies Content Management</CardTitle>
        <CardDescription>Manage case studies displayed on your website</CardDescription>
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
                value={caseStudiesContent.pageTitle}
                onChange={(e) => setCaseStudiesContent({...caseStudiesContent, pageTitle: e.target.value})}
                placeholder="Enter page title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hero-image">Hero Image</Label>
              <div className="flex gap-2">
                <Input
                  id="hero-image"
                  value={caseStudiesContent.heroImage}
                  onChange={(e) => setCaseStudiesContent({...caseStudiesContent, heroImage: e.target.value})}
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
                value={caseStudiesContent.pageDescription}
                onChange={(e) => setCaseStudiesContent({...caseStudiesContent, pageDescription: e.target.value})}
                placeholder="Enter page description"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Case Studies */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Case Studies</h3>
            <Button onClick={addCaseStudy} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Case Study
            </Button>
          </div>
          
          {caseStudiesContent.caseStudies.map((caseStudy, index) => (
            <Card key={caseStudy.id} className="mb-4">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Case Study {index + 1}</CardTitle>
                  <Button 
                    onClick={() => removeCaseStudy(caseStudy.id)} 
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
                    <Label>Case Study Title</Label>
                    <Input
                      value={caseStudy.title}
                      onChange={(e) => updateCaseStudy(caseStudy.id, 'title', e.target.value)}
                      placeholder="Enter case study title"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Client Name</Label>
                    <Input
                      value={caseStudy.client}
                      onChange={(e) => updateCaseStudy(caseStudy.id, 'client', e.target.value)}
                      placeholder="Enter client name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Case Study Image</Label>
                    <div className="flex gap-2">
                      <Input
                        value={caseStudy.image}
                        onChange={(e) => updateCaseStudy(caseStudy.id, 'image', e.target.value)}
                        placeholder="Image URL"
                      />
                      <Button variant="outline" onClick={() => handleImageUpload(`Case Study ${index + 1}`)}>
                        <Upload className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 lg:col-span-2">
                    <Label>Description</Label>
                    <Textarea
                      value={caseStudy.description}
                      onChange={(e) => updateCaseStudy(caseStudy.id, 'description', e.target.value)}
                      placeholder="Brief description of the case study"
                      rows={2}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Challenge</Label>
                    <Textarea
                      value={caseStudy.challenge}
                      onChange={(e) => updateCaseStudy(caseStudy.id, 'challenge', e.target.value)}
                      placeholder="What was the challenge?"
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Solution</Label>
                    <Textarea
                      value={caseStudy.solution}
                      onChange={(e) => updateCaseStudy(caseStudy.id, 'solution', e.target.value)}
                      placeholder="How did you solve it?"
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2 lg:col-span-2">
                    <Label>Results</Label>
                    <Textarea
                      value={caseStudy.results}
                      onChange={(e) => updateCaseStudy(caseStudy.id, 'results', e.target.value)}
                      placeholder="What were the results?"
                      rows={2}
                    />
                  </div>
                  
                  <div className="space-y-2 lg:col-span-2">
                    <Label>Technologies Used (one per line)</Label>
                    <Textarea
                      value={caseStudy.technologies.join('\n')}
                      onChange={(e) => updateCaseStudy(caseStudy.id, 'technologies', e.target.value.split('\n'))}
                      placeholder="Enter technologies used, one per line"
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
            Save Case Studies
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseStudiesPageManager;