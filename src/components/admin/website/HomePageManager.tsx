import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const HomePageManager = () => {
  const { toast } = useToast();
  
  const [homeContent, setHomeContent] = useState({
    heroTitle: 'Welcome to DGHub',
    heroSubtitle: 'Your premier destination for digital solutions',
    heroDescription: 'Connect with expert developers and bring your digital vision to life',
    heroImage: '',
    heroButtonText: 'Get Started',
    aboutTitle: 'About Our Platform',
    aboutDescription: 'We connect businesses with talented developers to create amazing digital experiences.',
    aboutImage: '',
    featuresTitle: 'Why Choose DGHub',
    featuresDescription: 'Discover what makes us the best choice for your development needs',
    ctaTitle: 'Ready to Start Your Project?',
    ctaDescription: 'Join thousands of satisfied clients who have transformed their business with our platform',
    ctaButtonText: 'Submit Your Project'
  });

  const handleSave = () => {
    toast({
      title: "Home Page Updated",
      description: "Home page content has been saved successfully."
    });
  };

  const handleImageUpload = (field: string) => {
    toast({
      title: "Image Upload",
      description: `${field} image upload functionality would be implemented here.`
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Home Page Content Management</CardTitle>
        <CardDescription>Manage the content displayed on the home page</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Hero Section */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium mb-4">Hero Section</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hero-title">Hero Title</Label>
              <Input
                id="hero-title"
                value={homeContent.heroTitle}
                onChange={(e) => setHomeContent({...homeContent, heroTitle: e.target.value})}
                placeholder="Enter hero title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hero-subtitle">Hero Subtitle</Label>
              <Input
                id="hero-subtitle"
                value={homeContent.heroSubtitle}
                onChange={(e) => setHomeContent({...homeContent, heroSubtitle: e.target.value})}
                placeholder="Enter hero subtitle"
              />
            </div>
            
            <div className="space-y-2 lg:col-span-2">
              <Label htmlFor="hero-description">Hero Description</Label>
              <Textarea
                id="hero-description"
                value={homeContent.heroDescription}
                onChange={(e) => setHomeContent({...homeContent, heroDescription: e.target.value})}
                placeholder="Enter hero description"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hero-image">Hero Image</Label>
              <div className="flex gap-2">
                <Input
                  id="hero-image"
                  value={homeContent.heroImage}
                  onChange={(e) => setHomeContent({...homeContent, heroImage: e.target.value})}
                  placeholder="Image URL"
                />
                <Button variant="outline" onClick={() => handleImageUpload('Hero')}>
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hero-button">Hero Button Text</Label>
              <Input
                id="hero-button"
                value={homeContent.heroButtonText}
                onChange={(e) => setHomeContent({...homeContent, heroButtonText: e.target.value})}
                placeholder="Enter button text"
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium mb-4">About Section</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="about-title">About Title</Label>
              <Input
                id="about-title"
                value={homeContent.aboutTitle}
                onChange={(e) => setHomeContent({...homeContent, aboutTitle: e.target.value})}
                placeholder="Enter about title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="about-image">About Image</Label>
              <div className="flex gap-2">
                <Input
                  id="about-image"
                  value={homeContent.aboutImage}
                  onChange={(e) => setHomeContent({...homeContent, aboutImage: e.target.value})}
                  placeholder="Image URL"
                />
                <Button variant="outline" onClick={() => handleImageUpload('About')}>
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2 lg:col-span-2">
              <Label htmlFor="about-description">About Description</Label>
              <Textarea
                id="about-description"
                value={homeContent.aboutDescription}
                onChange={(e) => setHomeContent({...homeContent, aboutDescription: e.target.value})}
                placeholder="Enter about description"
                rows={4}
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium mb-4">Features Section</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="features-title">Features Title</Label>
              <Input
                id="features-title"
                value={homeContent.featuresTitle}
                onChange={(e) => setHomeContent({...homeContent, featuresTitle: e.target.value})}
                placeholder="Enter features title"
              />
            </div>
            
            <div className="space-y-2 lg:col-span-2">
              <Label htmlFor="features-description">Features Description</Label>
              <Textarea
                id="features-description"
                value={homeContent.featuresDescription}
                onChange={(e) => setHomeContent({...homeContent, featuresDescription: e.target.value})}
                placeholder="Enter features description"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div>
          <h3 className="text-lg font-medium mb-4">Call to Action Section</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cta-title">CTA Title</Label>
              <Input
                id="cta-title"
                value={homeContent.ctaTitle}
                onChange={(e) => setHomeContent({...homeContent, ctaTitle: e.target.value})}
                placeholder="Enter CTA title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cta-button">CTA Button Text</Label>
              <Input
                id="cta-button"
                value={homeContent.ctaButtonText}
                onChange={(e) => setHomeContent({...homeContent, ctaButtonText: e.target.value})}
                placeholder="Enter button text"
              />
            </div>
            
            <div className="space-y-2 lg:col-span-3">
              <Label htmlFor="cta-description">CTA Description</Label>
              <Textarea
                id="cta-description"
                value={homeContent.ctaDescription}
                onChange={(e) => setHomeContent({...homeContent, ctaDescription: e.target.value})}
                placeholder="Enter CTA description"
                rows={2}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-brand-primary hover:bg-brand-primary/90">
            <Save className="w-4 h-4 mr-2" />
            Save Home Content
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HomePageManager;