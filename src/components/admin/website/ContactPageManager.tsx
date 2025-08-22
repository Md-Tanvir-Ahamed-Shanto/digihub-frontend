import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, Upload, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactPageManager = () => {
  const { toast } = useToast();
  
  const [contactContent, setContactContent] = useState({
    pageTitle: 'Contact Us',
    pageDescription: 'Get in touch with our team',
    heroImage: '',
    contactInfo: {
      address: '123 Business Street, City, State 12345',
      phone: '+1 (555) 123-4567',
      email: 'hello@digihub.com.au',
      workingHours: 'Monday - Friday: 9:00 AM - 6:00 PM'
    },
    officeLocations: [
      {
        id: 1,
        name: 'Main Office',
        address: '123 Business Street, City, State 12345',
        phone: '+1 (555) 123-4567',
        email: 'main@DIGIHUB AUST.com',
        image: ''
      }
    ],
    socialMedia: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: ''
    },
    mapEmbedCode: ''
  });

  const handleSave = () => {
    toast({
      title: "Contact Page Updated",
      description: "Contact page content has been saved successfully."
    });
  };

  const handleImageUpload = (field: string) => {
    toast({
      title: "Image Upload",
      description: `${field} image upload functionality would be implemented here.`
    });
  };

  const addOfficeLocation = () => {
    const newLocation = {
      id: Date.now(),
      name: '',
      address: '',
      phone: '',
      email: '',
      image: ''
    };
    setContactContent({
      ...contactContent,
      officeLocations: [...contactContent.officeLocations, newLocation]
    });
  };

  const removeOfficeLocation = (id: number) => {
    setContactContent({
      ...contactContent,
      officeLocations: contactContent.officeLocations.filter(location => location.id !== id)
    });
  };

  const updateOfficeLocation = (id: number, field: string, value: string) => {
    setContactContent({
      ...contactContent,
      officeLocations: contactContent.officeLocations.map(location =>
        location.id === id ? { ...location, [field]: value } : location
      )
    });
  };

  const updateContactInfo = (field: string, value: string) => {
    setContactContent({
      ...contactContent,
      contactInfo: { ...contactContent.contactInfo, [field]: value }
    });
  };

  const updateSocialMedia = (field: string, value: string) => {
    setContactContent({
      ...contactContent,
      socialMedia: { ...contactContent.socialMedia, [field]: value }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Page Content Management</CardTitle>
        <CardDescription>Manage contact information and page content</CardDescription>
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
                value={contactContent.pageTitle}
                onChange={(e) => setContactContent({...contactContent, pageTitle: e.target.value})}
                placeholder="Enter page title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hero-image">Hero Image</Label>
              <div className="flex gap-2">
                <Input
                  id="hero-image"
                  value={contactContent.heroImage}
                  onChange={(e) => setContactContent({...contactContent, heroImage: e.target.value})}
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
                value={contactContent.pageDescription}
                onChange={(e) => setContactContent({...contactContent, pageDescription: e.target.value})}
                placeholder="Enter page description"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact-address">Address</Label>
              <Textarea
                id="contact-address"
                value={contactContent.contactInfo.address}
                onChange={(e) => updateContactInfo('address', e.target.value)}
                placeholder="Enter business address"
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contact-phone">Phone Number</Label>
              <Input
                id="contact-phone"
                value={contactContent.contactInfo.phone}
                onChange={(e) => updateContactInfo('phone', e.target.value)}
                placeholder="Enter phone number"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contact-email">Email Address</Label>
              <Input
                id="contact-email"
                value={contactContent.contactInfo.email}
                onChange={(e) => updateContactInfo('email', e.target.value)}
                placeholder="Enter email address"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="working-hours">Working Hours</Label>
              <Input
                id="working-hours"
                value={contactContent.contactInfo.workingHours}
                onChange={(e) => updateContactInfo('workingHours', e.target.value)}
                placeholder="Enter working hours"
              />
            </div>
          </div>
        </div>

        {/* Office Locations */}
        <div className="border-b pb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Office Locations</h3>
            <Button onClick={addOfficeLocation} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Location
            </Button>
          </div>
          
          {contactContent.officeLocations.map((location, index) => (
            <Card key={location.id} className="mb-4">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Location {index + 1}</CardTitle>
                  <Button 
                    onClick={() => removeOfficeLocation(location.id)} 
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
                    <Label>Location Name</Label>
                    <Input
                      value={location.name}
                      onChange={(e) => updateOfficeLocation(location.id, 'name', e.target.value)}
                      placeholder="Enter location name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input
                      value={location.phone}
                      onChange={(e) => updateOfficeLocation(location.id, 'phone', e.target.value)}
                      placeholder="Enter phone number"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input
                      value={location.email}
                      onChange={(e) => updateOfficeLocation(location.id, 'email', e.target.value)}
                      placeholder="Enter email address"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Location Image</Label>
                    <div className="flex gap-2">
                      <Input
                        value={location.image}
                        onChange={(e) => updateOfficeLocation(location.id, 'image', e.target.value)}
                        placeholder="Image URL"
                      />
                      <Button variant="outline" onClick={() => handleImageUpload(`Location ${index + 1}`)}>
                        <Upload className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 lg:col-span-2">
                    <Label>Address</Label>
                    <Textarea
                      value={location.address}
                      onChange={(e) => updateOfficeLocation(location.id, 'address', e.target.value)}
                      placeholder="Enter full address"
                      rows={2}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social Media */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium mb-4">Social Media Links</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook URL</Label>
              <Input
                id="facebook"
                value={contactContent.socialMedia.facebook}
                onChange={(e) => updateSocialMedia('facebook', e.target.value)}
                placeholder="https://facebook.com/yourpage"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter URL</Label>
              <Input
                id="twitter"
                value={contactContent.socialMedia.twitter}
                onChange={(e) => updateSocialMedia('twitter', e.target.value)}
                placeholder="https://twitter.com/yourhandle"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn URL</Label>
              <Input
                id="linkedin"
                value={contactContent.socialMedia.linkedin}
                onChange={(e) => updateSocialMedia('linkedin', e.target.value)}
                placeholder="https://linkedin.com/company/yourcompany"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram URL</Label>
              <Input
                id="instagram"
                value={contactContent.socialMedia.instagram}
                onChange={(e) => updateSocialMedia('instagram', e.target.value)}
                placeholder="https://instagram.com/yourhandle"
              />
            </div>
          </div>
        </div>

        {/* Map Embed */}
        <div>
          <h3 className="text-lg font-medium mb-4">Map Integration</h3>
          <div className="space-y-2">
            <Label htmlFor="map-embed">Google Maps Embed Code</Label>
            <Textarea
              id="map-embed"
              value={contactContent.mapEmbedCode}
              onChange={(e) => setContactContent({...contactContent, mapEmbedCode: e.target.value})}
              placeholder="Paste your Google Maps embed code here"
              rows={4}
            />
            <p className="text-sm text-gray-500">
              Get embed code from Google Maps by clicking Share → Embed a map
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-brand-primary hover:bg-brand-primary/90">
            <Save className="w-4 h-4 mr-2" />
            Save Contact Content
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactPageManager;