import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, Upload, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AboutPageManager = () => {
  const { toast } = useToast();
  
  const [aboutContent, setAboutContent] = useState({
    pageTitle: 'About Us',
    pageDescription: 'Learn more about our company and mission',
    heroImage: '',
    missionTitle: 'Our Mission',
    missionDescription: 'To connect businesses with talented developers and create amazing digital experiences',
    visionTitle: 'Our Vision',
    visionDescription: 'A world where every business has access to the best development talent',
    valuesTitle: 'Our Values',
    values: [
      {
        id: 1,
        title: 'Quality',
        description: 'We never compromise on the quality of our work',
        icon: 'Star'
      },
      {
        id: 2,
        title: 'Innovation',
        description: 'We embrace new technologies and creative solutions',
        icon: 'Lightbulb'
      },
      {
        id: 3,
        title: 'Trust',
        description: 'Building lasting relationships through transparency and reliability',
        icon: 'Shield'
      }
    ],
    teamTitle: 'Meet Our Team',
    teamDescription: 'The passionate people behind our success',
    teamMembers: [
      {
        id: 1,
        name: 'John Doe',
        position: 'CEO & Founder',
        bio: 'John has over 10 years of experience in the tech industry',
        image: '',
        linkedIn: '',
        twitter: ''
      }
    ]
  });

  const handleSave = () => {
    toast({
      title: "About Page Updated",
      description: "About page content has been saved successfully."
    });
  };

  const handleImageUpload = (field: string) => {
    toast({
      title: "Image Upload",
      description: `${field} image upload functionality would be implemented here.`
    });
  };

  const addValue = () => {
    const newValue = {
      id: Date.now(),
      title: '',
      description: '',
      icon: ''
    };
    setAboutContent({
      ...aboutContent,
      values: [...aboutContent.values, newValue]
    });
  };

  const removeValue = (id: number) => {
    setAboutContent({
      ...aboutContent,
      values: aboutContent.values.filter(value => value.id !== id)
    });
  };

  const updateValue = (id: number, field: string, value: any) => {
    setAboutContent({
      ...aboutContent,
      values: aboutContent.values.map(val =>
        val.id === id ? { ...val, [field]: value } : val
      )
    });
  };

  const addTeamMember = () => {
    const newMember = {
      id: Date.now(),
      name: '',
      position: '',
      bio: '',
      image: '',
      linkedIn: '',
      twitter: ''
    };
    setAboutContent({
      ...aboutContent,
      teamMembers: [...aboutContent.teamMembers, newMember]
    });
  };

  const removeTeamMember = (id: number) => {
    setAboutContent({
      ...aboutContent,
      teamMembers: aboutContent.teamMembers.filter(member => member.id !== id)
    });
  };

  const updateTeamMember = (id: number, field: string, value: any) => {
    setAboutContent({
      ...aboutContent,
      teamMembers: aboutContent.teamMembers.map(member =>
        member.id === id ? { ...member, [field]: value } : member
      )
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>About Page Content Management</CardTitle>
        <CardDescription>Manage the content displayed on the about page</CardDescription>
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
                value={aboutContent.pageTitle}
                onChange={(e) => setAboutContent({...aboutContent, pageTitle: e.target.value})}
                placeholder="Enter page title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hero-image">Hero Image</Label>
              <div className="flex gap-2">
                <Input
                  id="hero-image"
                  value={aboutContent.heroImage}
                  onChange={(e) => setAboutContent({...aboutContent, heroImage: e.target.value})}
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
                value={aboutContent.pageDescription}
                onChange={(e) => setAboutContent({...aboutContent, pageDescription: e.target.value})}
                placeholder="Enter page description"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium mb-4">Mission & Vision</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mission-title">Mission Title</Label>
                <Input
                  id="mission-title"
                  value={aboutContent.missionTitle}
                  onChange={(e) => setAboutContent({...aboutContent, missionTitle: e.target.value})}
                  placeholder="Enter mission title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mission-description">Mission Description</Label>
                <Textarea
                  id="mission-description"
                  value={aboutContent.missionDescription}
                  onChange={(e) => setAboutContent({...aboutContent, missionDescription: e.target.value})}
                  placeholder="Enter mission description"
                  rows={4}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="vision-title">Vision Title</Label>
                <Input
                  id="vision-title"
                  value={aboutContent.visionTitle}
                  onChange={(e) => setAboutContent({...aboutContent, visionTitle: e.target.value})}
                  placeholder="Enter vision title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vision-description">Vision Description</Label>
                <Textarea
                  id="vision-description"
                  value={aboutContent.visionDescription}
                  onChange={(e) => setAboutContent({...aboutContent, visionDescription: e.target.value})}
                  placeholder="Enter vision description"
                  rows={4}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="border-b pb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Company Values</h3>
            <Button onClick={addValue} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Value
            </Button>
          </div>
          
          <div className="space-y-2 mb-4">
            <Label htmlFor="values-title">Values Section Title</Label>
            <Input
              id="values-title"
              value={aboutContent.valuesTitle}
              onChange={(e) => setAboutContent({...aboutContent, valuesTitle: e.target.value})}
              placeholder="Enter values section title"
            />
          </div>
          
          {aboutContent.values.map((value, index) => (
            <Card key={value.id} className="mb-4">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Value {index + 1}</CardTitle>
                  <Button 
                    onClick={() => removeValue(value.id)} 
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
                    <Label>Value Title</Label>
                    <Input
                      value={value.title}
                      onChange={(e) => updateValue(value.id, 'title', e.target.value)}
                      placeholder="Enter value title"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Icon Name</Label>
                    <Input
                      value={value.icon}
                      onChange={(e) => updateValue(value.id, 'icon', e.target.value)}
                      placeholder="e.g., Star, Lightbulb, Shield"
                    />
                  </div>
                  
                  <div className="space-y-2 lg:col-span-3">
                    <Label>Value Description</Label>
                    <Textarea
                      value={value.description}
                      onChange={(e) => updateValue(value.id, 'description', e.target.value)}
                      placeholder="Describe this value"
                      rows={2}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Team Section</h3>
            <Button onClick={addTeamMember} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Team Member
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="team-title">Team Section Title</Label>
              <Input
                id="team-title"
                value={aboutContent.teamTitle}
                onChange={(e) => setAboutContent({...aboutContent, teamTitle: e.target.value})}
                placeholder="Enter team section title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="team-description">Team Section Description</Label>
              <Input
                id="team-description"
                value={aboutContent.teamDescription}
                onChange={(e) => setAboutContent({...aboutContent, teamDescription: e.target.value})}
                placeholder="Enter team section description"
              />
            </div>
          </div>
          
          {aboutContent.teamMembers.map((member, index) => (
            <Card key={member.id} className="mb-4">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Team Member {index + 1}</CardTitle>
                  <Button 
                    onClick={() => removeTeamMember(member.id)} 
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
                    <Label>Name</Label>
                    <Input
                      value={member.name}
                      onChange={(e) => updateTeamMember(member.id, 'name', e.target.value)}
                      placeholder="Enter team member name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Position</Label>
                    <Input
                      value={member.position}
                      onChange={(e) => updateTeamMember(member.id, 'position', e.target.value)}
                      placeholder="Enter position/title"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>LinkedIn URL</Label>
                    <Input
                      value={member.linkedIn}
                      onChange={(e) => updateTeamMember(member.id, 'linkedIn', e.target.value)}
                      placeholder="LinkedIn profile URL"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Twitter URL</Label>
                    <Input
                      value={member.twitter}
                      onChange={(e) => updateTeamMember(member.id, 'twitter', e.target.value)}
                      placeholder="Twitter profile URL"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Profile Image</Label>
                    <div className="flex gap-2">
                      <Input
                        value={member.image}
                        onChange={(e) => updateTeamMember(member.id, 'image', e.target.value)}
                        placeholder="Image URL"
                      />
                      <Button variant="outline" onClick={() => handleImageUpload(`Team Member ${index + 1}`)}>
                        <Upload className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 lg:col-span-2">
                    <Label>Bio</Label>
                    <Textarea
                      value={member.bio}
                      onChange={(e) => updateTeamMember(member.id, 'bio', e.target.value)}
                      placeholder="Short biography"
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
            Save About Content
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutPageManager;